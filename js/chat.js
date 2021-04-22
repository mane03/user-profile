const conversations = document.querySelectorAll(".project__close");
const formSent = document.getElementById("formSent")
const sentInput = document.getElementById("sent")
const result = document.getElementById("messagesBlock")
const sidebar = document.getElementsByClassName("sidebar")[0]
const main = document.getElementById("main")


//function for open and close conversation and group sections
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

//function for drawing messages
formSent.addEventListener("submit", (e) => {
  e.preventDefault()
  let dateWithoutSecond = new Date();
  let localTime = dateWithoutSecond.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});


  result.innerHTML += `
<!--message structure-->
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

//open and close sidebar
function openSidebar() {
  sidebar.style.width = "250px";
  sidebar.style.padding = "20px 15px"
}

window.onclick = function (e) {
  if(e.target === main) {
    sidebar.style.width = "0";
    sidebar.style.padding = "0"
  }
}