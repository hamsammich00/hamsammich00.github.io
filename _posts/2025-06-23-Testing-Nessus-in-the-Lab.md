---
title: Testing Nessus in the Lab
date: 2025-06-23 20:00:00 
categories: [Nessus,homelab]
tags: [nessus,proxmox]
---

# Nessus in a Nutshell 
Nessus is a enterprise grade vulnerability scanning tool with a free/community version called [Nessus Essentials](https://www.tenable.com/products/nessus/nessus-essentials), usable for 1 year. They do, however, have a large paid version with some minor differences including an installable agent for quicker deployments to large groups and faster scans. This Essentials edition only allows for the scanning of 16 total assets. I built my Nessus VM on Debain with the GNOME GUI, powered by 2 cores and 4GB of ram. While this is below the recommended specs, it scanned my 4 IPs perfectly fine. It should be noted, the GUI was removed after configuration to conserve RAM usage.

# Setting up the Scans
The setup for Nessus was quite easy, as was the setting up of scans. It allows for the scanning of IP ranges, but I input specific IPs for my VMs, Host, and another devices to test it out. My Windows machine is behind an update and I wanted to see if it would catch this in its "Deep Scan" after playing around with some non-credentialed scans. To do this, I set up a new account on each device to act as a service account. Being as I only had 4-5 devices, doing this manually was not an issue. Once the accounts were set up, I configured my scan.
![Setting up the IPs](assets/img/nessusproject/Screenshot2025-06-23212101.png)
![Setting up the login](assets/img/nessusproject/Screenshot2025-06-23212145.png)
This is the basic look of the configuration I used, it was all defaults for "Deep Scan".

# The Results
The scans took a few minutes as they were credentialed but were very in depth! I was surprising in both a good way and a bad way. I will explain that further down. 
![Scan bar graph](assets/img/nessusproject/Screenshot2025-06-23203745.png)
The Minecraft server that was built for my previous post required port forwarding which was one of the vulnerabilities picked up with the scan.
![Minecraft Vuln](assets/img/nessusproject/Screenshot2025-06-23214659.png)
The most surprising part of all, was that Nessus proceeded in one of it's vulnerabilities it detected, to screenshot the screen of the device it was able to access! While the screenshot was not of anything, the fact Nessus attempted to do so as a way of proving the attack was impressive. 
![It tried to take a screenshot!](assets/img/nessusproject/Screenshot2025-06-23204502.png)
The part of this that was a bit surprising in a negative manner, is my Windows machine I scanned is on the insider preview channel. I made it a point to delay my updates for this specific test. I assume this is why Nessus was unable to detect any Windows/Microsoft CVEs on the machine. Nonetheless, for a pure scanning software Nessus is very competent. I plan on testing others in order to determine what I want as a permanent fixture in my home lab environment. 