document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=30')
        .then(response => response.json())
        .then(data => {
            let chartData = data.map(entry => ({
                x: new Date(entry.candle_date_time_kst),
                y: [entry.opening_price, entry.high_price, entry.low_price, entry.trade_price]
            }));

            let chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                axisX: {
                    valueFormatString: "MMM DD"
                },
                axisY: {
                    title: "가격 (KRW)",
                    prefix: "₩"
                },
                data: [{
                    type: "candlestick",
                    yValueFormatString: "₩#,##0.00",
                    xValueFormatString: "MMM DD",
                    dataPoints: chartData
                }]
            });
            chart.render();
        })
        .catch(error => console.error('Error fetching data:', error));
});
