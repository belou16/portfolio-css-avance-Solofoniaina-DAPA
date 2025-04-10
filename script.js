const piano = document.querySelector(".piano");
const powerToggle = document.getElementById("powerToggle");
const introText = document.getElementById("introText");
let typing; // Pour pouvoir clearInterval partout

window.addEventListener("load", () => {
  const savedState = localStorage.getItem("powerToggleState");

  if (savedState === "on") {
    powerToggle.checked = true;
    piano.classList.remove("off");
    displayIntroText();
  } else {
    powerToggle.checked = false;
    piano.classList.add("off");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const keys = document.querySelectorAll(".key");
  const audio = document.getElementById("audio");

  powerToggle.addEventListener("change", () => {
    clearInterval(typing); // Stop l'animation si en cours
    introText.textContent = "";

    if (powerToggle.checked) {
      piano.classList.remove("off");
      displayIntroText();
      localStorage.setItem("powerToggleState", "on");
    } else {
      piano.classList.add("off");
      localStorage.setItem("powerToggleState", "off");
    }
  });

  function displayIntroText() {
    const message = "Portfolio de DAPA Solofoniaina Armando";
    let index = 0;
    typing = setInterval(() => {
      introText.textContent += message[index];
      index++;
      if (index === message.length) {
        clearInterval(typing);
      }
    }, 50);
  }

  function playSound() {
    audio.src = `/assets/audio/sound.mp3`;
    audio.play();
  }

  keys.forEach((key) => {
    key.addEventListener("click", () => {
      const note = key.getAttribute("data-note");
      playSound();
      setTimeout(() => {
        redirectToPage(note);
      }, 1500);
    });
  });

  function redirectToPage(note) {
    const pages = {
      C: "./pages/hero.html",
      "C#": "#",
      D: "./pages/competences.html",
      "D#": "pageDsharp.html",
      E: "./pages/projets.html",
      F: "./pages/contact.html",
      "F#": "pageFsharp.html",
      G: "./pages/parcours.html",
      "G#": "pageGsharp.html",
      A: "pageA.html",
      "A#": "pageAsharp.html",
      B: "pageB.html",
      C2: "pageC2.html",
    };

    if (pages[note]) {
      window.location.href = pages[note];
    }
  }
});
