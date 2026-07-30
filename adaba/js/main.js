(function () {
  "use strict";

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var abierto = nav.classList.toggle("abierto");
      toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
  }

  function initNewsletter() {
    var form = document.querySelector(".newsletter-form");
    if (!form) return;
    var msg = form.querySelector(".form-msg");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (form.querySelector("input[type=email]").value || "").trim();
      var valido = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
      if (valido) {
        msg.textContent = "¡Gracias por suscribirte! Te avisaremos de próximos cursos y talleres.";
        msg.classList.remove("form-msg-error");
        form.reset();
      } else {
        msg.textContent = "Escribe un correo válido para poder suscribirte.";
        msg.classList.add("form-msg-error");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initNewsletter();
  });
})();
