"https://jsonplaceholder.typicode.com/users"

const selected = document.querySelector(".selectedContainer");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

function maybeDisposeRoot(divId) {
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root.dom.id == divId) {
        root.dispose();
      }
    });
  };

function dateConverterArray(date) {
    let year = "";
    let month = "";
    let day = "";
    for (let i = 0; i < date.length; ++i) {
        if (i < 4) {
            year += date[i];
        }
        if (i > 4 && i < 7) {
            month += date[i];
        }
        if (i > 7 && i < 10) {
            day += date[i];
        }
    }
    let yearInt = parseInt(year);
    yearInt += 1;
    let yearPlusOne = yearInt.toString();
    let monthStart = parseInt(month);
    let monthInt = parseInt(month);
    let resultArray = [];
    for (let j = 0; j < 13; j++) {
        let currMonth = (monthInt + j) % 12;
        switch (currMonth) {
            case 0:
                month = "DEC";
                break;
            case 1:
                month = "JAN";
                break;
            case 2:
                month = "FEB";
                break;
            case 3:
                month = "MAR";
                break;
            case 4:
                month = "APR";
                break;
            case 5:
                month = "MAY";
                break;
            case 6:
                month = "JUN";
                break;
            case 7:
                month = "JUL";
                break;
            case 8:
                month = "AUG";
                break;
            case 9:
                month = "SEP";
                break;
            case 10:
                month = "OCT";
                break;
            case 11:
                month = "NOV";
                break;
            default:
                month = "JAN";
                break;
        }
        let resultDate;
        if (monthStart > 12) {
            resultDate = "" + day + "-" + month + "-" + yearPlusOne;
            monthStart++;
        }
        else{
            resultDate = "" + day + "-" + month + "-" + year;
            monthStart++;
        }
        resultArray[j] = resultDate;
    }
    // switch (month) {
    //     case "01":
    //         month = "JAN";
    //         break;
    //     case "02":
    //         month = "FEB";
    //         break;
    //     case "03":
    //         month = "MAR";
    //         break;
    //     case "04":
    //         month = "APR";
    //         break;
    //     case "05":
    //         month = "MAY";
    //         break;
    //     case "06":
    //         month = "JUN";
    //         break;
    //     case "07":
    //         month = "JUL";
    //         break;
    //     case "08":
    //         month = "AUG";
    //         break;
    //     case "09":
    //         month = "SEP";
    //         break;
    //     case "10":
    //         month = "OCT";
    //         break;
    //     case "11":
    //         month = "NOV";
    //         break;
    //     case "12":
    //         month = "DEC";
    //         break;
    //     default:
    //         month = "JAN";
    //         break;
    // }
    // let resultDate = "" + day + "-" + month + "-" + year;
    //console.log(resultArray);
    return resultArray;
}

function dateConverter(date) {
    let year = "";
    let month = "";
    let day = "";
    for (let i = 0; i < date.length; ++i) {
        if (i < 4) {
            year += date[i];
        }
        if (i > 4 && i < 7) {
            month += date[i];
        }
        if (i > 7 && i < 10) {
            day += date[i];
        }
    }

    switch (month) {
        case "01":
            month = "JAN";
            break;
        case "02":
            month = "FEB";
            break;
        case "03":
            month = "MAR";
            break;
        case "04":
            month = "APR";
            break;
        case "05":
            month = "MAY";
            break;
        case "06":
            month = "JUN";
            break;
        case "07":
            month = "JUL";
            break;
        case "08":
            month = "AUG";
            break;
        case "09":
            month = "SEP";
            break;
        case "10":
            month = "OCT";
            break;
        case "11":
            month = "NOV";
            break;
        case "12":
            month = "DEC";
            break;
        default:
            month = "JAN";
            break;
    }
    let resultDate = "" + day + "-" + month + "-" + year;
    return resultDate;
}

