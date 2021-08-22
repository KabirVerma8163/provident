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

async function fetchNews(ticker)
{
    // const fetch = require("node-fetch");
    const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${ticker}/news/last/5?token=Tsk_7124566e8c6147939d1708c99bd3b78a`)
    const news = await response.json();

    console.log(news);

    for(let i = 0; i < 5; i++)
    {
        sources[i] = news[i].source;
        urls[i] = news[i].url;
        images[i] = news[i].image;
        summaries[i] = news[i].summary;
        headlines[i] = news[i].headline;
    }
}

(async function()
{
    await fetchNews(ticker);

    document.getElementById("headline1").innerHTML = headlines[0];
    document.getElementById("summary1").innerHTML = summaries[0];
    document.getElementById("source1").innerHTML = sources[0];
    document.getElementById("url1").setAttribute("href",urls[0]);
    document.getElementById("image1").src = images[0];

    document.getElementById("headline2").innerHTML = headlines[1];
    document.getElementById("summary2").innerHTML = summaries[1];
    document.getElementById("source2").innerHTML = sources[1];
    document.getElementById("url2").setAttribute("href",urls[1]);
    document.getElementById("image2").src = images[1];

    document.getElementById("headline3").innerHTML = headlines[2];
    document.getElementById("summary3").innerHTML = summaries[2];
    document.getElementById("source3").innerHTML = sources[2];
    document.getElementById("url3").setAttribute("href",urls[2]);
    document.getElementById("image3").src = images[2];

    document.getElementById("headline4").innerHTML = headlines[3];
    document.getElementById("summary4").innerHTML = summaries[3];
    document.getElementById("source4").innerHTML = sources[3];
    document.getElementById("url4").setAttribute("href",urls[3]);
    document.getElementById("image4").src = images[3];

    document.getElementById("headline5").innerHTML = headlines[4];
    document.getElementById("summary5").innerHTML = summaries[4];
    document.getElementById("source5").innerHTML = sources[4];
    document.getElementById("url5").setAttribute("href",urls[4]);
    document.getElementById("image5").src = images[4];

})();




