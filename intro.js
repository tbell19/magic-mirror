class Intro{
    constructor(x=0,y=0){
      this.x = x
      this.y = y
      this.box = new Box("Intro",x,y,800,600);
      this.box.text("Welcome!",40,400,40,CENTER)
      this.box.text("This project was created for CS3366 - Human Computer Interaction - Fall 2022 with Tommy Dang",18,0,60,LEFT)

      this.box.text("To view the report for this project please click the button below, you can access this screen",18,0,100,LEFT)
      this.box.text("again at any time by opening the \"Intro\" app",18,0,120,LEFT)

      this.box.text("How to use:",30,5,165,LEFT)
      this.box.text("   To start customizing your mirror, open the app menu by clicking the 4 squares in the bottom",18,5,185,LEFT)
      this.box.text("   left corner.",18,5,205,LEFT)

      this.box.text("   When the app menu is open, you are able to add, move, and close apps on your mirror.",18,5,225,LEFT)
      
      this.box.text("   To add an app, click it's icon in the app menu.",18,5,265,LEFT)
      this.box.text("   To move an app, click and drag the bar at the top of it's window.",18,5,305,LEFT)
      this.box.text("   To close an app press the X in the top right of it's window.",18,5,345,LEFT)

      this.box.text("Links:",30,5,395,LEFT)
      this.box.button("GitHub",20,this.openGithub,10,370)
      this.box.button("Report",20,this.openReport,100,370)
      this.box.button("Project Specification",20,this.openSpec,190,370)
    }
  
    openGithub(){
      window.location.href = "https://github.com/tbell19/p2.trent_bell"
    }
    
    openReport(){
      window.location.href = window.location.href+"report.html"
    }

    openSpec(){
      window.location.href = "https://www.myweb.ttu.edu/tnhondan/CS3366/"
    }
    update(){
    }

  }