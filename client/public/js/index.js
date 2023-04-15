//redirect to page

const logIn = document.getElementById('log-in');
logIn.addEventListener('click', redirectToHome);

const logInGoogle = document.getElementById('log-in-google');
logInGoogle.addEventListener('click', redirectToHome);

function redirectToHome() {
  window.location.href = 'http://localhost:1337/home';
}