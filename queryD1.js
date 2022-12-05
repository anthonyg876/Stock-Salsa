document.addEventListener("DOMContentLoaded", () => {
    //change querySelectors
    const stockSearch = document.querySelector("#search");

    stockSearch.addEventListener("submit", e => {
        e.preventDefault();
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
                    DPC: data[i].DPC
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
                    valueYField: "DPC",
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
