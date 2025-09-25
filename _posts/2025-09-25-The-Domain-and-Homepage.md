---
title: The Domain and Homepage
date: 2025-09-25 12:00:00 
categories: [Infrastructure]
tags: [Windows, Docker]
---


# The Domain

In order get more acquainted with the group-up workings of an enterprise environment, I have stood up a domain controller using Windows Server 2022 Core. This allows for a super lightweight setup. To top this off, I also created a normal Server 2022 VM. I now have multiple flavors of OS including Windows, Rocky, Alma, and Debian. Every one so far has been domain joined to my AD. This has made the process of logging into things much simpler and now with the ability to adjust security policies and accesses, I can very granular in the testing of changes to my environment.

![List of my VMs and their tags](assets/DomainandHomepage/AllmyVMs.png)

The different variations of Linux each presented unique challenges but in the end were similar enough that it was possible to get them all in sync so that swapping between them is much easier. Alma, however, does not inherently have a repo with Docker on it. I had to add another repo to its list to check in order to download Docker. Docker is important to the second half of this writeup.

# Homepage and Traefik, a Perfect Pair

Since I joined them to the domain to make them easier to create and log into, I figured it be best to create a landing page for my applications. 
![My Homepage](D:\HomeLabStuff\hamsammich00.github.io\assets\img\DomainandHomepage\HomepagePic.png)
I achieved this through a basic docker setup for the application [Homepage] (https://gethomepage.dev/). Homepage was super simple to get pulled and set up as it is mostly done through .yaml files with good documentation on their website. Clicking on any of the rectangles opens a new tab open to said application. If I clicked on the "Proxmox" bar, it would send me to the IP and port for my Proxmox host. 

Speaking of IPs, they aren't as clean looking as a URL, nor are they as easy to remember. This brought me to the plan of using Traefik for a reverse proxy. If you are to look back at my photo of my Homepage, you'll notice home.hamsammich.local in the address bar and not some nonsense IP and port. This was quite a challenge to get right as with everything with DNS. In order to reach these addresses from my non domain joined desktop, I had to go into AdGuard Home and set up a DNS forwarding rule that checks anything ending in .hamsammich.local to the IP of the AD server on my network to use the DNS it has. Once this was configured, I was able to configure the docker compose files for both the Homepage and Traefik to use FQDN to reach these applications. I will post my compose files on my demos repo. I will continue updating and upgrading the Homepage as my application list grows. 


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
