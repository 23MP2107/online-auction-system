// // Set the end time for the auction (replace with your own end time)
// var endTime = new Date('2023-04-30T08:15:00Z');

// // Select all the timer and bid now button elements
// var timers = document.querySelectorAll('.timer');
// var bidNowBtns = document.querySelectorAll('.bid-now-btn');

// // Update the timer element with the remaining time
// function updateTimer(timer) {
//   var now = new Date();
//   var remainingTime = endTime - now;

//   if (remainingTime <= 0) {
//     // If the timer has ended, disable the bid now button
//     timer.closest('.auction-container').querySelector('.bid-now-btn').disabled = true;
//     timer.innerHTML = 'Auction ended';
//   } else {
//     var hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
//     var minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
//     var seconds = Math.floor((remainingTime / 1000) % 60);
//     timer.innerHTML = hours.toString().padStart(2, '0') + ':' +
//                       minutes.toString().padStart(2, '0') + ':' +
//                       seconds.toString().padStart(2, '0');
//   }
// }

// // Update the timer for each container every second
// setInterval(function() {
//   for (var i = 0; i < timers.length; i++) {
//     updateTimer(timers[i]);
//   }
// }, 1000);

// // Add click event listener to each bid now button
// for (var i = 0; i < bidNowBtns.length; i++) {
//   bidNowBtns[i].addEventListener('click', function() {
//     // Redirect to bid page (replace with your own bid page URL)
//     window.location.href = 'index.html';
//   });
// }
// public/js/timer-script.js

// Add event listener to the upload form
// public/js/timer-script.js

// Add event listener to the upload form
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Create a FormData object from the form

    // Retrieve the JWT token from local storage or another source
    const token = localStorage.getItem('jwtToken'); // Adjust this if your token is stored elsewhere

    fetch('/sell/uploads', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}` // Include the JWT token
        },
        credentials: 'include',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Handle the response from the server
        alert('Product listed successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to list product.');
    });
});



