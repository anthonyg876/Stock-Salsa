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
};

function totalTuples() {
    const messageElement = document.getElementById("totalTuples");
    fetch("http://localhost:8080/api/v1/stockPrices/totalTuples", {
            method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            messageElement.innerHTML = "Total Tuples in Database: " + data;
        })
        .catch((err) => {
            console.log(err);
        });
};

function top5DJI() {
    const form = {
        BeginDate: dateConverter(document.querySelector("#StartDate").value),
        EndDate: dateConverter(document.querySelector("#EndDate").value),
        Index: "DJI"
    }
    console.log(form);
    fetch("http://localhost:8080/api/v1/stockPrices/highestGrowingStocks", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify([form.BeginDate, form.EndDate, form.Index]),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let sortedData = [];
            for(let i = 0; i < data.length; ++i) {
                sortedData.push({
                    Name: data[i].nameOfStock,
                    Growth: data[i].percentIncrease
                })
            }
            console.log(sortedData);
            const tbl = document.createElement("table");
            tbl.id = "tableOne";
            document.body.appendChild(tbl);
            const tblBody = document.createElement("tbody");

            // creating all cells
            for (let i = 0; i < data.length; i++) {
                // creates a table row
                const row = document.createElement("tr");

                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                const cell = document.createElement("td");
                const cellText = document.createTextNode(sortedData[i].Name);
                cell.appendChild(cellText);
                row.appendChild(cell);
                const cell2 = document.createElement("td");
                const cell2Text = document.createTextNode(sortedData[i].Growth);
                cell2.appendChild(cell2Text);
                row.appendChild(cell2)

                // add the row to the end of the table body
                tblBody.appendChild(row);
            }

            // put the <tbody> in the <table>
            tbl.appendChild(tblBody);
            // appends <table> into <body>
            document.body.appendChild(tbl);
            // sets the border attribute of tbl to '2'
            tbl.setAttribute("border", "2");
        })
        .catch((err) => {
            console.log(err);
        });
};

function losersDJI() {
    const form = {
        BeginDate: dateConverter(document.querySelector("#StartDate").value),
        EndDate: dateConverter(document.querySelector("#EndDate").value),
    }
    console.log(form);
    fetch("http://localhost:8080/api/v1/stockPrices/lowestGrowingStocks", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify([form.BeginDate, form.EndDate, form.Index]),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let sortedData = [];
            for(let i = 0; i < data.length; ++i) {
                sortedData.push({
                    Name: data[i].nameOfStock,
                    Growth: data[i].percentIncrease
                })
            }
            console.log(sortedData);
            const tbl = document.createElement("table");
            tbl.id = "tableOne";
            document.body.appendChild(tbl);
            const tblBody = document.createElement("tbody");

            // creating all cells
            for (let i = 0; i < data.length; i++) {
                // creates a table row
                const row = document.createElement("tr");

                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                const cell = document.createElement("td");
                const cellText = document.createTextNode(sortedData[i].Name);
                cell.appendChild(cellText);
                row.appendChild(cell);
                const cell2 = document.createElement("td");
                const cell2Text = document.createTextNode(sortedData[i].Growth);
                cell2.appendChild(cell2Text);
                row.appendChild(cell2)

                // add the row to the end of the table body
                tblBody.appendChild(row);
            }

            // put the <tbody> in the <table>
            tbl.appendChild(tblBody);
            // appends <table> into <body>
            document.body.appendChild(tbl);
            // sets the border attribute of tbl to '2'
            tbl.setAttribute("border", "2");
        })
        .catch((err) => {
            console.log(err);
        });
};

function deleteTable() {
    var removeTab = document.getElementById('tableOne');
    var parentEl = removeTab.parentElement;
    parentEl.removeChild(removeTab);
}