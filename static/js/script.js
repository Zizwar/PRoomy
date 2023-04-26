const toggleButton = document.querySelector(".dark-light");
const colors = document.querySelectorAll(".color");
const toggleSettings = document.querySelector(".settings");
const rooms = document.querySelector(".logo");

rooms.addEventListener("click", ()=>handleColorClick(1));


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

function handleSettingsClick(rooms) {
  const chatArea = document.querySelector(".chat-area");
  const detailArea = document.querySelector(".detail-area");
  const conversationArea = document.querySelector(".conversation-area");

  
  const displayDetailArea = window.getComputedStyle(detailArea).display;
  const displayConversationArea =
    window.getComputedStyle(conversationArea).display;

  if (displayDetailArea !== "flex") {
    chatArea.classList.toggle("displayNone");
    conversationArea.classList.toggle("displayBlock");

    if(rooms){
      conversationArea.classList.toggle("displayBlock");
       chatArea.classList.toggle("displayNone");
    detailArea.classList.toggle("displayNone");
    }
    if (displayConversationArea !== "flex") {
      detailArea.classList.toggle("fullWidth");
    }
  }
}

toggleSettings.addEventListener("click", handleSettingsClick);
