(() => {
  const track = document.getElementById("collageTrack");
  const windowEl = document.getElementById("collageWindow");

  if (!track || !windowEl) return;

  let y = 0;
  let last = performance.now();

  // px per second (keep it subtle)
  const speed = 12;

  // We duplicated the images once, so half the track height is a full cycle.
  const getCycleHeight = () => track.scrollHeight / 2;

  let cycle = 0;
  const updateCycle = () => { cycle = getCycleHeight(); };
  updateCycle();

  // Recompute on resize (images load can affect height)
  window.addEventListener("resize", updateCycle);

  // Respect "reduce motion"
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  function tick(now) {
    const dt = (now - last) / 1000;
    last = now;

    y -= speed * dt;

    // Loop when we've scrolled one full cycle
    if (cycle > 0 && Math.abs(y) >= cycle) {
      y = 0;
    }

    track.style.transform = `translateY(${y}px)`;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
