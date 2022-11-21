const stocks = [
    { name: 'AXP'},
    { name: 'AMGN'},
    { name: 'AAPL'},
    { name: 'BA'},
    { name: 'CAT'},
    { name: 'CSCO'},
    { name: 'CVX'},
    { name: 'GS'},
    { name: 'HD'},
    { name: 'HON'},
    { name: 'IBM'},
    { name: 'INTC'},
    { name: 'JNJ'},
    { name: 'KO'},
    { name: 'JPM'},
    { name: 'MCD'},
    { name: 'MMM'},
    { name: 'MRK'},
    { name: 'MSFT'},
    { name: 'NKE'},
    { name: 'PG'},
    { name: 'TRV'},
    { name: 'UNH'},
    { name: 'CRM'},
    { name: 'VZ'},
    { name: 'V'},
    { name: 'WBA'},
    { name: 'WMT'},
    { name: 'DIS'},
    { name: 'DOW'},
]

const stockNames = [
    { name: 'American Express Co'},
    { name: 'Amgen Inc'},
    { name: 'Apple Inc'},
    { name: 'Boeing Co'},
    { name: 'Caterpillar Inc'},
    { name: 'Cisco Systems Inc'},
    { name: 'Chevron Corp'},
    { name: 'Goldman Sachs Group Inc'},
    { name: 'Home Depot Inc'},
    { name: 'Honeywell International Inc'},
    { name: 'International Business Machines Corp'},
    { name: 'Intel Corp'},
    { name: 'Johnson & Johnson'},
    { name: 'Coca-Cola Co'},
    { name: 'JPMorgan Chase & Co'},
    { name: 'McDonald\'s Corp'},
    { name: '3M Co'},
    { name: 'Merck & Co Inc'},
    { name: 'Microsoft Corp'},
    { name: 'Nike Inc'},
    { name: 'Proctor & Gamble Co'},
    { name: 'Travelers Companies Inc'},
    { name: 'UnitedHealth Group Inc'},
    { name: 'Salesforce Inc'},
    { name: 'Verizon Communications Inc'},
    { name: 'Visa Inc'},
    { name: 'Walgreens Boots Alliance Inc'},
    { name: 'Walmart Inc'},
    { name: 'Walt Disney Co'},
    { name: 'Dow Inc'},
]

const searchInput = document.querySelector('.input')

searchInput.addEventListener("input", (e) => {
    // inside, we will need to achieve a few things:
    // 1. declare and assign the value of the event's target to a variable AKA whatever is typed in the search bar
    let value = e.target.value

    // 2. check: if input exists and if input is larger than 0
    if (value && value.trim().length > 0){
        clearList()
        // 3. redefine 'value' to exclude white space and change input to all uppercase
         value = value.trim().toUpperCase()
        // 4. return the results only if the value of the search is included in the stock's symbol
        setList(stocks.filter(stock => {
            return stock.name.includes(value)
        }))
    } else {
        // 5. return nothing
        clearList()

    }

})

const clearButton = document.getElementById('clear')

clearButton.addEventListener("click", () => {
    clearList()
})

// creating and declaring a function called "setList"
// setList takes in a param of "results"
function setList(results){

    for (const stock of results){
        // creating a li element for each result item
        const resultItem = document.createElement('li')

        // adding a class to each item of the results
        resultItem.classList.add('result-item')

        // grabbing the name of the current point of the loop and adding the name as the list item's text
        const text = document.createTextNode(stock.name)

        // appending the text to the result item
        resultItem.append(text)

        // appending the result item to the list
        list.append(resultItem)
    }

    if (results.length === 0 ){
        noResults()
    }
}

function clearList(){
    list.innerHTML = ' '
}

function noResults(){
    // create an element for the error; a list item ("li")
    const error = document.createElement('li')
    // adding a class name of "error-message" to our error element
    error.classList.add('error-message')

    // creating text for our element
    const text = document.createTextNode('No results found. Sorry!')
    // appending the text to our element
    error.append(text)
    // appending the error to our list element
    list.append(error)
}


