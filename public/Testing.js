var http = require('http');
const loadHighCharts = async () => {
    const { default: Highcharts } =
    await import('https://code.highcharts.com/stock/highstock.js');
    await import('https://code.highcharts.com/stock/modules/data.js');
    await import('https://code.highcharts.com/stock/modules/drag-panes.js');
    await import('https://code.highcharts.com/modules/price-indicator.js');
    await import('https://code.highcharts.com/modules/full-screen.js');
    await import('https://code.highcharts.com/stock/modules/heikinashi.js');
    await import('https://code.highcharts.com/stock/modules/hollowcandlestick.js');
};
function generateURL(symbol, type, date)
{
    const base = 'https://sandbox.iexapis.com/stable/stock/';
    const token = '?token=Tsk_7124566e8c6147939d1708c99bd3b78a';
    return base + symbol +'/'+ type +'/' + date + token;
}
function generateGenericURL(params)
{
    const base = 'https://sandbox.iexapis.com/stable/stock/';
    const token = '?token=Tsk_7124566e8c6147939d1708c99bd3b78a';
    var result = base;
    for (let i = 0; i < params.length; i++)
    {
        result += params[i] + "/";
    }
    return result;
}
function getList(listType)
{
    Highcharts.getJSON(generateGenericURL(['market', 'list', listType]), function (data)
    {
        var list = [];
        for (let i = 0; i < data.length; i++)
        {
            list.push(data[i].symbol);
        }
        return list;
    });
}
console.log(getList('gainers'));
function createOHLCGraph(symbol, type, timeRange, elementName)
{
    Highcharts.getJSON(generateURL(symbol, type, timeRange), function (data) {
        console.log(data);
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
                type: 'ohlc',
                id: 'aapl-ohlc',
                name: 'AAPL Stock Price',
                data: ohlc
            }, {
                type: 'column',
                id: 'aapl-volume',
                name: 'AAPL Volume',
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
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(req.url);
    res.end();
}).listen(8080);
