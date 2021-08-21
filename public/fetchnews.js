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
    const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${ticker}/news/last/5?token=Tsk_7124566e8c6147939d1708c99bd3b78a`)
    const news = await response.json();

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
})();




