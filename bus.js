class Bus{
  constructor(){
    this.box = new Box("Citi-Bus",0,0,200,120);
    this.txt = this.box.text("...",32,80,70);
    this.topText = this.box.text("Next bus will arrive in: ",15,15,25)
    this.bottomText = this.box.text("minutes",22,55,100)
    // print(this.txt)
    this.timer = 0;
  }

  //the problem is with the httpGet built-in function from p5. Use fetch function instead. Pay attention to the promise resolutions (.then)
  // updateData(){
  //   httpGet("https://citibus.doublemap.com/map/v2/eta?stop=401","json",false,this.updateNum)
  // }

  update(){
    if (this.timer == 0 || millis() >= 36000+this.timer) {
      this.timer = millis();
      fetch("https://citibus.doublemap.com/map/v2/eta?stop=401").then(d=> d.json()).then(e=> this.updateNum(e))
    }
  }
  
  updateNum(data){
    // print(data)
    if(data["etas"]["401"]["etas"].length > 0){
      // use let to initialize variable
      let eta = data["etas"]["401"]["etas"][0]["avg"]
      this.txt.x = 80;
      if(eta == 1){
        this.bottomText.text = "minute"
      }else if(eta == 0){
        this.topText.text = "the bus has"
        this.txt.text = "Arrived"
        this.bottomText.text = ""
      }else{
        this.topText.text = "Next bus will arrive in:"
        this.txt.text = eta;
        this.bottomText.text = "minutes"
      }
    }else{
      // print(this.txt)
      this.txt.text = "no busses"
      this.txt.x = 20;
      this.bottomText.text = ""
      this.topText.text = ""
    }

  }
}