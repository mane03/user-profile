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



const conversations = document.querySelectorAll(".project__desc");

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

