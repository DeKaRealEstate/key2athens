document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('regStatus').textContent = "Thank you for registering!";
});