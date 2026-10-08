(() => {
  const track = document.getElementById("collageTrack");
  if (!track) return;
  const images = [...track.querySelectorAll("img")];
  const originalCount = images.length / 2;
  if (!Number.isInteger(originalCount) || originalCount < 1) return;
  let cycle = 0;
  let offset = 0;
  let previous = 0;
  const speed = 20; // pixels per second
  function measure() {
    const first = images[0];
    const duplicate = images[originalCount];
    if (!first || !duplicate) return;
    cycle = duplicate.offsetTop - first.offsetTop;
    if (cycle > 0) offset %= cycle;
  }
  window.addEventListener("resize", measure);
  images.forEach(img => img.addEventListener("load", measure));
  measure();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  function animate(now) {
    if (!previous) previous = now;
    const dt = Math.min((now - previous) / 1000, 0.1);
    previous = now;
    if (cycle > 0) {
      offset = (offset + speed * dt) % cycle;
      track.style.transform = `translateY(-${offset}px)`;
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();
