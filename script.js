const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

const completed = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get Random Quote
const randomQuote = () => {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author field is blank
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 110) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }
  // Set Quote, Hide Loaded
  quoteText.textContent = quote.text
  completed();
}

// Get Quotes form API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    randomQuote()
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', randomQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
