---
title: The New Homelab!
date: 2025-06-05 12:00:00 
categories: [homelab,proxmox]
tags: [homelab,proxmox]
---

# The "New" Host
So, I finally got around to turning my old PC parts into have my own Proxmox host named "homelabv1"! I am something of an AMD fan which will become apparent in time.  

# Specs
I perform my pc upgrades like the ship of Theseus. If I change out 1 component of my PC at a time, when does it cease to be the same PC that I started with? Either way, after a period of time and many upgrades I eventually have another computer worth of parts lying around. This is an amalgamation of that.  
  
CPU: AMD Ryzen 1600 (6 core 12 thread)  
Motherboard: Asrock X370  
RAM: 16GB of G Skill running at 2400   
GPU: AMD RX 470 8gb  
Storage: 256gb Kingston SSD   
![The host](assets/img/homelab.jpg) 
So the specs of the host arent very impressive but they are workable for the time being. The GPU is just in case if I need GPU passthrough for a project but is a weak link in this chain for sure. Will edit with a photo later. 

# Networking
Freshly installed in tandem with my ISP's modem is my new Gl.iNet Flint 2 router. It is a great OpenWRT based router with an awesomely simple UI to set up my static IPs, the built in AddGuard Home, and port forward for any projects that require it.  
![Very basic map of the lab](assets/img/homelab_network_map.png)

# The Future 
I will be creating a writeup of a classic homelab venture, building a minecraft server. This will, however be done on a Linux VM with Docker. I also plan on securing my lab with Tenable Nessus Essentials which will be a writeup all on its own. Further on, I am unsure but will post my testng of various things to try to learn things. 
