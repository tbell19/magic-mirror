let timer = 0
// initialize bus variable at global scope
let bus

let menuAnimAngle=0;
let menuAnimMult=0;
let showMenu = true;
let windows = []
let apps = []
let leftArrow
let downArrow
let menuItemIndexes = []
let page = 0

function preload(){
  font = loadFont("quicksand.ttf")
}

function saveData(){
  let windowCookie = []
  for(i in windows){
    windowCookie[windowCookie.length] = {
      appClass : windows[i].constructor.name,
      x: windows[i].box.x,
      y: windows[i].box.y
    }
  }
  removeItem("windows")
  storeItem("windows",windowCookie)

}

function setup() {
  console.log("⣿⣿⣿⣿⣿⣿⡿⣟⠻⠯⠭⠉⠛⠋⠉⠉⠛⠻⢿⣿⣿⣿⣿⣿⣿  Whatcha doin here?\n⣿⣿⣿⣿⡽⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⠀⠈⠙⢿⣿⣿⣿\n⣿⣿⠏⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣷⣦⡀⠶⣿⣿⣿\n"+
  "⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⡆⢻⣿⣿\n⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣤⣻⣿⣯⣤⣹⣿\n⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⡇⠀⣿⢟⣿⡀⠟⢹⣿\n⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣷⣤⣤⣼⣿⣿⡄⢹⣿\n"+
  "⣷⠀⠀⠀⠶⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⠛⠉⠈⢻\n⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠋⠛⠛⠛⠀⠀⣤⣾\n⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠛⠁⣰⣿⣿\n⣿⣿⣿⣿⣿⣷⣦⣤⣤⣤⣤⣄⣀⣀⣀⣀⣀⣠⣤⣤⣤⣾⣿⣿⣿\n");
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  textFont(font)


  apps = [
    {
      name:"Weather",
      icon:loadImage("cloud-fill.svg"),
      appClass: Weather
   },{
      name:"Bus",
      icon:loadImage("truck-front-fill.svg"),
      appClass: Bus
   },
   {
      name:"Debug",
      icon:loadImage("bug-fill.svg"),
      appClass: debugWindow
   },{
    name:"Debug",
    icon:loadImage("bug-fill.svg"),
    appClass: ttuCal
   }
  ]

  let windowCookie = getItem("windows")
  for(i in windowCookie){
    for(j in apps){
      if(apps[j].appClass.name == windowCookie[i].appClass){
        windows.unshift(new apps[j].appClass(windowCookie[i].x,windowCookie[i].y))
      }
    }
  }
  saveData()

  leftArrow = loadImage("caret-left-square-fill.svg")
  downArrow = loadImage("caret-down-square-fill.svg")

  menuItemIndexes = []
  for(let a = 260 + (110/6), i = 0; a < 370; a += 110/6, i ++){
    let x = 310 / 2 * Math.cos(radians(a));
    let y = 310 / 2 * Math.sin(radians(a)) + windowHeight;
    menuItemIndexes[i] = [x,y]
  }
  
}

function draw() {
  for(i in windows){
    if(windows[i].box.destroy == true){
      windows.splice(i,1)
    }
  }

  background(0,0,0);
  for(i in windows){
    if(windows[i].box.checkClick() == true){
      let topWindow = windows[i]
      if(i != 0){
        windows.splice(i,1)
        windows.unshift(topWindow)
      }
      saveData()
      break
    }

  }
  for(i in windows){
    if(windows[i].hasOwnProperty("itxt")){
      windows[i].itxt = i + " / "+ windows.length
    }
    i = windows[windows.length-1-i]
    i.update();
    i.box.draw();
  }
  drawMenu();
}


function mouseClicked(){
  if(mouseX < 40 && mouseX > 0 && mouseY > windowHeight - 40 && mouseY < windowHeight){
    showMenu = !showMenu
  }

  if(showMenu){
    for(i = 0;i <5; i++){
      x = menuItemIndexes[i][0]
      y = menuItemIndexes[i][1]
      if(mouseX > x - 15 && mouseX < x + 15 && mouseY > y - 15 && mouseY < y + 15){
        if(i > 0 && i <4){
          windows.unshift(new apps[-1+i+3*page].appClass)
          showMenu = false
        }
        if(i == 0 && page != 0){
          page = page -1
        }
        if(i == 4 && apps[3*page+3]){
          page = page +1
        }
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for(i in windows){
    i = windows[i]
    if(i.box.x > windowWidth-20){
      i.box.x = windowWidth-20
    }
    if(i.box.y > windowHeight-20){
      i.box.y = windowHeight-20
    }
  }

  menuItemIndexes = []
  for(let a = 260 + (110/6), i = 0; a < 370; a += 110/6, i ++){
    let x = 310 / 2 * Math.cos(radians(a));
    let y = 310 / 2 * Math.sin(radians(a)) + windowHeight;
    menuItemIndexes[i] = [x,y]
  }
  saveData()
}






function drawMenu(){



  if(showMenu == false){
    if(menuAnimMult < 1){
      menuAnimMult = menuAnimMult + 0.1;
    }

    if(menuAnimAngle > 0.1){
      menuAnimAngle = menuAnimAngle - 0.1;
      fill(255,255,255)
      arc(0,windowHeight,360,360,-HALF_PI,-HALF_PI+menuAnimAngle)
      fill(0,0,0)
      arc(0,windowHeight,260,260,-HALF_PI,-HALF_PI+menuAnimAngle+0.1)
  
      fill(255,255,255)
      arc(0,windowHeight,250,250,-HALF_PI,-HALF_PI+menuAnimAngle)
      fill(0,0,0)
      arc(0,windowHeight,150,150,-HALF_PI,-HALF_PI+menuAnimAngle+0.1)
    }
  }else{
    if(menuAnimMult > -1){
      menuAnimMult = menuAnimMult - 0.1;
    }
    if(menuAnimAngle < HALF_PI){
      menuAnimAngle = menuAnimAngle + 0.1;
    }
    fill(255,255,255)
    arc(0,windowHeight,360,360,-HALF_PI,-HALF_PI+menuAnimAngle)

    fill(0,0,0)
    arc(0,windowHeight,260,260,-HALF_PI,-HALF_PI+menuAnimAngle+0.1)

    fill(255,255,255)
    arc(0,windowHeight,250,250,-HALF_PI,-HALF_PI+menuAnimAngle)
    fill(0,0,0)
    arc(0,windowHeight,150,150,-HALF_PI,-HALF_PI+menuAnimAngle+0.1)
  }

  if(menuAnimMult < 1){
    for(i = 0;i <5; i++){
      x = menuItemIndexes[i][0]
      y = menuItemIndexes[i][1]
      if(page == 0 && i == 0){continue}
      if(i== 0){
        image(leftArrow,x-15,y-15,30,30)
      }else if(i == 4 && apps[3*page+3]){
        image(downArrow,x-15,y-15,30,30)
      }else if(i > 0 && i < 4){
        if(!apps[-1+i+3*page]){break}
        image(apps[-1+i+3*page].icon,x-15,y-15,30,30)
      }
    }
  }

  fill(255*abs(menuAnimMult),255*abs(menuAnimMult),255*abs(menuAnimMult))
  if(menuAnimMult > 0){
    rect(10,windowHeight-20,10,10,2)
    rect(23,windowHeight-20,10,10,2)
    rect(23,windowHeight-32,10,10,2)
    rect(10,windowHeight-32,10,10,2)
  }else{
    textSize(30);
    text("X",10,windowHeight-10);
  }

}