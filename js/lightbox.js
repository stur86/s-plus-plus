// Click an image in post content to show it full screen over an opaque overlay.
// Click anywhere or press Escape to close. Images inside links are left alone.
(function () {
  let overlay = null;

  function close() {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    document.body.classList.remove("lightbox-open");
  }

  function open(img) {
    overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-label", img.alt || "Image");

    const big = document.createElement("img");
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    if (/\.svgz?([?#]|$)/i.test(big.src)) big.classList.add("lightbox-vector");
    overlay.appendChild(big);

    overlay.addEventListener("click", close);
    document.body.appendChild(overlay);
    document.body.classList.add("lightbox-open");
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  document.querySelectorAll(".post-content img").forEach(function (img) {
    if (img.closest("a")) return;
    img.classList.add("lightbox-target");
    img.addEventListener("click", function () {
      open(img);
    });
  });
})();
