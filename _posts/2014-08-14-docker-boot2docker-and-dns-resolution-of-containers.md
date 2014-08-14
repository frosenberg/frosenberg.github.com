---
layout: post
title: "Docker, boot2docker and DNS resolution of containers"
modified:
categories: 
excerpt:
tags: [docker, boot2docker]
image:
  feature:
date: 2014-08-14T20:10:44+02:00
comments: true
---

###... or how to setup a full development environment with docker (on Mac OS X)

This tutorial should help to setup a development environment on Mac OS X that relies heavily on docker and boot2docker. Based on my experience, docker is an excellent tool to create and run applications very effectively during dev, test and production. However, not having great development environment where docker can be used effectively slow you down and requires a lot of hand-tuning each an every time during the development process.


### Goal of this tutorial

The goal is to have the following capabilities available after you complete this guide.

  1. Run docker containers from your dev machine and have seamless access to all container using their IPs.  
  2. Enable DNS capabilities for all containers and being able to resolve them from your dev machine.
  3. Ensure that this will also work if you have to use a corporate VPN client (like Cisco AnyConnect).
  4. Being able to quickly set this up and tear it down with a simple script.


### Prerequisites

You need to have the following software installed.

  * Mac OS X (this guide is not required for Linux because it can run docker natively)
  * boot2docker v1.1.1
  * docker v1.1.1
  * git


### Setting up boot2docker

If you have boot2docker already running, your VirtualBox (the hypervisor that is used by boot2docker) VM instance boot2docker-vm has been created already.

  1. Initialize the boot2docker VM
```
$ boot2docker init --dhcp=false --hostip=172.16.0.1
```
This will initialize a `boot2docker-vm` and also create a host-only network 

If you already have a `boot2docker-vm` running, you have two choices:
  1. Destroy and re-create with the above command. This is recommended if you don't have a lot of important containers running.
  2. Change the existing `boot2docker-vm` and manually add the host-only inteface. 

