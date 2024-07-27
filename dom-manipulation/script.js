let myQuotes = [ { text: "First quote", category: "1" }, { text: "Second quote", category: "2" }, { text: "Third quote", category: "3" }];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuote = document.getElementById("newQuote");
const myTable = document.createElement("table");
const myRow1 = document.createElement("tr");
const th1 = document.createElement("th");
th1.textContent = "Quote";
const th2 = document.createElement("th");
th2.textContent = "Category";
const myRow2 = document.createElement("tr");
const td1 = document.createElement("td");
const td2 = document.createElement("td");
myRow1.appendChild(th1);
myRow1.appendChild(th2);
myTable.appendChild(myRow1);


loadTasks(); 
function loadTasks() {
    const storedQuotes = JSON.parse(localStorage.getItem("localQuotes") || '[]');
    const lastSelected = JSON.parse(localStorage.getItem("option") || "[]");
    
    if (storedQuotes == "") {
        if (lastSelected != "") {
            const filteredQuotes = lastSelected === 'all' ? myQuotes : myQuotes.filter(quote => quote.category === lastSelected);
            filteredQuotes.forEach(element => {
                const myRow2 = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                td1.textContent = element.text;
                td2.textContent = element.category;
                myRow2.appendChild(td1);
                myRow2.appendChild(td2);
                myTable.appendChild(myRow2);
            });
            quoteDisplay.appendChild(myTable);
        } else {
            myQuotes.forEach(element => {
                const myRow2 = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                td1.textContent = element.text;
                td2.textContent = element.category;
                myRow2.appendChild(td1);
                myRow2.appendChild(td2);
                myTable.appendChild(myRow2);
            });
            quoteDisplay.appendChild(myTable);
        }
    } else {
        myQuotes = [...storedQuotes];
        if (lastSelected != "") {
            const filteredQuotes = lastSelected === 'all' ? myQuotes : myQuotes.filter(quote => quote.category === lastSelected);
            filteredQuotes.forEach(element => {
                const myRow2 = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                td1.textContent = element.text;
                td2.textContent = element.category;
                myRow2.appendChild(td1);
                myRow2.appendChild(td2);
                myTable.appendChild(myRow2);
            });
            quoteDisplay.appendChild(myTable);
        } else {
            myQuotes.forEach(element => {
                const myRow2 = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                td1.textContent = element.text;
                td2.textContent = element.category;
                myRow2.appendChild(td1);
                myRow2.appendChild(td2);
                myTable.appendChild(myRow2);
            });
            quoteDisplay.appendChild(myTable);
        }
    }
}


newQuote.addEventListener("click", showRandomQuote);

function removeRows() {
    const myRemove = myTable.childNodes;
    while (myRemove[1]) {
        myRemove[1].remove();
    }
}


function showRandomQuote() {
    removeRows();
    const currentIndex = myQuotes[Math.floor(Math.random() * myQuotes.length)];
    td1.innerHTML = currentIndex.text;
    td2.innerHTML = currentIndex.category;
    myRow2.appendChild(td1);
    myRow2.appendChild(td2);
    myTable.appendChild(myRow2);
    quoteDisplay.appendChild(myTable);

}



function createAddQuoteForm() {
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
        saveQuotes();
        populateCategories(myQuotes);             
        newQuoteText.value = "";
        newQuoteCategory.value = "";
    } else {
        alert("Please! Enter something");
    }
}

function saveQuotes() {
    localStorage.setItem("localQuotes", JSON.stringify(myQuotes));
}

function exportToJsonFile() {
    const jsonQuotes = JSON.stringify(myQuotes);
    const blob = new Blob([jsonQuotes], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        const importedQuotes = JSON.parse(event.target.result);
        myQuotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

function populateCategories(arr) {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    const unique = [];
    arr.map(value => {
        if (!unique.includes(value.category)) {
            unique.push(value.category)
        }
    });
    unique.forEach(category => {
        const option = document.createElement("option");
        option.textContent = category;
        option.value = category;
        categoryFilter.appendChild(option);
    });
}
populateCategories(myQuotes);

function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' ? myQuotes : myQuotes.filter(quote => quote.category === selectedCategory);
    removeRows();
    filteredQuotes.forEach(element => {
        const myRow2 = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        td1.textContent = element.text;
        td2.textContent = element.category;
        myRow2.appendChild(td1);
        myRow2.appendChild(td2);
        myTable.appendChild(myRow2);
    });
    quoteDisplay.appendChild(myTable);
    localStorage.setItem("option", JSON.stringify(selectedCategory));
}

async function syncQuotes() {
    try {
        const postedQuotes = [
            { text: "Server quote 1", category: "Server category 1" }
        ];

        const serverQuotes = "https://jsonplaceholder.typicode.com/posts";
        const my = await fetch(serverQuotes);

        const response = await fetch(serverQuotes, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postedQuotes)
        });
        const fetchQuotes = await response.json();

       myQuotes.push(fetchQuotes["0"]);
        saveQuotes();
        populateCategories();
       alert("Quotes synced with server!"); 
    } catch (err) {
        alert(err);
    }
}
function fetchQuotesFromServer(){
    setInterval(syncQuotes, 5 * 60 * 1000); 
}
fetchQuotesFromServer();