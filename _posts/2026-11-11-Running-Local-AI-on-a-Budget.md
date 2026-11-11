---
title: "Running Local AI on a Budget: Old GPUs, Big Models"
date: 2026-11-11 01:00:00
categories: [homelab, AI]
tags: [AI, LLM, llama.cpp, GPU, Windows]
---

# Another Homelab Rabbit Hole

Well, it's been a while since I've posted here. The lab hasn't been sitting idle, though. Somewhere between working on infrastructure, messing with Proxmox, and finding new uses for old hardware, I ended up going deeper down the local AI rabbit hole.

I like being able to run things on my own equipment. It's part of why I started building a homelab in the first place. Local large language models (LLMs) fit right into that idea: download a model, run it on your own machine, and experiment without having to send every prompt to a hosted service.

The catch? GPUs with lots of VRAM aren't cheap. Instead of buying a new card specifically for AI, I wanted to see how far I could get with hardware I already had and one decidedly old enterprise GPU.

# The Hardware

My current test machine isn't a dedicated AI server. It's my desktop, with a few additions:

| Component | Hardware |
| --- | --- |
| CPU | AMD Ryzen 7 5800X |
| System RAM | 64 GB DDR4-3200 |
| Primary GPU | AMD Radeon RX 6700 XT, 12 GB VRAM |
| Secondary GPU | NVIDIA Tesla P4, 8 GB VRAM |
| Operating system | Windows |
| Inference software | [llama.cpp](https://github.com/ggml-org/llama.cpp) |

On paper, that's **20 GB of total GPU memory**, plus 64 GB of system RAM. That doesn't mean Windows treats the two cards as one giant 20 GB GPU. The memory is physically separate, and the software has to decide which model layers and other data live on each device.

# Why VRAM Matters So Much

The big limitation with local models isn't always the GPU's raw processing power. Very often, it's how much of the model you can actually keep in GPU memory.

A model described as "27B" has roughly 27 billion parameters. If those weights were stored at 16 bits each, the weights alone would take about 54 GB, before accounting for anything else. That's not happening on my hardware without substantial reliance on system memory.

This is where **quantization** comes in. Quantization stores model weights with fewer bits, trading some numerical precision for much lower memory requirements. For example, a theoretical 4-bit representation of 27 billion weights would take approximately 13.5 GB (decimal). Real-world quantized files are generally larger because they also need scaling information and may store some tensors at higher precision.

But file size isn't the entire memory requirement. Context length, the key/value (KV) cache, compute buffers, and backend overhead also consume memory. A model file that appears to fit into your available VRAM can still run out of memory once you actually load it.

# Two Very Different GPUs, One Complicated Experiment

[llama.cpp](https://github.com/ggml-org/llama.cpp) is what makes this whole experiment possible. It's an inference engine that can run GGUF models using a CPU, a GPU, or a combination of the two. It supports multiple hardware backends, including CUDA for NVIDIA GPUs and Vulkan for compatible GPUs, including AMD cards.

Running a model across multiple GPUs is a bit more involved than just adding their VRAM together. With llama.cpp's default multi-GPU **layer split**, different layers of the model can be placed on different devices. The program still has to manage memory and move intermediate results between those devices as inference progresses.

My setup is a little more nonstandard because one card is AMD and the other is NVIDIA. They don't use the same native compute backend. While llama.cpp supports building CUDA and Vulkan backends together, whether a specific mixed-device configuration works well depends on the build, driver support, the model, and the selected devices. You have to verify what the runtime actually detects and offloads; installing a second card doesn't guarantee automatic cooperation.

This was all hooked up to Hermes on my desktop with llama.cpp handling the actual model itself. Hermes gave it the tools to act as an agent how other agents like OpenClaw or Claude Code work to make real tangible changes on my computer.  

Relevant reading: [llama.cpp's multi-GPU guide](https://github.com/ggml-org/llama.cpp/blob/master/docs/multi-gpu.md), [llama.cpp build instructions](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md), and [NVIDIA's CUDA architecture support matrix](https://docs.nvidia.com/datacenter/tesla/drivers/cuda-toolkit-driver-and-architecture-matrix.html).

# Small and Fast, or Bigger and Smarter?

Small models in the 3B-4B range can be surprisingly responsive, but I've found they often struggle with the kinds of detailed technical questions and multi-step tasks I want to throw at them. PowerShell, infrastructure troubleshooting, and Python-related reasoning are not particularly forgiving when a model confidently invents the next step.

So I've been experimenting with larger models, including a few different finetunes of **27B-class models** with Qwen 3.8 being the most common. Two of the best setups I found were a **Mixture of Experts (MOE)** involving 4 7B models and another MOE using 8 3B models.  In one of my 27B configurations, I saw roughly **3-4 generated tokens per second**. That isn't fast at all. The 2 MOE models were much faster as the many small models did not take much compute to finish but I failed to record a rough tokens per second. Performance changes with the model, quantization, context length, GPU offload, and whatever else the computer is doing. Still, seeing a model that size run at all on my collection of hardware is pretty entertaining.

There are tradeoffs either way:

- **Smaller models:** Less memory, faster responses, but often weaker at complicated tasks.
- **Larger quantized models:** Potentially stronger responses, but more memory use and slower generation.
- **More CPU offload:** Lets oversized models run using system RAM, usually at a noticeable performance cost.
- **More context:** Useful for longer conversations and documents, but increases KV-cache memory requirements.

More parameters aren't a guarantee of a better answer, either. The model's training, architecture, and suitability for the task matter just as much as the number printed on the download page.

# Where I Want to Take It

The end goal isn't to make a local chatbot just for the sake of having one. I want an assistant I can use for technical work without depending on a hosted API for every little experiment. I'm particularly interested in PowerShell, Linux administration, and eventually tying it into the Python I've been working on.

There are plenty of things left to learn: model selection, quantization, better multi-GPU handling, retrieval from my own documentation, and maybe fine-tuning later on. For now, I'm mostly enjoying the process of making hardware do things it probably wasn't purchased to do.

If nothing else, this is proof that a homelab project doesn't always need the newest hardware. Sometimes you just need an old GPU, a fan, and a willingness to troubleshoot something completely unnecessary.

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
