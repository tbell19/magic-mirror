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
      this.titletxt = this.box.text("Loading headlines.",20,600,32,CENTER)
    }
  
  // 71ac1dbf716d46a79edf882a0b7b09f0x


    update(){

        if (this.timer == 0 || millis() >= 1500000+this.timer) {
            this.timer = millis();
            console.log("fetching news data")
            fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=71ac1dbf716d46a79edf882a0b7b09f0").then(d=> d.json()).then(e=> this.updateData(e))
          }

        if (this.timer2 != -1 && this.timer2 == 0 || millis() >= 30000+this.timer2) {
          this.timer2 = millis()
          this.titletxt.text = this.news.articles[this.headlinei]["title"]
          if(this.headlinei < this.news.articles.length -1){
            this.headlinei++
          }else{
            this.headlinei = 0
          }
        }
    }
    
    updateData(data){
        this.news = data
        console.log("data loaded")
        if(this.timer2 == -1){
          this.timer2 = 0
        }
    }

    

    
  }