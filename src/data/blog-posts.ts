import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "six-challenges-ai-journey",
    title: "Six Challenges To Tackle When Embarking On Your AI Journey",
    date: "2020-02-20",
    tags: ["AI", "Machine Learning", "Organizations", "Engineering"],
    excerpt:
      "A lot has been written about how AI is the next big thing. We explore some of the difficulties derived from the particularities of AI projects that can keep them from being successful.",
    content: `<p>This blog post was co-authored with <a href="https://www.linkedin.com/in/davidmosen/?originalSubdomain=es" target="_blank" rel="noopener noreferrer">David Mosen</a>.</p>

<p>A lot has been written about how AI is the next big thing, how it is revolutionizing businesses across industries, even comparing its transformative power to that of electricity 100 years ago. These are catchy headlines that seem in stark contrast with others that predict and observe staggering failure rates for AI projects. So, what is the source of such an apparent contradiction? In this article, we will explore some of the difficulties derived from the particularities of AI projects that can eventually keep them from being successful, from a technology and project management perspective.</p>

<p>Just as with software projects, AI project management requires proper execution of processes that address business concerns, like requirement, risk and release management. Likewise, causes for failure are mostly shared, including poorly defined goals, miscommunication, insufficient end-user involvement and improper assessment of available resources. On top of that, AI projects face additional hurdles, arguably arising from the introduction of data science into the mix, with its data requirements and the novelty of the methods often involved.</p>

<p>We have compiled a list of the six main challenges that we have been observing during the delivery of 100+ AI projects:</p>

<h2>Challenge 1: Trying to run before you can walk</h2>
<p>Digitalization precedes data-based projects, like those involving AI. Going from analog to AI is sure to be a treacherous journey, assuming that it is a possible and sensible one. Granted that we are at a time when most large businesses have a clear idea of whether, how and to what extent they can benefit from digital infrastructure. However, it is also true that most are still not data-driven, a last leap that often requires a change in leadership and a great deal of flexibility.</p>

<h2>Challenge 2: Stretching the short supply</h2>
<p>Data science and AI expertise is not only scarce, but also dispersed in the knowledge space, in the sense that it is still a broadly defined domain that gathers from several better-delimited fields like statistics and software engineering. From a project personnel perspective, this means that single profiles which perfectly match the required expertise might not always be available. Consequently, team harmonization and coordination take a more prominent relevance.</p>

<h2>Challenge 3: Communication gap</h2>
<p>Together with business and software engineering, data science represents the third leg of an AI project; an addition that introduces further complexity to the interactions across knowledge domains, on top of its intrinsic intricacies. This calls for even further efforts on communication and conflict management, as well as change management.</p>

<h2>Challenge 4: You can't assess your tech cake and eat it too</h2>
<p>AI projects require thorough, yet limited-in-time, technology assessment. The AI and data science landscape is still developing at an accelerated pace, with not just new tools and services, but also new paradigms. Thus, projects will face compromises: consider the best balance between cutting-edge and maturity; and deciding whether to explore less options in more depth, as opposed to a wider range of options at a higher risk.</p>

<h2>Challenge 5: Locked-in</h2>
<p>Another consequence of a yet-maturing AI environment is the high probability of any given technology or vendor to quickly grow out of favor. This situation is combined with the fact that large cloud providers are rapidly becoming the go-to vendors for full-cycle data science development. Overall, this makes it important to carefully assess the possibility of lock-in and the level of portability when choosing each of the pieces of the tech stack.</p>

<h2>Challenge 6: Data is right, aligned</h2>
<p>Software developed within the scope of a project is required to be aligned with business objectives. So does data that is gathered and prepared. Yet, while software requires engineering processes, data requires processes that mix engineering and science, including collection, exploration and transformation. Checking for data availability, completeness, suitability and unbiasedness lean more towards a science approach.</p>

<h2>Seek professional help</h2>
<p>Whether you decide to undertake the journey in-house or to seek the expertise of an AI consulting services partner, the above challenges have to be addressed to arrive to a successful AI project. A success formula will have to bake in a proper AI mindset that includes the environment, processes, people, data and technology into its project execution and management.</p>

<p>Originally appeared in the <a href="https://www.wearedevelopers.com/magazine/six-challenges-to-tackle-when-embarking-on-your-ai-journey/" target="_blank" rel="noopener noreferrer">We Are Developers Magazine</a>.</p>`,
  },
  {
    slug: "docker-boot2docker-dns-resolution",
    title: "Docker, boot2docker and DNS resolution of containers",
    date: "2014-08-08",
    tags: ["Docker", "boot2docker", "Cloud"],
    excerpt:
      "How to setup a full development environment with docker on Mac OS X, including seamless container access, DNS capabilities, and VPN compatibility.",
    content: `<h2>... or how to setup a full development environment with docker (on Mac OS X)</h2>

<p>This tutorial should help to setup a development environment on Mac OS X that relies heavily on docker and boot2docker. Based on my experience, docker is an excellent tool to create and run applications very effectively during dev, test and production. However, not having great development environment where docker can be used effectively slows you down and requires a lot of hand-tuning each an every time during the development process.</p>

<h3>Goal of this tutorial</h3>
<p>The goal is to have the following capabilities available after you complete this guide.</p>
<ol>
<li>Run docker containers from your dev machine and have seamless access to all container using their IPs.</li>
<li>Enable DNS capabilities for all containers and being able to resolve them from your dev machine.</li>
<li>Ensure that this will also work if you have to use a corporate VPN client (like Cisco AnyConnect).</li>
<li>Being able to quickly set this up and tear it down with a <a href="https://github.com/frosenberg/docker-dns-scripts" target="_blank" rel="noopener noreferrer">simple script</a>.</li>
</ol>

<h3>Prerequisites</h3>
<ul>
<li>Mac OS X (this guide is not required for Linux because it can run docker natively)</li>
<li><a href="http://boot2docker.io/" target="_blank" rel="noopener noreferrer">boot2docker</a> v1.1.1</li>
<li><a href="http://www.docker.com" target="_blank" rel="noopener noreferrer">docker</a> v1.1.1</li>
<li>git for checking out the git repo with the scripts</li>
</ul>

<h3>What is the current problem?</h3>
<p>If you start a docker container on MacOS, it will actually be running inside a VirtualBox VM that boot2docker is setting up for you under the cover. The consequence is that each docker container cannot be pinged or resolved from the Mac which makes it hard to use during development.</p>

<h4>Start a docker container and run a server with nc</h4>
<pre><code>$ docker run -i -t ubuntu bash
root@4cb806d8ddab:/# ifconfig eth0
eth0      Link encap:Ethernet  HWaddr be:70:6a:45:22:ee
          inet addr:172.17.0.4  Bcast:0.0.0.0  Mask:255.255.0.0
root@4cb806d8ddab:/# nc -l 7777</code></pre>

<h4>Try to connect to the server</h4>
<pre><code>$ telnet 172.17.0.4 7777
Trying 172.17.0.4...
telnet: connect to address 172.17.0.4: Operation timed out</code></pre>

<p>It will timeout because the IP cannot be resolved. So let's fix that...</p>

<h3>Setting up boot2docker</h3>

<h4>Initialize the boot2docker-vm</h4>
<pre><code>$ boot2docker init --dhcp=false --hostip=172.16.0.1</code></pre>

<h4>Start boot2docker-vm</h4>
<pre><code>$ boot2docker up</code></pre>

<h4>Configure host-only network adapter</h4>
<pre><code>$ boot2docker ssh "sudo ifconfig eth1 172.16.0.11 netmask 255.255.0.0"</code></pre>

<h4>Setting up a route</h4>
<pre><code>$ sudo route -n add 172.17.0.0/16 172.16.0.11</code></pre>

<p>This will ensure that all containers which get a 172.17/16 address can be resolved via the host-only adapter.</p>

<h3>Setup DNS for Docker</h3>
<p>Now that we are able to ping docker containers seamlessly from our Mac, it would be great to have DNS names automatically registered whenever a docker container comes up. <a href="https://github.com/crosbymichael/skydock" target="_blank" rel="noopener noreferrer">SkyDock</a> and <a href="https://github.com/crosbymichael/skydns" target="_blank" rel="noopener noreferrer">SkyDNS</a> fill this gap.</p>

<h4>Changing the arguments of the docker daemon</h4>
<pre><code>$ boot2docker ssh
docker@boot2docker:~$ sudo pkill bin/docker
docker@boot2docker:~$ sudo /usr/local/bin/docker -d -g /var/lib/docker \\
  -H unix:// -H tcp://0.0.0.0:2375 \\
  --bip=172.17.42.1/16 --dns=172.17.42.1 &amp;</code></pre>

<h4>Launching SkyDNS and SkyDock</h4>
<pre><code>$ docker run -d -p 172.17.42.1:53:53/udp --name skydns \\
  crosbymichael/skydns -nameserver 8.8.8.8:53 -domain docker
$ docker run -d -v /var/run/docker.sock:/docker.sock --name skydock \\
  crosbymichael/skydock -ttl 30 -environment dev \\
  -s /docker.sock -domain docker -name skydns</code></pre>

<h4>Testing the DNS server</h4>
<pre><code>$ docker run -i -t --name u1 ubuntu bash
$ dig @172.17.42.1 +short u1.ubuntu.dev.docker
172.17.0.8</code></pre>

<h3>Connecting to VPN will break things</h3>
<p>If you have to use Cisco VPN to connect to your corporate network, you will soon realize that once you do that, pinging the docker containers will no longer work. The fix:</p>
<pre><code>$ sudo ipfw -a list | grep "deny ip from any to any"
00411       94       10039 deny ip from any to any
$ sudo ipfw delete 00411</code></pre>

<h3>Scripts</h3>
<p>I provided two scripts in <a href="https://github.com/frosenberg/docker-dns-scripts" target="_blank" rel="noopener noreferrer">my git repo</a>. The <code>enable-docker-dns.sh</code> implements the whole procedure described in this blog. The <code>vpn-fix.sh</code> script can be run every time you reconnect to your corporate VPN.</p>`,
  },
];
