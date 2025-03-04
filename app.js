function InputFocusEffect(){
  document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".input-container input");
  
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("active");
      });
  
      input.addEventListener("blur", () => {
        if (input.value === "") {
          input.parentElement.classList.remove("active");
        }
      });
    });
  });
}
function PasswordValidation (){
  let passwordfield = document.getElementById('password');
  let error = document.getElementById('error')

  if(passwordfield.value.length < 6){
    error.style.display = 'block'
  }else {
     error.style.display = 'none'
  }
}
function togglePassword() {
  let passwordField = document.getElementById("password");
  let icon = document.querySelector(".toggle-icon");
  icon.style.opacity = 1;
  if (passwordField.type === "password") {
      passwordField.type = "text";
      icon.textContent = "🔒";
  } else {
      passwordField.type = "password";
      icon.textContent = "👁️";
  }
}
InputFocusEffect();