function getAvgVolume() {
    const messageElement = document.getElementById("message");
    let dates = [];
    dates = dateConverterArray(document.querySelector("#StartDate").value);
    console.log(dates);
    const form = {
        Symbol: document.querySelector("#searchName").value,
        BeginDate: dates[0],
        EndDate: dates[12]
    };
    console.log(form);
    let volData = [];
    fetch("http://localhost:8080/api/v1/stockPrices/averageVolume", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify([form.Symbol, form.BeginDate, form.EndDate]),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            messageElement.innerHTML = "Average Volume of " + form.Symbol + ": " + data;
        })
        .catch((err) => {
            console.log(err);
        });
    for (let i = 0; i < 12; ++i) {
        fetch("http://localhost:8080/api/v1/stockPrices/averageVolume", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify([form.Symbol, dates[i], dates[i + 1]]),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            volData.push(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    console.log(volData);
    // am5.ready(function() {

    //     // Create root element
    //     // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    //     maybeDisposeRoot("chartdiv");
    //     var root = am5.Root.new("chartdiv");
        
        
    //     // Set themes
    //     // https://www.amcharts.com/docs/v5/concepts/themes/
    //     root.setThemes([
    //       am5themes_Animated.new(root)
    //     ]);
        
        
    //     // Create chart
    //     // https://www.amcharts.com/docs/v5/charts/xy-chart/
    //     var chart = root.container.children.push(am5xy.XYChart.new(root, {
    //       panX: false,
    //       panY: false,
    //       wheelX: "panX",
    //       wheelY: "zoomX"
    //     }));
        
        
    //     // Add cursor
    //     // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    //     var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    //       behavior: "zoomX"
    //     }));
    //     cursor.lineY.set("visible", false);
        
    //     var date = new Date();
    //     date.setHours(0, 0, 0, 0);
    //     var value = 100;
        
    //     function generateData() {
    //       value = Math.round((Math.random() * 10 - 5) + value);
    //       am5.time.add(date, "month", 1);
    //       return {
    //         date: date.getTime(),
    //         value: value
    //       };
    //     }
        
    //     function generateDatas(count) {
    //       var data = [];
    //       for (var i = 0; i < count; ++i) {
    //         data.push(generateData());
    //       }
    //       return data;
    //     }
        
        
    //     // Create axes
    //     // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    //     var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    //       maxDeviation: 0,
    //       baseInterval: {
    //         timeUnit: "month",
    //         count: 1
    //       },
    //       renderer: am5xy.AxisRendererX.new(root, {}),
    //       tooltip: am5.Tooltip.new(root, {})
    //     }));
        
    //     var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    //       renderer: am5xy.AxisRendererY.new(root, {})
    //     }));
        
        
    //     // Add series
    //     // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    //     var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    //       name: "Series",
    //       xAxis: xAxis,
    //       yAxis: yAxis,
    //       valueYField: "value",
    //       valueXField: "month",
    //       tooltip: am5.Tooltip.new(root, {
    //         labelText: "{valueY}"
    //       })
    //     }));
        
        
        
    //     // Add scrollbar
    //     // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    //     chart.set("scrollbarX", am5.Scrollbar.new(root, {
    //       orientation: "horizontal"
    //     }));
        
    //     var data = generateDatas(50);
    //     series.data.setAll(data);
        
        
    //     // Make stuff animate on load
    //     // https://www.amcharts.com/docs/v5/concepts/animations/
    //     series.appear(1000);
    //     chart.appear(1000, 100);
        
    //     }); // end am5.ready()
};

function getAvgClose() {
    const messageElement = document.getElementById("message");
    let dates = [];
    dates = dateConverterArray(document.querySelector("#StartDate").value);
    const form = {
        Symbol: document.querySelector("#searchName").value,
        BeginDate: dates[0],
        EndDate: dates[12]
    };
    console.log(form);
    fetch("http://localhost:8080/api/v1/stockPrices/averageClose", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify([form.Symbol, form.BeginDate, form.EndDate]),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            messageElement.innerHTML = "Average Closing Price of " + form.Symbol + ": " + data;
        })
        .catch((err) => {
            console.log(err);
        });
};

function priceChanges() {
    cleanData = [];
    const form = {
        Symbol: document.querySelector("#searchName").value,
        BeginDate: dateConverter(document.querySelector("#StartDate").value),
        EndDate: dateConverter(document.querySelector("#EndDate").value)
    };
    console.log(form);
    var request = "http://localhost:8080/api/v1/stockPrices/priceChanges";
    fetch(request, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify([form.Symbol, form.BeginDate, form.EndDate]),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let i = 0;
            while (i < data.length) {
                const date = Date.parse(data[i].DATEOFPRICE);
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
                                maybeDisposeRoot("chartdiv");
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
}

function percentageChanges() {
    cleanData = [];
    const form = {
        Symbol: document.querySelector("#searchName").value,
        BeginDate: dateConverter(document.querySelector("#StartDate").value),
        EndDate: dateConverter(document.querySelector("#EndDate").value)
    };
    console.log(form);
    var request = "http://localhost:8080/api/v1/stockPrices/percentageChanges";
    fetch(request, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify([form.Symbol, form.BeginDate, form.EndDate]),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let i = 0;
            while (i < data.length) {
                const date = Date.parse(data[i].DATEOFPRICE);
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
                                maybeDisposeRoot("chartdiv");
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
}

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
    o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
    });
});

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
        const isVisible =
            user.name.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value)
        user.element.classList.toggle("hide", !isVisible)
    })
})

fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]")
            const body = card.querySelector("[data-body]")
            header.textContent = user.name
            body.textContent = user.email
            userCardContainer.append(card)
            return { name: user.name, email: user.email, element: card }
        })
    })