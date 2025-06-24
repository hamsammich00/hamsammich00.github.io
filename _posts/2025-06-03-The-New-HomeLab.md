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
![The host](assets/img/Homelab.jpg) 
So the specs of the host aren't very impressive but they are workable for the time being. The GPU is just in case if I need GPU passthrough for a project but is a weak link in this chain for sure. Will edit with a photo later. 

# Networking
The networking setup is as dead simple as it gets. I will be doing my administration with the GUI for Proxmox that is on the host machine and with MobaXTerm to SSH into the VMs that are headless. If I build anything with a GUI, I will control through the Proxmox console.  
![Very basic map of the lab](assets/img/homelab_network_map.png)
  
# The Future 
I will be creating a writeup of a classic homelab venture, building a minecraft server. This will, however be done on a Linux VM with Docker. I also plan on securing my lab with Tenable Nessus Essentials which will be a writeup all on its own. Further on, I am unsure but will post my testing of various things to try to learn things.   

<script src="https://giscus.app/client.js"
        data-repo="hamsammich00/hamsammich00.github.io"
        data-repo-id="R_kgDOOllQ8w"
        data-category="General"
        data-category-id="DIC_kwDOOllQ884CrWhh"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="en"
        crossorigin="anonymous"
        async>
</script>
