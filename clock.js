class Clock{
    constructor(x=0,y=0){
      this.x = x
      this.y = y
      this.box = new Box("Clock",x,y,600,200);
      this.timer = 0
      this.txt = this.box.text("",170,300,140,CENTER)
      this.dateTxt = this.box.text("",32,300,190,CENTER)

    }
  
  
    update(){
      this.txt.text = hour()%12 + ":" + ('0'+ minute()).slice(-2) +":"+ ('0'+ second()).slice(-2)

      var date = new Date()

      var dayOfWeek = ""
      switch(date.getDay()){
        case 0:
          dayOfWeek = "Sunday"
        break
        case 1:
          dayOfWeek = "Monday"
        break
        case 2:
          dayOfWeek = "Tuesday"
        break
        case 3:
          dayOfWeek = "Wednesday"
        break
        case 4:
          dayOfWeek = "Thursday"
        break
        case 5:
          dayOfWeek = "Friday"
        break
        case 6:
          dayOfWeek = "Saturday"
        break
      }

      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      this.dateTxt.text = dayOfWeek +", "+monthNames[date.getMonth()]+" "+('0' + date.getDate()).slice(-2) +", "+year()
    }

    

  }