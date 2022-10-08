class Stage {
    constructor() {
        this.mouseX = 0
        this.mouseY = 0
        this.ctx = null
        this.textPoor = null
        this.init()
    }

    init() {
        const {clientWidth, clientHeight} = document.documentElement
        const cvs = document.querySelector('#cvs')
        this.cvsWidth = clientWidth
        this.cvsHeight = clientHeight
        cvs.width = this.cvsWidth
        cvs.height = this.cvsHeight
        this.ctx = cvs.getContext('2d')
        cvs.addEventListener('mousemove',(e)=>{
            this.mouseX = e.clientX
            this.mouseY = e.clientY
        })
        cvs.addEventListener('click',(e)=>{
            this.render()
        })
    }

    render(){
        this.ctx.clearRect(0,0,this.cvsWidth,this.cvsHeight)
        this.textPoor.textList.forEach((text,index)=>{
            text.setPosition(this.mouseX,this.mouseY,index)
            text.draw()
        })
    }

}

class TextPoor {
    constructor(stage) {
        this.stage = stage
        this.stage.textPoor = this
        this.textList = []
        this.textMap = {}
        this.textId = 0
    }

    addText(text) {
        this.textId += 1
        text.stage = this.stage
        text.id = this.textId
        this.textList.push(text)
        this.textMap[this.textId] = text
    }
}

class Text {
    constructor(text) {
        this.id = null
        this.stage = null
        this.text = text
        this.x = 0
        this.y = 30
        this.fontSize = 18
    }

    setPosition(mouseX, mouseY, index) {
        this.x = mouseX + this.fontSize * index
        this.y = mouseY + this.fontSize / 2
    }

    draw() {
        this.stage.ctx.beginPath()
        this.stage.ctx.fillStyle = '#00ff00'
        this.stage.ctx.font = `${this.fontSize}px 微软雅黑`
        this.stage.ctx.fillText(this.text, this.x, this.y)
    }
}
const stage = new Stage()
const textPoor = new TextPoor(stage)
const textH = new Text('H')
const textE = new Text('E')
const textL1 = new Text('L')
const textL2 = new Text('L')
const textO = new Text('O')
textPoor.addText(textH)
textPoor.addText(textE)
textPoor.addText(textL1)
textPoor.addText(textL2)
textPoor.addText(textO)
const run = ()=>{
    stage.render()
    window.requestAnimationFrame(run)
}
// run()