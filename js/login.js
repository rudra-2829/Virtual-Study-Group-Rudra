// Get the login form element
const loginForm = document.getElementById('login-form');

// Add an event listener to the form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the email, mobile number, password, and captcha input values
    const email = document.getElementById('email').value.trim();
    const mobileNumber = document.getElementById('mobile-number').value.trim();
    const password = document.getElementById('password').value.trim();
    const captcha = document.getElementById('captcha').value.trim();

    // Basic validation
    if (!validateEmail(email)) {
        alert('Please enter a valid email.');
        return;
    }

    if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    if (captcha === "") {
        alert('Please fill in the captcha.');
        return;
    }

    // Submit the form (you can modify this part for actual server-side requests)
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
            // Redirect the user to the dashboard page
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid email, password, or captcha.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was a problem with your login.');
    });
});

// Basic email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add an event listener to the forgot password link
document.getElementById('forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    // Handle forgot password logic here
    alert('Forgot password functionality is under construction.');
});
