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
        msg.textContent = "Así confirmaríamos tu suscripción en el sitio final. Este formulario es una demostración: no envía ni guarda datos.";
        msg.classList.remove("form-msg-error");
        form.reset();
      } else {
        msg.textContent = "Escribe un correo válido para poder suscribirte.";
        msg.classList.add("form-msg-error");
      }
    });
  }

  var GUION_WA = [
    { q: "¿Qué es la terapia Adaba?",
      a: "Adaba significa “movimiento de la mente profunda” 🌿 Es una terapia energética creada en Chile por la Dra. Sofía Vera, con más de 20 años de experiencia. Trabaja sobre tu campo energético para acompañar tu proceso. ¿Quieres agendar una hora?" },
    { q: "¿Cómo agendo una sesión?",
      a: "¡Muy fácil! Escríbenos a contacto@adaba.cl o entra a adaba.cl/contacto y te coordinamos una hora con una terapeuta certificada. ¿Prefieres atención presencial u online?" },
    { q: "¿Qué cursos tienen?",
      a: "Tenemos la Formación Adaba, que enseña la técnica completa; la Formación Básica (con acceso inmediato online) y talleres como Colores del Aura ✨ Además hay un Taller Gratuito de Percepción Energética en nuestra Aula Virtual. ¿Te cuento más de alguno?" },
    { q: "Hablar con una persona",
      a: "¡Por supuesto! Te dejo con el equipo Adaba: escríbenos a contacto@adaba.cl y te respondemos a la brevedad 💜" }
  ];

  function initWaWidget() {
    if (document.body.dataset.sinWidget === "1") return;

    var burbuja = document.createElement("button");
    burbuja.className = "wa-burbuja";
    burbuja.setAttribute("aria-label", "Abrir chat de WhatsApp (simulación)");
    burbuja.innerHTML = "&#x1F4AC;";

    var panel = document.createElement("div");
    panel.className = "wa-panel";
    panel.innerHTML =
      '<div class="wa-header"><strong>Adaba · Asistente</strong>' +
      '<span class="wa-sim">Simulación: así respondería el agente IA de la Fase 2</span></div>' +
      '<div class="wa-mensajes" role="log" aria-live="polite" aria-atomic="false"></div>' +
      '<div class="wa-opciones"></div>';

    var mensajes = panel.querySelector(".wa-mensajes");
    var opciones = panel.querySelector(".wa-opciones");

    function agregar(texto, clase) {
      var b = document.createElement("div");
      b.className = "wa-msg " + clase;
      b.textContent = texto;
      mensajes.appendChild(b);
      mensajes.scrollTop = mensajes.scrollHeight;
      return b;
    }

    function responder(item) {
      agregar(item.q, "wa-usuario");
      var typing = agregar("escribiendo…", "wa-bot wa-typing");
      setTimeout(function () {
        typing.classList.remove("wa-typing");
        typing.textContent = item.a;
        mensajes.scrollTop = mensajes.scrollHeight;
      }, 900);
    }

    GUION_WA.forEach(function (item) {
      var btn = document.createElement("button");
      btn.className = "wa-opcion";
      btn.textContent = item.q;
      btn.addEventListener("click", function () { responder(item); });
      opciones.appendChild(btn);
    });

    burbuja.addEventListener("click", function () {
      var abierto = panel.classList.toggle("wa-abierto");
      if (abierto && !mensajes.hasChildNodes()) {
        agregar("¡Hola! 👋 Soy el asistente de Adaba. Elige una pregunta para ver cómo respondería.", "wa-bot");
      }
    });

    document.body.appendChild(panel);
    document.body.appendChild(burbuja);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initNewsletter();
    initWaWidget();
  });
})();
