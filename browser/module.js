import initEmscriptenModule from './qemu/out.js';
export async function boot({ image, kernel, initramfs, pty }) {
  const Module = { pty };
  Module.mainScriptUrlOrBlob = new URL('./qemu/out.js', location.href).href;
  const instance = await initEmscriptenModule(Module);
  const write = async (path, file) => instance.FS.writeFile(path, new Uint8Array(await file.arrayBuffer()));
  await write('/omarchy-rootfs.ext4', image);
  if (kernel) await write('/vmlinuz-linux', kernel);
  if (initramfs) await write('/initramfs-linux.img', initramfs);
  instance.callMain([
    '-M', 'virt', '-cpu', 'max', '-m', '2048M', '-smp', '4',
    '-accel', 'tcg,tb-size=500,thread=multi', '-nographic',
    '-drive', 'file=/omarchy-rootfs.ext4,format=raw,if=virtio',
    ...(kernel ? ['-kernel', '/vmlinuz-linux'] : []),
    ...(initramfs ? ['-initrd', '/initramfs-linux.img'] : []),
    '-append', 'root=/dev/vda rw rootwait console=ttyAMA0 console=hvc0 loglevel=4 systemd.show_status=false rd.systemd.show_status=false mitigations=off nowatchdog'
  ]);
}
