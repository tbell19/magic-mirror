class ttuCal{
    constructor(){
      this.box = new Box("TTU Events",0,0,300,180);
      this.timer = 0
    }
  
    //the problem is with the httpGet built-in function from p5. Use fetch function instead. Pay attention to the promise resolutions (.then)
    // updateData(){
    //   httpGet("https://citibus.doublemap.com/map/v2/eta?stop=401","json",false,this.updateNum)
    // }
  
    update(){
      if (this.timer == 0 || millis() >= 36000+this.timer) {
        this.timer = millis();
        //console.log(this.location)
        fetch("http://events.ttu.edu:8080/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&fexpr=(entity_type=%22event%22%7Centity_type=%22todo%22)&skinName=list-json&setappvar=objName(bwObject)&count=10").then(d=>console.log(d))
      }
    }


    updateData(data){
        console.log(data)

    }
  }