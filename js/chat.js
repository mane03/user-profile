// const borderSize = 3;
// const panel = document.getElementById("left__panel");
//
// let panelWidth;
// function resize(e) {
//     const dx = panelWidth - e.x;
//     panelWidth = e.x;
//     panel.style.width = (parseInt(getComputedStyle(panel, '').width) - dx) + "px";
// }
//
//
// panel.addEventListener("mousedown", (e) => {
//     if (e.offsetX > borderSize) {
//         panelWidth = e.x;
//         document.addEventListener("mousemove", resize);
//     }
// });
//
//
// document.addEventListener("mouseup", () => {
//     document.removeEventListener("mousemove", resize);
// });



const conversations = document.querySelectorAll(".project__close");

for (let i = 0; i < conversations.length; i++) {
  let totalHeight = 0
  conversations[i].addEventListener("click", function () {
    let result = this.nextElementSibling;
    let activeSibling = this.nextElementSibling.classList.contains("active")
    this.classList.toggle("arrow")
    result.classList.toggle("active")
    if(!activeSibling) {
      for (let i = 0; i < result.children.length; i++) {
        totalHeight += result.children[i].scrollHeight + 40
      }
    } else  {
      totalHeight = 0
    }
    result.style.maxHeight = totalHeight + "px"
  })
}


const formSent = document.getElementById("formSent")
const sentInput = document.getElementById("sent")
const result = document.getElementById("messagesBlock")

formSent.addEventListener("submit", (e) => {
  e.preventDefault()
  let dateWithoutSecond = new Date();
  let localTime = dateWithoutSecond.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});


  result.innerHTML += `
  <li class="messages__sent reverse">
      <div class="avatar__block">
          <img class="message__img" src="images/user.jpg" alt="avatar">
      </div>
      <div class="message__desc">
          <p class="message">${sentInput.value}</p>
          <span class="message__time">${localTime}</span>
      </div>
  </li>
  `
  sentInput.value = ""
})

const sidebar = document.getElementsByClassName("sidebar")[0]
const main = document.getElementById("main")
const burger = document.getElementById("burger")

function openNav() {
  sidebar.style.width = "250px";
  sidebar.style.padding = "20px 15px"
}

window.onclick = function (e) {
  if(e.target === main) {
    sidebar.style.width = "0";
    sidebar.style.padding = "0"
  }
  // console.log(e.target)
}