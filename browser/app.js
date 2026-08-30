const status = document.querySelector('#status');
const consoleEl = document.querySelector('#console');
const start = document.querySelector('#start');
function log(message) { consoleEl.textContent += `${message}\n`; }
start.addEventListener('click', () => {
  const image = document.querySelector('#image').files[0];
  const kernel = document.querySelector('#kernel').files[0];
  const initramfs = document.querySelector('#initramfs').files[0];
  consoleEl.textContent = '';
  log('Try Omarchy browser runtime');
  log('Target: AArch64 guest');
  log('Runtime: ktock/qemu-wasm');
  if (!image) { status.textContent = 'Select the guest rootfs image first.'; log('No guest image selected.'); return; }
  status.textContent = 'Preparing browser VM…';
  log(`Disk: ${image.name} (${Math.round(image.size / 1048576)} MiB)`);
  log(`Kernel: ${kernel ? kernel.name : 'not selected'}`);
  log(`Initramfs: ${initramfs ? initramfs.name : 'not selected'}`);
  log('');
  log('Browser UI is ready for the qemu-wasm AArch64 bundle.');
  log('The multi-GB VM image is intentionally supplied separately.');
  log('Next: wire qemu-system-aarch64.wasm to these artifacts.');
  status.textContent = 'Browser runtime shell ready; QEMU WASM bundle not bundled yet.';
});
