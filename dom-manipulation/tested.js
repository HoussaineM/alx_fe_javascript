const myQuotes = [
    { text: "First quote", category: "1" },
    { text: "Second quote", category: "2" },
    { text: "Third quote", category: "3" },
    { text: "Fourth quote", category: "4" },
    { text: "fith quote", category: "5" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuote = document.getElementById("newQuote");
const myTable = document.createElement("table");
const myRow1 = document.createElement("tr");
const th1 = document.createElement("th");
th1.textContent = "Quote";
const th2 = document.createElement("th");
th2.textContent = "Category";
myRow1.appendChild(th1);
myRow1.appendChild(th2);
myTable.appendChild(myRow1);

newQuote.addEventListener("click", showRandomQuote);

function showRandomQuote() {
    const myRow2 = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const currentIndex = myQuotes[Math.floor(Math.random() * myQuotes.length)];
    td1.textContent = currentIndex.text;
    td2.textContent = currentIndex.category;
    myRow2.appendChild(td1);
    myRow2.appendChild(td2);
    myTable.appendChild(myRow2);
    quoteDisplay.appendChild(myTable);
}

function addQuote() {
    const myRow2 = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const newQuoteText = document.getElementById("newQuoteText");
    const newQuoteCategory = document.getElementById("newQuoteCategory");
    isValid = true;
    const newArr = { text: "", category: "" };

    if (newQuoteText.value.trim() === "" || newQuoteCategory.value.trim() === "") {
        isValid = false;
    }

    if (isValid) {
        td1.textContent = newQuoteText.value.trim();
        td2.textContent = newQuoteCategory.value.trim();
        myRow2.appendChild(td1);
        myRow2.appendChild(td2);
        myTable.appendChild(myRow2);
        quoteDisplay.appendChild(myTable);
        newArr.text = newQuoteText.value.trim();
        newArr.category = newQuoteCategory.value.trim();
        myQuotes.push(newArr);
        newQuoteText.value = "";
        newQuoteCategory.value = "";
    } else {
        alert("empty box. Please! Enter something");
    }
}