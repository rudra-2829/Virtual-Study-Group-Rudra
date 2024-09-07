// Get the login form element
const loginForm = document.getElementById('login-form');

// Add an event listener to the form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the email, mobile number, password, and captcha input values
    const email = document.getElementById('email').value;
    const mobileNumber = document.getElementById('mobile-number').value;
    const password = document.getElementById('password').value;
    const captcha = document.getElementById('captcha').value;

    // Validate the input values (you can add more validation logic here)
    if (email && mobileNumber && password && captcha) {
        // Send a request to the server to authenticate the user
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, mobileNumber, password, captcha })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.success) {
                // Redirect the user to the home page
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    } else {
        alert('Please fill in all fields');
    }
});

// Add an event listener to the forgot password link
document.getElementById('forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    // Handle forgot password functionality here
});
