function openLoginModal() {
	const modal = document.getElementById('loginModal');
	if (modal) modal.style.display = 'flex';
  }
  
  function handleLogin(event) {
	event.preventDefault();
  
	const username = document.getElementById('loginUsername').value;
	const password = document.getElementById('loginPassword').value;
	const error = document.getElementById('loginError');
  
	const formData = new FormData();
	formData.append("username", username);
	formData.append("password", $.md5(password)); // md5.js already included

  
	fetch('Login.php', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({
		  Login: username,
		  Password: password // or $.md5(password) if required
		})
	  })
	  .then(res => res.json())
	  .then(data => {
		console.log("Login response:", data);
		if (data.error === "") {
		  alert("Welcome " + data.firstName + " " + data.lastName + "!");
		  document.getElementById('loginModal').style.display = 'none';
		  // store user info, redirect, etc.
		} else {
		  document.getElementById('loginError').style.display = 'block';
		}
	  })
	  .catch(err => {
		console.error("Fetch error:", err);
		document.getElementById('loginError').style.display = 'block';
	  });
	  
  
	return false;
  }
  
  
  // Close modal if user clicks outside of it
  window.addEventListener('click', function (event) {
	const modal = document.getElementById('loginModal');
	if (event.target === modal) {
	  modal.style.display = 'none';
	}
  });
  
  