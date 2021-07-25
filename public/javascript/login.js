async function signupFormHandler(event) {
  event.preventDefault();

  document.location.replace('/signup')
}

async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {'Content-Type' : 'application/json'}
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      document.querySelector('.loginAlert').style.display = "block";
      setTimeout(function() { 
        document.querySelector('.loginAlert').style.display = "none"; 
    }, 3000);
    }
  }
}

document.querySelector('.signup-btn').addEventListener('click', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);