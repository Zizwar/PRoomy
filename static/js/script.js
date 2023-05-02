const toggleButton = document.querySelector(".dark-light");
const colors = document.querySelectorAll(".color");
const toggleSettings = document.querySelector(".settings");
const toggleLogo = document.querySelector(".logo");


function handleColorClick() {
  colors.forEach((color) => color.classList.remove("selected"));
  const theme = this.dataset.color;
  document.body.dataset.theme = theme;
  this.classList.add("selected");
}

colors.forEach((color) => {
  color.addEventListener("click", handleColorClick);
});

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

toggleButton.addEventListener("click", toggleDarkMode);

function handleSettingsClick() {
  const chatArea = document.querySelector(".chat-area");
  const detailArea = document.querySelector(".detail-area");
  const conversationArea = document.querySelector(".conversation-area");

  const displayDetailArea = window.getComputedStyle(detailArea).display;
  const displayConversationArea =
    window.getComputedStyle(conversationArea).display;

  if (displayDetailArea !== "flex") {
    chatArea.classList.toggle("displayNone");
    conversationArea.classList.toggle("displayBlock");
 conversationArea.classList.toggle("fullWidth");
    if (displayConversationArea !== "flex") {
      detailArea.classList.toggle("fullWidth"); 
       conversationArea.classList.toggle("displayNone");
    }
  }
}

toggleSettings.addEventListener("click", handleSettingsClick);
toggleLogo.addEventListener("click", handleSettingsClick);
