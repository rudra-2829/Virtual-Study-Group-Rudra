// Get the sign-up form element
const signUpForm = document.getElementById('signup-form');

// Add an event listener to the form submission
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the input values
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const username = document.getElementById('username').value.trim();
    const mobileNumber = document.getElementById('mobile-number').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const collegeName = document.getElementById('college-name').value.trim();
    const captcha = document.getElementById('captcha').value.trim();

    // Error message element
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';

    // Basic validation
    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        errorMessage.style.display = 'block';
        return;
    }

    if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
        errorMessage.textContent = "Please enter a valid 10-digit mobile number.";
        errorMessage.style.display = 'block';
        return;
    }

    if (!validateEmail(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        errorMessage.style.display = 'block';
        return;
    }

    // You can add a server-side check for existing username, email, or mobile number
    checkForExistingUser(email, username, mobileNumber);

    // If validation passes, proceed to submission (to be handled by backend)
    alert("Sign-up successful!");

    // Function to validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Mock function to check existing users
    function checkForExistingUser(email, username, mobileNumber) {
        // Mock response
        const existingEmails = ['test@example.com'];
        const existingUsernames = ['testuser'];

        if (existingEmails.includes(email)) {
            errorMessage.textContent = "Email already exists.";
            errorMessage.style.display = 'block';
            return false;
        }

        if (existingUsernames.includes(username)) {
            errorMessage.textContent = "Username already exists.";
            errorMessage.style.display = 'block';
            return false;
        }
    }
});
