class debugWindow{
    constructor(){
        this.box = new Box("Debug",0,0,200,120);
        this.xTxt = this.box.text("...",20,2,20);
        this.yTxt = this.box.text("...",20,2,40);
        this.index = this.box.text("...",20,2,60);
        this.itxt = "..."
        this.frameRate = this.box.text("frame rate: ",20,2,80)
        this.timer = 0
    }

    update(){
        this.xTxt.text = "x: "+this.box.x
        this.yTxt.text = "y: "+this.box.y
        this.index.text = "index: "+ this.itxt
        if (this.timer == 0 || millis() >= 100+this.timer) {
            this.timer = millis();
            let fps = frameRate()
            if(frameRate < 60){
                fill(255,0,0)
            }else{
                fill(255,255,255)
            }           
            this.frameRate.text = "fps: "+ Math.round(frameRate())
        }
        
    }
    
}