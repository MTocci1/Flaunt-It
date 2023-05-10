const logBtn = document.getElementById('log-in-btn');
logBtn.addEventListener('click', redirectToHome);

function redirectToHome() {
    window.location.href = 'http://localhost:1337/';
}