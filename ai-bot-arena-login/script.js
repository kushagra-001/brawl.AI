const form = document.querySelector("form");
const button = document.querySelector("button");
const container = document.querySelector(".arena-container");

const clickSound = new Audio("assets/sound.mp3");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // sabse pehle

  // 🔊 SOUND
  clickSound.currentTime = 0;
  clickSound.play();

  // 💥 SHAKE
  container.classList.add("shake");
  setTimeout(() => {
    container.classList.remove("shake");
  }, 350);

  // 🔘 BUTTON FEEDBACK
  button.disabled = true;
  button.textContent = "ENTERING ARENA...";

  // ===== LOGIN → LOBBY TRANSITION =====
  const lobby = document.querySelector(".lobby-container");
  const loginBox = document.querySelector(".login-box");

  setTimeout(() => {
    button.textContent = "MATCH READY ⚔️";
  }, 1800);

  setTimeout(() => {
    loginBox.style.display = "none";
    lobby.style.display = "block";
    button.disabled = false;
    button.textContent = "ENTER ARENA";
  }, 3200);
});



  // play sound
  clickSound.currentTime = 0;
  clickSound.play();

  // shake effect
  container.classList.add("shake");
  setTimeout(() => {
    container.classList.remove("shake");
  }, 350);

  // button feedback
  button.disabled = true;
  button.textContent = "ENTERING ARENA...";

  setTimeout(() => {
    button.textContent = "MATCH READY ⚔️";
  }, 1800);

  setTimeout(() => {
    button.disabled = false;
    button.textContent = "ENTER ARENA";
  }, 3000);
});
