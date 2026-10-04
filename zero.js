/* =========================
   LOADER
========================= */

const loader = document.getElementById("loader");
const loaderNumber = document.getElementById("loaderNumber");
const loaderBar = document.getElementById("loaderBar");

let progress = 0;

if (loader && loaderNumber && loaderBar) {

  const loading = setInterval(() => {

    progress += Math.floor(Math.random() * 8) + 2;

    if (progress >= 100) {

      progress = 100;

      clearInterval(loading);

      loaderNumber.textContent = "100";
      loaderBar.style.width = "100%";

      setTimeout(() => {

        loader.classList.add("hide");
        document.body.classList.add("loaded");

      }, 500);

      return;
    }

    loaderNumber.textContent =
      String(progress).padStart(2, "0");

    loaderBar.style.width =
      progress + "%";

  }, 55);
}


/* =========================
   MOBILE MENU
========================= */

const menuToggle =
  document.getElementById("menuToggle");

const navLinks =
  document.querySelector(".nav-links");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document
    .querySelectorAll(".nav-links a")
    .forEach((link) => {

      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });

    });
}


/* =========================
   ACTIVE NAV
========================= */

const sections =
  document.querySelectorAll("section[id]");

const links =
  document.querySelectorAll(".nav-links a");

function updateActiveNav() {

  let current = "";

  sections.forEach((section) => {

    const top =
      section.offsetTop - 180;

    const bottom =
      top + section.offsetHeight;

    if (
      window.scrollY >= top &&
      window.scrollY < bottom
    ) {
      current = section.id;
    }

  });

  links.forEach((link) => {

    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current
    );

  });
}

window.addEventListener(
  "scroll",
  updateActiveNav
);

updateActiveNav();


/* =========================
   ORBIT
========================= */

const orbit =
  document.getElementById("orbit");

if (orbit) {

  const cards =
    orbit.querySelectorAll(".orbit-card");

  let angle = 0;

  const baseAngles = [
    -90,
    180,
    0,
    90
  ];

  function rotateOrbit() {

    angle += 0.18;

    const centerX =
      orbit.clientWidth / 2;

    const centerY =
      orbit.clientHeight / 2;

    const radiusX =
      orbit.clientWidth * 0.34;

    const radiusY =
      orbit.clientHeight * 0.38;

    cards.forEach((card, index) => {

      const currentAngle =
        baseAngles[index] + angle;

      const radians =
        currentAngle * Math.PI / 180;

      const x =
        centerX +
        Math.cos(radians) * radiusX -
        card.offsetWidth / 2;

      const y =
        centerY +
        Math.sin(radians) * radiusY -
        card.offsetHeight / 2;

      card.style.left =
        `${x}px`;

      card.style.top =
        `${y}px`;

    });

    requestAnimationFrame(rotateOrbit);
  }

  rotateOrbit();
}


/* =========================
   CUSTOM CURSOR
========================= */

const cursor =
  document.getElementById("cursor");

const cursorDot =
  document.getElementById("cursorDot");

if (
  cursor &&
  cursorDot &&
  window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches
) {

  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;

  window.addEventListener(
    "mousemove",
    (event) => {

      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorDot.style.left =
        `${mouseX}px`;

      cursorDot.style.top =
        `${mouseY}px`;

    }
  );

  function moveCursor() {

    cursorX +=
      (mouseX - cursorX) * 0.15;

    cursorY +=
      (mouseY - cursorY) * 0.15;

    cursor.style.left =
      `${cursorX}px`;

    cursor.style.top =
      `${cursorY}px`;

    requestAnimationFrame(moveCursor);
  }

  moveCursor();

  const hoverTargets =
    document.querySelectorAll(
      "a, button, .project-card, .orbit-card, .profile-card, .skill-row"
    );

  hoverTargets.forEach((item) => {

    item.addEventListener(
      "mouseenter",
      () => {
        cursor.classList.add("active");
      }
    );

    item.addEventListener(
      "mouseleave",
      () => {
        cursor.classList.remove("active");
      }
    );

  });
}


/* =========================
   SCROLL REVEAL
========================= */

const revealItems =
  document.querySelectorAll(".reveal");

if (revealItems.length) {

  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("show");

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
}


/* =========================
   PROJECT CARD PARALLAX
========================= */

const projectCards =
  document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

  card.addEventListener(
    "mousemove",
    (event) => {

      if (window.innerWidth <= 768) {
        return;
      }

      const rect =
        card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      const rotateX =
        (y - centerY) / 30;

      const rotateY =
        (centerX - x) / 30;

      card.style.transform =
        `translateY(-15px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;

    }
  );

  card.addEventListener(
    "mouseleave",
    () => {
      card.style.transform = "";
    }
  );

});


/* =========================
   SKILL CLICK
========================= */

const skillRows =
  document.querySelectorAll(".skill-row");

skillRows.forEach((skill) => {

  skill.addEventListener("click", () => {

    const isActive =
      skill.classList.contains("active");

    /* Tutup semua skill */
    skillRows.forEach((item) => {

      item.classList.remove("active");

      item.style.removeProperty(
        "--skill-percent"
      );

    });


    /* Buka skill yang diklik */
    if (!isActive) {

      const percent =
        skill.dataset.percent;

      if (percent) {

        skill.style.setProperty(
          "--skill-percent",
          percent + "%"
        );

      }

      skill.classList.add("active");

    }

  });

});