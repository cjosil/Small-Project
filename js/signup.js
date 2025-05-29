function openSignupModal() {
  const modal = document.getElementById('signupModal');
  if (modal) modal.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#signupModal form');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const inputs = form.querySelectorAll('input');
    const [first, last, username, password] = [...inputs].map(i => i.value.trim());

    if (!first || !last || !username || !password) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch('/LAMPAPI/Register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          FirstName: first,
          LastName: last,
          Login: username,
          Password: password
        })
      });

      const text = await response.text();

      // Helpful debug output if something goes wrong
      console.log("Raw response from server:", text);

      const data = JSON.parse(text);

      if (data.error === "") {
        alert("Account created successfully!");
        document.getElementById('signupModal').style.display = 'none';
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("An error occurred while registering. Please try again.");
    }
  });
});

window.onclick = function (event) {
  const modal = document.getElementById('signupModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
