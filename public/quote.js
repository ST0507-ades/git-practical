// retrieve the quote from local storage if it exists
//const quote = localStorage.getItem('inspirational-quote');

const quote = false;

if (quote) {
    // if the quote exists in local storage, set the text of the quote element to it
    document.getElementById('quote').textContent = quote;
} else {
    // if the quote doesn't exist in local storage, fetch a new quote from the internet
    document.getElementById('quote').textContent = 'Fetching quote...';
    console.log("Going to fetch...")
    fetch('https://api.quotable.io/random')
        .then((response) => response.json())
        .then((data) => {
            console.log("The quote is " + data.content)
            // set the text of the quote element to the fetched quote
            document.getElementById('quote').textContent = data.content;
            // store the quote in local storage for future use
            localStorage.setItem('inspirational-quote', data.content);
        });

}
