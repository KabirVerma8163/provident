let ticker = "aapl";

let headlines = new Array(5);
let summaries = new Array(5);
let images = new Array(5);
let urls = new Array(5);
let sources = new Array(5);



function storeTicker()
{
    ticker = document.getElementById("ticker").value
}

const fetch = require("node-fetch");

fetch(`https://sandbox.iexapis.com/stable/stock/${ticker}/news/last/5?token=Tsk_7124566e8c6147939d1708c99bd3b78a`)
    .then((response) => {
        return response.json();
    })
    .then((news) => {

        for(let i = 0; i < 5; i++)
        {
            sources[i] = news[i].source;
            urls[i] = news[i].url;
            images[i] = news[i].image;
            summaries[i] = news[i].summary;
            headlines[i] = news[i].headline;
        }

        document.getElementById("please").innerHTML = headlines[0];

    });






