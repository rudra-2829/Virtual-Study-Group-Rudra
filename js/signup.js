// Get the sign up form element
const signUpForm = document.getElementById('signup-form');

// Add an event listener to the form submission
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the input values
    const fullName = document.getElementById('full-name').value;
    const username = document.getElementById('username').value;
    const mobileNumber = document.getElementById('mobile-number').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const collegeName = document.getElementById('college-name').value;
    const captcha = document.getElementById('captcha').value;

    // Validate the input values
    if (password !== confirmPassword) {
        alert('Passwords do not match');
    } else if (!validateEmail(email)) {
        alert('Invalid email');
    } else if (!fullName || !username || !mobileNumber || !collegeName || !captcha) {
        alert('Please fill in all fields');
    } else {
        // Send a request to the server to sign up the user
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullName, username, mobileNumber, email, password, collegeName, captcha })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.success) {
                // Redirect the user to the home page
                window.location.href = 'index.html';
            } else {
                alert('Sign up failed');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}
