class News{
    constructor(x=0,y=0){
      this.x = x
      this.y = y
      this.box = new Box("News",x,y,1200,50);
      this.timer = 0
      this.timer2 = -1
      this.headlineAnim = 1
      this.headlinei = 0
      this.news = {}
      this.newsImg = loadImage("app-icons/news.svg")
      this.newsIconRect = this.box.rect(646-(textWidth("Loading headlines.")/2),18,18,16)
      this.newsIcon = this.box.img(this.newsImg,650-(textWidth("Loading headlines.")/2),18)
      this.titletxt = this.box.text("Loading headlines.",20,600,32,CENTER)
    }
  


    update(){

        if (this.timer == 0 || millis() >= 1500000+this.timer) {
            this.timer = millis();
            fetch("https://api.currentsapi.services/v1/latest-news?apiKey=w22MFCBuKWUhcHGoLoobyZP39CyToM5vDgLPWoX1hHuR5KPW").then(d=> d.json()).then(e=> this.updateData(e))
          }

        if (this.timer2 != -1 && this.timer2 == 0 || millis() >= 30000+this.timer2) {
          this.timer2 = millis()
          this.titletxt.text = this.news[this.headlinei]["title"]
          textSize(20)
          this.newsIcon.x = 570-(textWidth(this.news[this.headlinei]["title"])/2)
          this.newsIconRect.x = 569-(textWidth(this.news[this.headlinei]["title"])/2)

          if(this.headlinei < this.news.length -1){
            this.headlinei++
          }else{
            this.headlinei = 0
          }
        }
    }
    
    updateData(data){
        this.news = data.news
        console.log(data)
        if(this.timer2 == -1){
          this.timer2 = 0
        }
    }

    

    
  }