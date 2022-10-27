class Weather{
    constructor(x=0,y=0){
      this.box = new Box("Weather",x,y,300,180);
      this.locName = this.box.text("Finding location...",28,2,30)
      this.hasLoc = false;
      this.timer = -1
      this.weatherDesc =  this.box.text("...",20,2,50)
      this.current = this.box.text("...",60,2,125)
      this.weatherImg = loadImage("http://openweathermap.org/img/wn/01n@2x.png");
      this.img = this.box.img(this.weatherImg,180,60)
      this.location = getCurrentPosition(this.locAvailable);
    }
  
    //the problem is with the httpGet built-in function from p5. Use fetch function instead. Pay attention to the promise resolutions (.then)
    // updateData(){
    //   httpGet("https://citibus.doublemap.com/map/v2/eta?stop=401","json",false,this.updateNum)
    // }
  
    update(){
      if(this.location.hasOwnProperty("latitude") && this.timer == -1){
        this.timer = 0
      }
      if (this.timer != -1 && this.timer == 0 || millis() >= 180000+this.timer) {
        this.timer = millis();
        fetch("https://api.openweathermap.org/data/2.5/weather?units=imperial&lat="+this.location['latitude']+"&lon="+this.location['longitude']+"&appid=2fe5a2d1f779becbefc1b7e673a4ac0b").then(d=> d.json()).then(e=> this.updateData(e))
      }
    }

    updateData(data){
        //console.log(data)
        this.locName.text = String(data["name"]);
        this.current.text = String(Math.round(data.main.temp) + "°F");
        this.weatherDesc.text = data.weather[0].description
        this.weatherImg = loadImage("http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png")
        this.img.img = this.weatherImg
    }
  }