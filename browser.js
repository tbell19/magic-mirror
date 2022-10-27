class Browser{
    constructor(webpage){
        this.box = new Box("bus",0,0,900,600);
        this.webpage = webpage;
        this.div = createDiv("<iframe src="+webpage+"></iframe>")
        this.div.style("position","absolute")
    }

    update(){
        this.div.style("top",this.y+40)
        this.div.style("left",this.x+2)
        this.div.style("width",this.w)
        this.div.style("height",this.h)
        this.div.style("z-index",-1)
    }
}