class Stage {
    constructor() {
        this.mouseX = 0
        this.mouseY = 0
        this.ctx = null
        this.init()
    }

    init() {
        const {clientWidth, clientHeight} = document.documentElement
        const cvs = document.querySelector('#cvs')
        cvs.width = clientWidth
        cvs.height = clientHeight
        this.ctx = cvs.getContext('2d')
    }
}

class TextPoor {
    constructor() {
        this.textList = []
        this.textMap = {}
        this.textId = 0
    }

    addText(text) {
        this.textId += 1
        this.textList.push(text)
        this.textMap[this.textId] = text
    }
}

class Text {
    constructor(text, stage) {
        this.stage = stage
        this.text = text
        this.x = 0
        this.y = 0
        this.fontSize = 18
    }

    setPosition(mouseX, mouseY, index) {
        this.x = mouseX + this.fontSize * index
        this.y = mouseY + this.fontSize / 2
    }

    draw() {
        this.stage.ctx.fillText(this.text, this.x, this.y)
    }
}
