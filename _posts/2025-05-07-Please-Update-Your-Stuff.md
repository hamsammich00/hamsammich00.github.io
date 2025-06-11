---
title: Please, update your stuff
date: 2025-05-07 12:00:00 
categories: [windows,powershell]
tags: [windows,updates,powershell]
---

# Windows Updates
Getting Windows to stay up to date in any org can be a monumental task and for some a full time job. I've learned a few tricks myself that any admin or home labber (not even sure if that's the correct term) can implement into their own devices. Your new best friend is the PSWindowsUpdate module. Run the following in PowerShell to get it for yourself. 
```powershell
Install-Module PSWindowsUpdate
```
Thats just gonna get you the module. This next bit is the fun part. Run the following to get Windows updates:
```powershell
Get-WindowsUpdate -install
#if you add the -AcceptAll flag it does exactly what it says, 
#it accepts all the updates automagically. 
```
If this is not all the updates you're looking for, feel free to add the -MicrosoftUpdate flag.
```powershell
Get-WindowsUpdate -MicrosoftUpdate -install
```
For automation or those feeling like not watching over the machine to make it reboot, throw on the -AutoReboot flag and it does exactly that, reboots the machine if it is needed. Depending on what solution you use to actually administer updates or push scripts remotely, you may not need this. Below is the basis for something that most folks could automate out in a way of their choosing but does not force a reboot once completed if a reboot is required for an update.
```powershell
#Check if the module is installed, then continue with the updates
$ModuleName = "PSWindowsUpdate"
if (-not (Get-Module -ListAvailable -Name $ModuleName)) {
    Install-Module $ModuleName -Scope AllUsers -Force
}

#The actual updates
Get-WindowsUpdate -MicrosoftUpdate -Install -AcceptAll
```
So that was a rough crash course on how I like to update Windows based machines. Remember, test before using widely in order to avoid issues. 

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
