const canvas = document.querySelector("canvas")
const histogram = document.getElementById("profileHistogram")
const ctx = canvas.getContext('2d')
const navLink = document.getElementById("navLink")
const diagrams = document.getElementById("diagram")
const posts = document.getElementsByClassName("posts")[0]
const defaultLink = document.getElementById("navLinkDefault")


canvas.width = 800
canvas.height = 500
histogram.width = 800
histogram.height = 500

let diagramData = {
    people: 200,
    people2: 2650,
    people3: 1500,
    people4: 3100,
    people5: 2100,
    people6: 200,
    people7: 2340,
    people8: 1800,
    people9: 2110,
}

let histogramData = {
    people: 800,
    people2: 230,
    people3: 500,
    people4: 200,
    people5: 650,
    people6: 300,
    people7: 900,
    people8: 450,
    people9: 400,
    people10: 800,
    people11: 350,
    people12: 500,
    people13: 200,
    people14: 650,
    people15: 300,
    people16: 900,
    people17: 450,
    people18: 400,
}

const entries = Object.entries(diagramData)
const categories = Object.entries(histogramData)

function diagram(count) {
    return count * 10
}


//function for drawing x and y axis and breakpoints
function drawAxis() {
    let yText = 40
    let xText = 10
    let numbers = 0

    ctx.beginPath()
    ctx.strokeStyle = "black"
    ctx.moveTo(diagram(5), diagram(4))
    ctx.lineTo(diagram(5), diagram(40))
    ctx.lineTo(diagram(80), diagram(40))
    ctx.stroke()

    for (let i = 0; i < 8; i++) {
        ctx.strokeText(numbers.toString(), diagram(1), diagram(yText))
        ctx.font = "13px Arial"
        ctx.fillStyle = '#000000'
        yText -= 5
        numbers += 500
    }

    for (let [people, value] of entries) {
        ctx.strokeText(people, diagram(xText), diagram(42))
        xText += 7
    }
}


//function for drawing diagram line
function drawDiagram() {
    ctx.beginPath()
    let x = ctx.createLinearGradient(100,0, 300,10)
    x.addColorStop(0, "#10E5B2")
    x.addColorStop(.5, "#007EA7")
    x.addColorStop(1, "#5E0FFF")
    ctx.strokeStyle = x
    ctx.lineTo(diagram(5), diagram(40))
    let xText = 10

    for (let [people, value] of entries) {
        let values = value/100
        ctx.lineTo(diagram(xText), diagram(40 - values))
        xText += 7
    }
    ctx.stroke()
}

drawDiagram()
drawAxis()


//create histogram
function drawLine(htx, startX, startY, endX, endY, color) {
    htx.strokeStyle = color
    htx.beginPath()
    htx.moveTo(startX, startY)
    htx.lineTo(endX, endY)
    htx.stroke()
}


//function for drawing histogram bar sections
function drawBar(htx, startX, startY, width, height) {
    htx.fillStyle = "#211432"
    htx.fillRect(startX, startY, width, height)
}


//class for creating histogram
class BarChart {
    constructor(options) {
        this.options = options
        this.canvas = options.canvas
        this.htx = options.canvas.getContext("2d")
    }

    //function for drawing full histogram
    draw() {
        let maxValue = 0
        for (let [category, value] of categories) {
            maxValue = Math.max(maxValue, value)
        }
        let canvasHeight = this.canvas.height - this.options.padding * 2
        let canvasWidth = this.canvas.width - this.options.padding * 2


        //drawing the grid numbers
        let gridValue = 0
        while (gridValue <= maxValue) {
            let gridY = canvasHeight * (1 - gridValue / maxValue) + this.options.padding
            drawLine(
                this.htx,
                50,
                gridY,
                this.canvas.width - 50,
                gridY
            )
            this.htx.fillStyle = "#000000"
            this.htx.font = "14px Arial"
            this.htx.fillText(gridValue.toString(), 10, gridY)

            gridValue += this.options.gridScale
        }

        //drawing the bars
        let barIndex = 0
        let numberOfBars = Object.keys(histogramData).length
        let barSize = (canvasWidth)/numberOfBars

        for (let [category, value] of categories) {
            let barHeight = Math.ceil(canvasHeight * value/maxValue)
            drawBar(
                this.htx,
                this.options.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight
                );
            barIndex++
        }
    }
}


let myBarChart = new BarChart (
    {
        canvas: histogram,
        padding: 50,
        gridScale: 100,
        data: histogramData,
    }
)

myBarChart.draw()

//show only posts
defaultLink.addEventListener("click", (e) => {
    e.preventDefault()

    defaultLink.classList.add("active")
    navLink.classList.remove("active")
    diagrams.style.display = "none"
    posts.style.display = "block"
})

//show only diagrams
navLink.addEventListener("click", (e) => {
    e.preventDefault()

    defaultLink.classList.remove("active")
    navLink.classList.add("active")
    diagrams.style.display = "flex"
    posts.style.display = "none"
})




