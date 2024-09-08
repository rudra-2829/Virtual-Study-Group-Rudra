document.getElementById('save-details-btn').addEventListener('click', function() {
    // Fetching the current content of the name, email, and mobile fields
    let name = document.getElementById('name').innerText;
    let email = document.getElementById('email').innerText;
    let mobile = document.getElementById('mobile').innerText;

    // Storing them in localStorage to simulate account creation
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('mobile', mobile);

    // After saving, disabling the fields so they cannot be changed
    document.getElementById('name').contentEditable = 'false';
    document.getElementById('email').contentEditable = 'false';
    document.getElementById('mobile').contentEditable = 'false';

    alert('Profile details saved successfully. You cannot edit the name, email, or mobile number now.');
});

// Check if account has been created already by looking into localStorage
window.onload = function() {
    if (localStorage.getItem('name')) {
        // If account is created, populate fields and disable editing
        document.getElementById('name').innerText = localStorage.getItem('name');
        document.getElementById('email').innerText = localStorage.getItem('email');
        document.getElementById('mobile').innerText = localStorage.getItem('mobile');
        
        document.getElementById('name').contentEditable = 'false';
        document.getElementById('email').contentEditable = 'false';
        document.getElementById('mobile').contentEditable = 'false';
    }
};
