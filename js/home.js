// Simulating login status (set to true if the user is logged in, false otherwise)
let isLoggedIn = true;  // Change to false to simulate logged-out state

// Hamburger menu elements
const hamburgerMenu = document.getElementById('hamburger-menu');
const dropdownMenu = document.getElementById('dropdown-menu');

// Toggle the dropdown menu visibility when the hamburger icon is clicked
hamburgerMenu.addEventListener('click', function() {
    dropdownMenu.classList.toggle('hidden');
});

// Show or hide the hamburger menu based on the login status
window.onload = function() {
    if (isLoggedIn) {
        // If logged in, display the hamburger menu and hide login/signup links
        hamburgerMenu.style.display = 'block';
        document.querySelector('nav ul').style.display = 'none';
    } else {
        // If not logged in, hide the hamburger menu
        hamburgerMenu.style.display = 'none';
        document.querySelector('nav ul').style.display = 'flex';
    }
};

// Learn More button functionality
const learnMoreBtn = document.getElementById('learn-more-btn');
learnMoreBtn.addEventListener('click', function() {
    alert("Learn more about our platform!");
});

// Sign Up button functionality in call-to-action section
const signUpBtn = document.getElementById('signup-btn');
signUpBtn.addEventListener('click', function() {
    window.location.href = "signup.html";  // Redirect to sign-up page
});
