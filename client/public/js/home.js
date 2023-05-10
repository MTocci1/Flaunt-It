const homeBtn = document.getElementById('home-btn');
homeBtn.addEventListener('click', redirectToHome);

const msgBtn = document.getElementById('msg-btn');
msgBtn.addEventListener('click', redirectToHome);

const profileBtn = document.getElementById('profile-btn');
profileBtn.addEventListener('click', redirectToHome);

function redirectToHome() {
  window.location.href = 'http://localhost:1337/home';
}

function redirectToMsg() {
    window.location.href = 'http://localhost:1337/messages';
}

function redirectToProfile() {
    window.location.href = 'http://localhost:1337/profile';
}

//gets which user is logged in
function getUserById(index) {
	if(index >= 0) { 
    	fetch('/api/user/' + index).then(function(response) {
      		if (response.status !== 200) {
            	console.log('problem with ajax call! ' + response.status + " msg: " + response.value);
            	return;
        	}
        	response.json().then(function(data) {  
				//greet the user
				document.getElementById('greeting').innerHTML = "Welcome " + data.username + "!";
				document.getElementById('userProfile').innerHTML = "\n<button type='button' class='user-profile-btn'>" 
				+ "<img src='http://localhost:1337/img/" + data.profilePic + "'>" + " @" + data.username + "</button>\n";
        	});
    	});
	}
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

// get the index from the cookie on the client side
var index = getCookie("index");
getUserById(index);

//show all posts
function getAllPosts() {
	fetch('/api/post').then(function(response) {
	  if (response.status !== 200) {
		console.log('problem with ajax call! ' + response.status + " msg: " + response.value);
		return;
	  }
	  response.json().then(function(data) {
		var postHtml = "<ol>";
		for (i in data) {
		  postHtml += "<p id='" + data[i].postID + "'>" + "<img class= 'post-list-profile-pic' src='http://localhost:1337/img/" +
			data[i].profilePic + "'>" + " @" + data[i].username + "<p>\n" + "<p>" + data[i].text + "<p>\n";
			//if image is null dont show it
		  if (data[i].image !== null) {
			postHtml += "<img class= 'post-list-post-img' src='http://localhost:1337/img/" + data[i].image + "'>\n";
		  }
		  postHtml += "<p>" + "Likes: " + data[i].likes + " Comments: " + data[i].comments + "<p>\n <hr>";
		}
		postHtml += "</ol>";
		document.getElementById('posts').innerHTML = postHtml;
	  });
	});
  }

  getAllPosts();


//when post btn is clicked, show popup
const postBtn = document.getElementById('post-btn');
postBtn.addEventListener('click', showPopup);

function showPopup() {
	document.getElementById("popup").style.display = "block";
}

//close the popup
const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', hidePopup);

function hidePopup() {
	document.getElementById("popup").style.display = "none";
  }

//when clicked run postData function
const uploadBtn = document.getElementById('upload-btn');
uploadBtn.addEventListener('click', postData);

//upload the data entered using POST
function postData() {
	const text = document.getElementById('text-input').value;
	const image = document.getElementById('image-input').files[0] || null;
	const likes = 0;
	const comments = 0;
	
	
	// set postID equal to the current number of posts from the post API
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/api/post/', true);
	xhr.onload = function() {
	if (xhr.status === 200) {
		var data = JSON.parse(xhr.responseText);
		postID = data.length;
		getUserInfo(index);
	} else {
		console.log('Error getting post data');
	}
	};
	xhr.send();
  
	getUserInfo(index);
	
	//get which user is posting
	function getUserInfo(index) {
	  fetch('/api/user/' + index).then(function (response) {
		if (response.status !== 200) {
		  console.log('Problem with ajax call! ' + response.status + ' msg: ' + response.value);
		  return;
		}
		response
		  .json()
		  .then(function (data) {
			//use POST method to upload their post
			fetch('/api/post/', {
			  method: 'post',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
				postID: postID,
				username: data.username,
				profilePic: data.profilePic,
				text: text,
				image: image,
				likes: likes,
				comments: comments,
			  }),
			})
			  .then(function (response) {
				if (!response.ok) {
				  console.log('Problem with ajax call! ' + response.status + ' message: ' + response.statusText);
				  return;
				}
				console.log('Post saved!');
			  })
			  .catch(function (error) {
				console.log('Error: ' + error);
			  });
		  })
		  .catch(function (error) {
			console.log('Error parsing JSON data: ' + error);
		  });
	  });
	}

	// Hide the popup
	document.getElementById("popup").style.display = "none";
  }