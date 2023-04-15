const homeBtn = document.getElementById('home-btn');
homeBtn.addEventListener('click', redirectToHome);

const msgBtn = document.getElementById('msg-btn');
msgBtn.addEventListener('click', redirectToHome);

const profileBtn = document.getElementById('profile-btn');
profileBtn.addEventListener('click', redirectToHome);

const postBtn = document.getElementById('post-btn');
postBtn.addEventListener('click', redirectToHome);

function redirectToHome() {
  window.location.href = 'http://localhost:1337/home';
}

function redirectToMsg() {
    window.location.href = 'http://localhost:1337/messages';
}

function redirectToProfile() {
    window.location.href = 'http://localhost:1337/profile';
}

  function redirectToPost() {
    window.location.href = 'http://localhost:1337/post';
}