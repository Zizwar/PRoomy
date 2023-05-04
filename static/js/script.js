const toggleButton = document.querySelector(".dark-light");
const colors = document.querySelectorAll(".color");
const toggleSettings = document.querySelector(".settings");
const toggleLogo = document.querySelector(".logo");

const chatHeader = document.querySelector(".chat-area-header");

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

function handleSettingsClick(arg) {
  const chatArea = document.querySelector(".chat-area");
  const detailArea = document.querySelector(".detail-area");
  const conversationArea = document.querySelector(".conversation-area");

  const displayDetailArea = window.getComputedStyle(detailArea).display;
  const displayConversationArea =
    window.getComputedStyle(conversationArea).display;


  if (arg === "setting" && displayDetailArea !== "flex") {
    detailArea.classList.toggle("displayBlock");
    if (displayConversationArea !== "flex") {
      chatArea.classList.toggle("displayNone");
      detailArea.classList.toggle("fullWidth");
    }

    return;
  }


  if (displayDetailArea !== "flex") {
    conversationArea.classList.toggle("displayBlock");
    if (displayConversationArea !== "flex") {
      detailArea.classList.toggle("fullWidth");
      conversationArea.classList.toggle("displayNone");

    }
  }

}
toggleSettings.addEventListener("click", () => handleSettingsClick("setting"));
chatHeader.addEventListener("click", () => handleSettingsClick("setting"));

toggleLogo.addEventListener("click", handleSettingsClick);
