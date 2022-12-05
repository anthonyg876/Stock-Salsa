document.addEventListener("DOMContentLoaded", () => {
    const stockSearch = document.querySelector("#search");

    stockSearch.addEventListener("submit", e => {
        e.preventDefault();
        var id = document.querySelector("#searchName");
        fetch("" + id, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                let i = 0;
                while (i < data.length) {
                    var cleanData = [];
                    const date = Date.parse(data[i].dateOfPrice);
                    const obj = {
                        "dateOfPrice": date,
                        "PC": data[i].PC,
                    };
                    cleanData.push(obj);
                    console.log(cleanData);
                    i++;
                }
                //make AMCHART

            })
            .catch((err) => {
                console.log(err);
            });
    });
});

function getPrices() {
    var cleanData = [];

// document.querySelector("#searchButton").addEventListener("click", e => {
    var id = document.querySelector("#searchName");
    console.log(id);
    var request = "http://localhost:8080/api/v1/stockPrices/priceChanges/" + id.value;
    console.log(request);
    fetch(request, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((data) => {
            let i = 0;
            while (i < data.length) {
                const date = Date.parse(data[i].dateOfPrice);
                cleanData.push({
                    Date: date,
                    PC: data[i].PC
                })
                i++;
            }

            console.log(cleanData);
            am5.ready(function() {

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
                var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
                root.setThemes([
                    am5themes_Animated.new(root)
                ]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
                var chart = root.container.children.push(am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    pinchZoomX:true
                }));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
                var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
                    behavior: "none"
                }));
                cursor.lineY.set("visible", false);


// Generate random data
                var date = new Date();
                date.setHours(0, 0, 0, 0);
                var value = 100;

                function generateData() {
                    value = Math.round((Math.random() * 10 - 5) + value);
                    am5.time.add(date, "day", 1);
                    return {
                        date: date.getTime(),
                        value: value
                    };
                }

                function generateDatas(count) {
                    var data = [];
                    for (var i = 0; i < count; ++i) {
                        data.push(generateData());
                    }
                    return data;
                }


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
                var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
                    maxDeviation: 0.2,
                    baseInterval: {
                        timeUnit: "day",
                        count: 1
                    },
                    renderer: am5xy.AxisRendererX.new(root, {}),
                    tooltip: am5.Tooltip.new(root, {})
                }));

                var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererY.new(root, {})
                }));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
                var series = chart.series.push(am5xy.LineSeries.new(root, {
                    name: "Daily Price Change",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "PC",
                    valueXField: "Date",
                    tooltip: am5.Tooltip.new(root, {
                        labelText: "{valueY}"
                    })
                }));


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
                chart.set("scrollbarX", am5.Scrollbar.new(root, {
                    orientation: "horizontal"
                }));


// Set data
//var data = generateDatas(1200);
                series.data.setAll(cleanData);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
                series.appear(1000);
                chart.appear(1000, 100);
            }); // end am5.ready()

        })
        .catch((err) => {
            console.log(err);
        });
};
