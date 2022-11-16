class Calendar{
    constructor(x=0,y=0){
      this.x = x
      this.y = y
      this.box = new Box("Calendar",x,y,400,100);
      this.box.text("Today's Agenda:",30,200,30,CENTER)
      var today = new Date()
      var yvar = 64
      fetch("./calendar.json").then(r=>r.json()).then(data=>{
        for(i in data["events"]){
            data["events"][i].Date = new Date(data["events"][i].Date)
            console.log(data["events"][i].Date)
            if(data["events"][i].Date.getDay() == today.getDay() && data["events"][i].repeat == "Weekly"){
                this.box.text(data["events"][i].Name,18,4,yvar)
                yvar = yvar+20
            }else if(data["events"][i].Date.getDate() == today.getDate() && data["events"][i].Date.getMonth() == today.getMonth()){
                this.box.text(data["events"][i].Name,18,4,yvar)
                yvar = yvar+20
            }
        }
      })
      this.box.h = yvar +60
    }

    update(){
    }

  }