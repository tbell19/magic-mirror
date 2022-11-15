class Health{
  constructor(x=0,y=0){
    this.x = x
    this.y = y
    this.box = new Box("Health",x,y,400,70);
    this.timer = 0
    this.weight = this.box.text("Weight: ...",18,6,22)
    this.workoutName = this.box.text("Today's workout:",18,4,48)
    if(!getItem("wgerApiKey")){
      storeItem("wgerApiKey",prompt("Enter wger API key to use health app."))
    }

    if(!getItem("wgerApiKey")){
      this.box.destroy = true
    }else{
      this.apiKey = getItem("wgerApiKey")
    }
  }



  update(){

      if (this.timer == 0 || millis() >= 1500000+this.timer) {
          this.timer = millis();
          fetch("https://wger.de/api/v2/weightentry/?format=json",{
            headers:{
              "Authorization":"Token "+this.apiKey
            }
        
        }).then(d=> d.json()).then(e=> this.updateData(e))



        fetch("https://wger.de/api/v2/schedulestep/",{
            headers:{
              "Authorization":"Token "+this.apiKey
            }
        
        }).then(d=> d.json()).then(d=>{

          console.log(d["results"])
          for(i in d["results"]){


            var url = "https://wger.de/api/v2/workout/"+d["results"][i]["workout"]+"/canonical_representation/?format=json"
            console.log("fetching: "+url)
            fetch(url,{
            headers:{
              "Authorization":"Token "+this.apiKey
            }
        
            }).then(f=> f.json()).then(f=>{
              var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
              console.log(dayOfWeek[new Date().getDay()]+" "+f["day_list"][0]["days_of_week"]["text"])
              if(String(f["day_list"][0]["days_of_week"]["text"]).indexOf(String(dayOfWeek[new Date().getDay()])) != -1){

                this.workoutName.text = "Today's Workout: "+f["obj"]["name"]

              }else{
                this.workoutName.text = "Today's Workout: None, Rest Day!"
              }
            })
            
          }
        
      })
      }

  }
  
  updateData(data){
    console.log(data)
    this.weight.text = "Weight: "+data["results"][data["results"].length-1]["weight"] +" as of "+data["results"][data["results"].length-1]["date"]
  }

  
}