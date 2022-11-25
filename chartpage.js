document.addEventListener("DOMContentLoaded", () => {
    const stockSearch = document.querySelector("#search");

    stockSearch.addEventListener("submit", e => {
        e.preventDefault();
        var id = document.querySelector("#searchName");
        fetch("http://localhost:8080/api/v1/stockPrices/getPrices/" + id, {
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
                    "open": data[i].open,
                    "high": data[i].high,
                    "low": data[i].low,
                    "adjClose": data[i].adjClosed,
                    "volume": data[i].volume
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