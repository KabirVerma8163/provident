let base;
let token;
(function()
{
    base = 'https://sandbox.iexapis.com/stable/stock/';
    token = '?token=Tsk_7124566e8c6147939d1708c99bd3b78a';
    Highcharts.theme = {
        colors: ['#0892a6', '#000000', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
            '#FF9655', '#FFF263', '#6AF9C4'],
        chart: {
            backgroundColor: '#0f2634',
        },
        title: {
            style: {
                color: '#ffffff',
                fontFamily: 'Dosis',
                font: 'bold 16px "Dosis", Verdana, sans-serif'
            }
        },
        subtitle: {
            style: {
                color: '#666666',
                font: 'bold 12px "Dosis", Verdana, sans-serif'
            }
        },
        legend: {
            itemStyle: {
                font: '9pt "Dosis", Verdana, sans-serif',
                color: 'black'
            },
            itemHoverStyle:{
                color: 'gray'
            }
        },
        series: {
            color: '#000000'
        }
    };
// Apply the theme
    Highcharts.setOptions(Highcharts.theme);
})();
function generateURL(symbol, type, date)
{
    return base + symbol +'/'+ type +'/' + date + token;
}
function generateGenericURL(params)
{
    let result = base;
    for (let i = 0; i < params.length; i++)
    {
        result += params[i] + "/";
    }
    result += token;
    return result;
}
async function getList(listType, number, type, timeRange, elementName)
{
    let list = [];
    const response = await fetch(generateGenericURL(['market', 'list', listType]));
    const data = await response.json();
    for (let i = 0; i < data.length; i++)
    {
        list.push(data[i].symbol);
    }
    return list;
}
function createCandlestickGraph(symbol, type, timeRange, elementName)
{
    Highcharts.getJSON(generateURL(symbol, type, timeRange), function (data) {
        var ohlc = [],
            volume = [],
            dataLength = data.length,
            i = 0;

        for (i; i < dataLength; i += 1) {
            ohlc.push([
                Date.parse(data[i].date),
                data[i].open,
                data[i].high,
                data[i].low,
                data[i].close
            ]);
            volume.push([
                Date.parse(data[i].date), // the date
                data[i].volume // the volume
            ]);
        }
        Highcharts.stockChart(elementName, {
            title: {
                text: `${symbol} Stock Price`,
                align: 'left',

            },
            yAxis: [{
                labels: {
                    align: 'left'
                },
                height: '80%',
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'left'
                },
                top: '80%',
                height: '20%',
                offset: 0
            }],
            tooltip: {
                shape: 'square',
                headerShape: 'callout',
                borderWidth: 0,
                shadow: false,
                positioner: function (width, height, point) {
                    var chart = this.chart,
                        position;

                    if (point.isHeader) {
                        position = {
                            x: Math.max(
                                // Left side limit
                                chart.plotLeft,
                                Math.min(
                                    point.plotX + chart.plotLeft - width / 2,
                                    // Right side limit
                                    chart.chartWidth - width - chart.marginRight
                                )
                            ),
                            y: point.plotY
                        };
                    } else {
                        position = {
                            x: point.series.chart.plotLeft,
                            y: point.series.yAxis.top - chart.plotTop
                        };
                    }

                    return position;
                }
            },
            series: [{
                type: 'candlestick',
                id: `${symbol}-ohlc`,
                name: `${symbol} Stock Price`,
                data: ohlc
            }, {
                type: 'column',
                id: `${symbol}-volume`,
                name: `${symbol} Volume`,
                data: volume,
                yAxis: 1
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 800
                    },
                    chartOptions: {
                        rangeSelector: {
                            inputEnabled: false
                        }
                    }
                }]
            }
        });
    });
}
/*http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(req.url);
    res.end();
}).listen(8080);*/
