let quotes = [
  { id: 0, author: "Charles Lindbergh", quote: "Life is like a landscape. You live in the midst of it but can describe it only from the vantage point of distance.", likes: 0 },
  { id: 1, author: "Albert Einstein", quote: "Life is like riding a bicycle. To keep your balance you must keep moving.", likes: 0 },
  { id: 2, author: "Oscar Wilde", quote: "Be yourself; everyone else is already taken.", likes: 0 }
];

let lastIndex = -1; // to prevent same quote twice in a row
let filteredQuotes = [];
let currentIndex = 0;

// Elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const extraInfo = document.getElementById('extra-info');

// Generate random quote
document.getElementById('generate').addEventListener('click', () => {
  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (index === lastIndex && quotes.length > 1);
  lastIndex = index;
  displayQuote(quotes[index]);
});

// Display quote function
function displayQuote(quote) {
  quoteText.textContent = quote.quote;
  quoteAuthor.textContent = quote.author;
  extraInfo.textContent = `Likes: ${quote.likes}`;
}

// Add new quote
document.getElementById('add-quote').addEventListener('click', () => {
  const text = document.getElementById('new-quote').value;
  const author = document.getElementById('new-author').value;
  if(text && author) {
    const newQuote = { id: quotes.length, author, quote: text, likes: 0 };
    quotes.push(newQuote);
    document.getElementById('new-quote').value = '';
    document.getElementById('new-author').value = '';
    alert('Quote added!');
  }
});

// Character and word count buttons
document.getElementById('char-space').addEventListener('click', () => {
  extraInfo.textContent = `Chars (with spaces): ${quoteText.textContent.length}`;
});
document.getElementById('char-no-space').addEventListener('click', () => {
  extraInfo.textContent = `Chars (no spaces): ${quoteText.textContent.replace(/\s/g, '').length}`;
});
document.getElementById('word-count').addEventListener('click', () => {
  extraInfo.textContent = `Words: ${quoteText.textContent.split(/\s+/).filter(Boolean).length}`;
});
document.getElementById('like-btn').addEventListener('click', () => {
  let quote = quotes.find(q => q.quote === quoteText.textContent);
  quote.likes++;
  extraInfo.textContent = `Likes: ${quote.likes}`;
});

// Filter by author
document.getElementById('filter-btn').addEventListener('click', () => {
  const author = document.getElementById('filter-author').value.toLowerCase();
  filteredQuotes = quotes.filter(q => q.author.toLowerCase() === author);
  if(filteredQuotes.length > 0){
    currentIndex = 0;
    displayQuote(filteredQuotes[currentIndex]);
  } else {
    quoteText.textContent = "No quotes found for this author.";
    quoteAuthor.textContent = "";
    extraInfo.textContent = "";
  }
});

// Previous/Next buttons
document.getElementById('prev-quote').addEventListener('click', () => {
  if(filteredQuotes.length > 0) {
    currentIndex = (currentIndex - 1 + filteredQuotes.length) % filteredQuotes.length;
    displayQuote(filteredQuotes[currentIndex]);
  }
});
document.getElementById('next-quote').addEventListener('click', () => {
  if(filteredQuotes.length > 0) {
    currentIndex = (currentIndex + 1) % filteredQuotes.length;
    displayQuote(filteredQuotes[currentIndex]);
  }
});
