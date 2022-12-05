"https://jsonplaceholder.typicode.com/users"

const selected = document.querySelector(".selectedContainer");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

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
    const form = {
        Symbol: document.querySelector("#searchName").value,
        BeginDate: dateConverter(document.querySelector("#StartDate").value),
        EndDate: dateConverter(document.querySelector("#EndDate").value)
    };
    console.log(form);
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
};

function getAvgClose() {
    const messageElement = document.getElementById("message");
    const form = {
        Symbol: document.querySelector("#searchName").value,
        BeginDate: dateConverter(document.querySelector("#StartDate").value),
        EndDate: dateConverter(document.querySelector("#EndDate").value)
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