import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express(); 
const port = 3000; 
const API_URL = "https://api.blockchain.com/v3/exchange"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const totalSyms = []; 
var allSyms = await axios.get(API_URL+"/symbols");

for (var key in allSyms.data){
  totalSyms.push(key);
}


app.get("/", async (req, res) => {
    res.render("index.ejs", {allNames: totalSyms});
  });

app.post("/submit", async (req, res)=>{
    var userInput = req.body["symbolName"];
    if (totalSyms.includes(userInput) === true){
      try {
        var response = await axios.get(API_URL+"/tickers/"+userInput);
        var symbo = response.data.symbol;
        var price_24 = response.data.price_24h;
        var vol_24 = response.data.volume_24h;
        var lastTradePrice = response.data.last_trade_price; 
        res.render("submit.ejs", {
            symbol: symbo,
            price: price_24,
            volume: vol_24,
            lastPrice: lastTradePrice,
        }); 
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("submit.ejs", { error: error.message });
      }
    }else{
      res.render("index.ejs", {allNames: totalSyms});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });