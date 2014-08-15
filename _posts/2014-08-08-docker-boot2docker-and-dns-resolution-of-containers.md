---
layout: post
title: Docker, boot2docker and DNS resolution of containers
modified:
categories: tech
excerpt: This tutorial should help to setup a development environment on Mac OS X that relies heavily on docker and boot2docker. Based on my experience, docker is an excellent tool to create and run applications very effectively during dev, test and production. However, not having great development environment where docker can be used effectively slows you down and requires a lot of hand-tuning each an every time during the development process.
tags: [docker, boot2docker, cloud]
image:
  feature:
date: 2014-08-8T20:10:44+02:00
comments: true
---

###... or how to setup a full development environment with docker (on Mac OS X)

<section id="table-of-contents" class="toc">
  <header>
    <h3>Overview</h3>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section><!-- /#table-of-contents -->

This tutorial should help to setup a development environment on Mac OS X that relies heavily on docker and boot2docker. Based on my experience, docker is an excellent tool to create and run applications very effectively during dev, test and production. However, not having great development environment where docker can be used effectively slows you down and requires a lot of hand-tuning each an every time during the development process.

Part of this tutorial is based on information from other blogs, such as [iSpyker](http://ispyker.blogspot.co.at/2014/04/accessing-docker-container-private.html) and [SkyDock](https://github.com/crosbymichael/skydock). Thanks for all the great
work guys!


### Goal of this tutorial
The goal is to have the following capabilities available after you complete this guide.

  1. Run docker containers from your dev machine and have seamless access to all container using their IPs.  
  2. Enable DNS capabilities for all containers and being able to resolve them from your dev machine.
  3. Ensure that this will also work if you have to use a corporate VPN client (like Cisco AnyConnect).
  4. Being able to quickly set this up and tear it down with a [simple script](https://github.com/frosenberg/docker-dns-scripts). Even though I provide a script (at the end), I highly suggest to go through this manually to understand the details.

---------------------------------------


### Prerequisites
You need to have the following software installed.

  * Mac OS X (this guide is not required for Linux because it can run docker nativly)
  * [boot2docker](http://boot2docker.io/) v1.1.1 (Note: I run the boot2docker ISO from [here](https://medium.com/boot2docker-lightweight-linux-for-docker/boot2docker-together-with-virtualbox-guest-additions-da1e3ab2465c) because I allows me to mount /Users in the containers which is great for testing code that I'm working on)
  * [docker](http://www.docker.com) v1.1.1
  * git for checking about the git repo with the scripts

---------------------------------------

### What is the current problem?

If you start a docker container on MacOS, it will actually be running inside a VirtualBox VM that boot2docker is setting up for you under the cover. It's called boot2docker-vm and you can see the VM when you start the VirtualBox app. This VM actually runs the docker agent and your docker CLI on your Mac connects via the `$DOCKER_HOST` variable to your docker agent within the VM. The consequence is that each docker container cannot be pinged or resolved from the Mac which makes it hard to use during development. To illustrate the problem look as this simple example.

#### Start a docker container and run a server with nc

{% highlight bash %}
florian@mac:~$ docker run -i -t ubuntu bash
root@4cb806d8ddab:/# ifconfig eth0
eth0      Link encap:Ethernet  HWaddr be:70:6a:45:22:ee  
          inet addr:172.17.0.4  Bcast:0.0.0.0  Mask:255.255.0.0
          inet6 addr: fe80::bc70:6aff:fe45:22ee/64 Scope:Link
          UP BROADCAST RUNNING  MTU:1500  Metric:1
          RX packets:8 errors:0 dropped:0 overruns:0 frame:0
          TX packets:8 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000 
          RX bytes:648 (648.0 B)  TX bytes:648 (648.0 B)
root@4cb806d8ddab:/# nc -l 7777
{% endhighlight %}

#### Try to connect the server

{% highlight bash %}
florian@mac:~$ telnet 172.17.0.4 7777
Trying 172.17.0.4...
telnet: connect to address 172.17.0.4: Operation timed out
telnet: Unable to connect to remote host
{% endhighlight %}

It will timeout because the IP cannot be resolved. So let's fix that issues ... 

Before we jump to the solution you may already asked yourself the question "why is he not using port forwarding rules from VirtualBox?". They simply arent' enough if you using lots of containers and a highly dynamic system (e.g., based on [microservices](http://martinfowler.com/articles/microservices.html)). For one or two containers, such as a mongo and simple redis service that you app is requiring, port forwarding is totally fine. 

---------------------------------------

### Setting up boot2docker
If you have boot2docker already running, your VirtualBox (the hypervisor that is used by boot2docker) VM instance boot2docker-vm has been created already.

#### Initialize the boot2docker-vm

{% highlight bash %}
$ boot2docker init --dhcp=false --hostip=172.16.0.1
{% endhighlight %}

This will initialize a `boot2docker-vm` and also create a host-only network with the above mention IP and no DHCP for 
that network interface (we won't need it).

If you already have a `boot2docker-vm` running, you have two choices: (a) destroy (`boot2docker destroy`) and re-create with the above command. This is recommended if you don't have a lot of important containers running; (b) change the existing `boot2docker-vm` and manually add the host-only interface via VirtualBox (it's pretty easy, you'll figure it out). 

#### Start boot2docker-vm

{% highlight bash %}
$ boot2docker up
{% endhighlight %}

This will bring up the `boot2docker-vm`. It will succeed but if you study the output below carefully, it complains about the missing IP address that could not be assigned to the host-only interfaces (this was done on purpose).

{% highlight bash %}
$ boot2docker up
2014/08/14 22:13:39 Waiting for VM to be started...
.............
2014/08/14 22:14:18 Started.
2014/08/14 22:14:19   Trying to get IP one more time
2014/08/14 22:14:19 Auto detection of the VM's IP address failed.
2014/08/14 22:14:19 Please run `boot2docker -v up` to diagnose.
{% endhighlight %}

We will configure the IP in the next step.

#### Configure host-only network adapter

Run the following command to assign an IP and netmask to the newly configured host-only adapter `eth1`.

{% highlight bash %}
$ boot2docker ssh "sudo ifconfig eth1 172.16.0.11 netmask 255.255.0.0"
{% endhighlight %}

Let's ensure you can ping eth1 from your Mac:
{% highlight bash %}
$ ping -c1 172.16.0.11 
PING 172.16.0.11 (172.16.0.11): 56 data bytes
64 bytes from 172.16.0.11: icmp_seq=0 ttl=64 time=8.704 ms

--- 172.16.0.11 ping statistics ---
1 packets transmitted, 1 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 8.704/8.704/8.704/0.000 ms
{% endhighlight %}

#### Setting up a route
So far you can ping the host-only adapter, however, you cannot ping the docker containers as we saw earlier. 
You need to setup a route for this. 

{% highlight bash %}
$ sudo route -n add 172.17.0.0/16 172.16.0.11
{% endhighlight %}
This will ensure that all contains which get a `172.17/16` address can be resolved via the host-only adapter. 
Let's make sure the route was added correctly:
{% highlight bash %}
$ netstat -nr |grep 172.17
172.17             172.16.0.11        UGSc            0        0 vboxnet
{% endhighlight %}

Look's good so we can go back that test the initial problem we were going after. 


#### Test if you can reach a container

Let's start a container back up and run nc:
{% highlight bash %}
$ docker run -i -t ubuntu bash
root@52eee3e2c7f6:/# ifconfig eth0 | grep addr
eth0      Link encap:Ethernet  HWaddr 16:85:bf:22:57:fa  
          inet addr:172.17.0.5  Bcast:0.0.0.0  Mask:255.255.0.0
          inet6 addr: fe80::1485:bfff:fe22:57fa/64 Scope:Link
root@52eee3e2c7f6:/# nc -l 7777
{% endhighlight %}

Let's make sure we can connect to "service" offered by the container:
{% highlight bash %}
$ telnet 172.17.0.5 7777
Trying 172.17.0.5...
Connected to 172.17.0.5.
Escape character is '^]'.
{% endhighlight %}

Voila, we are connected. Type something in the telnet session and you'll see it on the 
other side. Now we can move on to getting DNS to work.

---------------------------------------

### Setup DNS for Docker
Now that we are able to ping docker containers seamlessly from our Mac, it would be great
to have DNS names automatically registered whenever a docker container comes up. 
There are two related projects out there called [SkyDock](https://github.com/crosbymichael/skydock) and [SkyDNS](https://github.com/crosbymichael/skydns) that fill this gap. 
Setting them up is fairly easy. I won't go into the details of the project and the internals
because [Michael Crosby](http://crosbymichael.com/), the founder of the project does a much better job.

In a nutshell, you need to start two services, [SkyDock](https://github.com/crosbymichael/skydock)  and [SkyDNS](https://github.com/crosbymichael/skydns), which are both provided
as pre-built containers. SkyDNS is a classical DNS server and SkyDock is listening at the docker 
host for container being started and stopped, keeps track of them and creates the DNS entries in SkyDock. 

To get started, we need to "tune" the docker agent commands in the `boot2docker-vm` a bit. Let's kill the existing docker daemon running inside the `boot2docker-vm`.

#### Changing the arguments of the docker daemon

{% highlight bash %}
$ boot2docker ssh 
docker@boot2docker:~$ sudo pkill bin/docker
{% endhighlight %}

Now restart the docker daemon with the following options:
{% highlight bash %}
docker@boot2docker:~$ sudo /usr/local/bin/docker -d -g /var/lib/docker -H unix:// -H tcp://0.0.0.0:2375 --bip=172.17.42.1/16 --dns=172.17.42.1 &
{% endhighlight %}

The `--bip` flag points to the IP address of the `docker0` bridge. You can find out by running `ifconfig docker0 |grep addr` inside boot2docker. The DNS server will bind to that IP address. The `--dns` flag will tell the docker agent that each container that is launched should have `172.17.42.1` as the DNS server in `/etc/resolv.conf`.

#### Launching SkyDNS and SkyDock

Now we are ready to launch the two containers. First we launch SkyDNS, then SkyDock. The first time this may take a while because docker will have to pull both containers from the public registry.
{% highlight bash %}
$ docker run -d -p 172.17.42.1:53:53/udp --name skydns crosbymichael/skydns -nameserver 8.8.8.8:53 -domain docker
$ docker run -d -v /var/run/docker.sock:/docker.sock --name skydock crosbymichael/skydock -ttl 30 -environment dev -s /docker.sock -domain docker -name skydns
{% endhighlight %}

The SkyDock container has two interesting arguments: `--domain` is the name of the "fake" domain that all hosts will get. The `--environment` is a prefix to the domain name. We will see an example later. Ensure now that both containers where started and check the output:
{% highlight bash %}
$ docker ps
CONTAINER ID        IMAGE                          COMMAND                CREATED             STATUS              PORTS                              NAMES
f0eeaff0a54e        crosbymichael/skydock:latest   /go/bin/skydock -ttl   6 minutes ago       Up 6 minutes                                           skydock             
cff583466d45        crosbymichael/skydns:latest    skydns -http 0.0.0.0   10 minutes ago      Up 10 minutes       8080/tcp, 172.17.42.1:53->53/udp   skydns              
{% endhighlight %}

#### Testing the DNS server

We should now be able to get results from the DNS server. Let's start a docker container as follows: 
{% highlight bash %}
$ docker run -i -t --name u1 ubuntu bash
{% endhighlight %}

With SkyDock, the general rule for a DNS name is as follows: 
{% highlight bash %}
    <CONTAINER_NAME>.<IMAGE_NAME>.<ENVIRONMENT>.<DOMAIN>
{% endhighlight %}

So in this case the DNS name is  `u1.ubuntu.dev.docker`. Let's query the result with dig:
{% highlight bash %}
$ dig @172.17.42.1 +short u1.ubuntu.dev.docker
172.17.0.8
{% endhighlight %}

If we start another container `docker run -i -t --name u2 ubuntu bash` and the use dig to query, we can get a list of all `ubuntu` containers as follows:
{% highlight bash %}
$ dig @172.17.42.1 +short ubuntu.dev.docker
172.17.0.8
172.17.0.9
{% endhighlight %}

#### Update /etc/resolv.conf

If you want seamless DNS resolution while developing, you need to enter the DNS server as the first in `/etc/resolv.conf`.
Something like this:

{% highlight bash %}
$ cat /etc/resolv.conf 
#
# Mac OS X Notice
#
# This file is not used by the host name and address resolution
# or the DNS query routing mechanisms used by most processes on
# this Mac OS X system.
#
# This file is automatically generated.
#
domain home
nameserver 172.17.42.1
nameserver 10.0.0.138
{% endhighlight %}

That's it, you can now enjoy full DNS-enabled docker containers. If you get tired of manually adding/removing the DNS server the `/etc/resolv.conf` after you stop the SkyDock container, you can create "Network Locations" in OS X. Go to System Menu (top left Apple symbol) -> Location and configure two profiles, one with SkyDNS server one without. Then you can easily switch.

---------------------------------------

### Connecting to VPN will break things

If you have to use Cisco VPN to connect to your corporate network, you will soon realize that once you do that, pinging the docker containers will no longer work nor will DNS. I don't know why but it seems that VPN is doing some magic with firewalls.

Try connecting to VPN and test yourself. If the previous `dig` query still works you are fine 
and you can skip this step. If you are getting a message like `;; connection timed out; no servers could be reached` you are in trouble.

The fix that works for me is to find a firewall rule that blocks all traffic (from any to any):

{% highlight bash %}
$ sudo ipfw -a list | grep "deny ip from any to any"
Password:
00411       94       10039 deny ip from any to any
{% endhighlight %}

Now try to delete this rule:
{% highlight bash %}
$ sudo ipfw delete 00411
{% endhighlight %}

And now test if your `dig` query works again. Mine does :). Keep in mind that you have to redo this step *every* time you reconnect your VPN. The git repository below also has a script that automates that process as well.

---------------------------------------

### A simple script that ties all this together

I provided two scripts in [my git repo](https://github.com/frosenberg/docker-dns-scripts). There are some instructions in the readme. In a nutshell, the `enable-docker-dns.sh` implements the whole procedure described in this blog. When using those scripts, be aware that they are tested only in my environment and work for me. If you have problem please file and issue in github as there are many corner cases that I may not handle.

The second script is the `vpn-fix.sh` script that I run every time I reconnect to my corporate VPN. It cleans out some conflicting rules. 















