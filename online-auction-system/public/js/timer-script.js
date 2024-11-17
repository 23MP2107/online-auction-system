// /public/js/timer-script.js
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

// // Function to start the countdown timer
// function startTimer(endTime, timerElementId) {
//     const endTimeMs = new Date(endTime).getTime();
//     const timerElement = document.getElementById(timerElementId);

//     function updateTimer() {
//         const now = new Date().getTime();
//         const distance = endTimeMs - now;

//         if (distance < 0) {
//             timerElement.innerHTML = "Auction Ended";
//             clearInterval(timerInterval);
//             return;
//         }

//         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//         timerElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
//     }

//     // Update the timer every second
//     const timerInterval = setInterval(updateTimer, 1000);
// }

// // Export the function if you need it elsewhere (not necessary if used only here)
// if (typeof module !== 'undefined') {
//     module.exports = { startTimer };
// }



