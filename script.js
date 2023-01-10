const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const autorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuotes() {

    loading();

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    if(!quote.author) {
        autorText.textContent = 'Unknown';
    }else {
        autorText.textContent = quote.author;
    }

    if(quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    }else{
        quoteText.classList.remove("long-quote"); 
    }
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuotes();
    }catch(error){
        console.log(error);
    }
}
newQuoteBtn.addEventListener('click', newQuotes);

getQuotes();
