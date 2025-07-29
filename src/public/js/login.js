document.getElementById('loginForm').addEventListener('submit', function (e) {
  

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Dummy credentials
  const validUsername = 'admin';
  const validPassword = 'admin123';

  if (username === validUsername && password === validPassword) {
    // Store login status in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('error').classList.remove('hidden');
  }
});
