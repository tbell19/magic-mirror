class ErrorWindow{
    constructor(x=0,y=0,appName,errorStr){
      this.x = x
      this.y = y
      this.box = new Box("Error",x,y,1200,90);
      this.box.text(appName+" has experienced an error and was closed. Please report this error to me@trentb.tech",20,0,20)
      this.box.text("Error: "+String(errorStr),20,0,40)
    }
  


    update(){
    }

  }