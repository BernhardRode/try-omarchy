import 'https://unpkg.com/xterm@5.3.0/lib/xterm.js';
import 'https://unpkg.com/xterm-pty/index.js';
import { boot } from './module.js';
const status = document.querySelector('#status');
const start = document.querySelector('#start');
const terminal = new Terminal({ convertEol: true, cursorBlink: true });
terminal.open(document.querySelector('#terminal'));
start.addEventListener('click', async () => {
  const image = document.querySelector('#image').files[0];
  const kernel = document.querySelector('#kernel').files[0];
  const initramfs = document.querySelector('#initramfs').files[0];
  if (!image) { status.textContent = 'Select the guest rootfs image first.'; return; }
  status.textContent = 'Starting AArch64 QEMU in WebAssembly…';
  start.disabled = true;
  terminal.clear();
  const { master, slave } = openpty();
  terminal.loadAddon(master);
  try {
    await boot({ image, kernel, initramfs, pty: slave });
    status.textContent = 'VM exited.';
  } catch (error) {
    console.error(error);
    terminal.write(`\r\n\x1b[31mQEMU failed: ${error}\x1b[0m\r\n`);
    status.textContent = 'VM failed to start; see the browser console.';
  } finally { start.disabled = false; }
});
