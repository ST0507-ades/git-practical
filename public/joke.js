// retrieve the quote from local storage if it exists
//const joke = localStorage.getItem('joke');

const joke = false;

if (joke) {
    // if the quote exists in local storage, set the text of the quote element to it
    document.getElementById('joke').textContent = joke;
} else {
    // if the quote doesn't exist in local storage, fetch a new quote from the internet
    document.getElementById('joke').textContent = 'Fetching joke...';

        fetch('https://icanhazdadjoke.com/', {
            headers: {
              'Accept': 'application/json',
            }
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("The joke is " + data.joke);
              // Set the text of the quote element to the fetched joke
              document.getElementById('joke').textContent = data.joke;
              // Store the joke in local storage for future use
              localStorage.setItem('joke', data.joke);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
}
