document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        this.hasAttribute("data-bs-toggle") ||
        this.target === "_blank" ||
        e.ctrlKey || e.metaKey
      ) {
        return;
      }

      e.preventDefault();

      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  });
});

