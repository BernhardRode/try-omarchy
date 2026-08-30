# Browser runtime

This directory is the second Try Omarchy runtime: an experimental AArch64 Linux VM running in a browser through WebAssembly QEMU.

It is based on [ktock/qemu-wasm](https://github.com/ktock/qemu-wasm). The GitHub Pages workflow builds `qemu-system-aarch64` and publishes the browser shell.

## Current milestone

- AArch64 system emulation
- QEMU TCG JIT with multi-threading enabled
- Existing Try Omarchy `rootfs.ext4`, kernel, and initramfs can be selected locally
- Serial console via xterm
- `virtio-blk` guest disk
- No macOS Hypervisor Framework
- No native AppKit window
- No graphical Hyprland/WebGPU output yet

The next milestone is graphical output. The guest image is deliberately not copied into the repository or GitHub Pages because it is multi-gigabyte and unsuitable for static Pages hosting. A public release/object-storage URL can be added later for one-click boot.
