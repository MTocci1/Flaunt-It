//Email Validation
//test if the email matches the pattern
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //all patterns from chatGPT
  return emailPattern.test(email);
}

const emailInput = document.getElementById('email-input');

//when user types in the email box check if it is a valid email
emailInput.addEventListener('input', function() {
  if (!validateEmail(emailInput.value)) {
    emailInput.style.borderColor = 'red'; //change color of border
  } 
  else {
    emailInput.style.borderColor = 'rgb(12, 235, 12)';
  }
});


//Password Validation
//get values from html file
const pass = document.getElementById('pass1');
const upper = document.getElementById('upper');
const num = document.getElementById('number');
const len = document.getElementById('length');

//check is if password has at least 8 characters
function testLength(pass){
  if (pass.length >= 8){
    lengthValid = true;
  }
  else{
    lengthValid = false;
  }
  return lengthValid
}

//when user types in password box check if it meets the requirements
pass.addEventListener('input', function() {
  const password = pass.value;

  //test if password matches pattern
  //see if it has at least 1 uppercase letter
  let hasUppercase = /[A-Z]/.test(password);
  //see if it has at least 1 number
  let hasNumber = /\d/.test(password);

  let isAtLeast8Chars = testLength(password);

  if (hasUppercase) {
    upper.style.color = 'rgb(12, 235, 12)'; //change color of requirement text
  } else {
    upper.style.color = '';
  }

  if (hasNumber) {
    num.style.color = 'rgb(12, 235, 12)';
  } else {
    num.style.color = '';
  }

  if (isAtLeast8Chars) {
    len.style.color = 'rgb(12, 235, 12)';
  } else {
    len.style.color = '';
  }

  //if all these values are true change color of box
  if (hasUppercase && hasNumber && isAtLeast8Chars) {
    pass.style.borderColor = 'rgb(12, 235, 12)';
  } else {
    pass.style.borderColor = '';
  }
});

//redirect user to a page
const signUp = document.getElementById('sign-up');
signUp.addEventListener('click', redirectToHome);

const signUpGoogle = document.getElementById('sign-up-google');
signUpGoogle.addEventListener('click', redirectToHome);

function redirectToHome() {
  window.location.href = 'http://localhost:1337/home';
}