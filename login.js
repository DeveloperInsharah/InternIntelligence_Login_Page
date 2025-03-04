import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc
  } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFqKG-QnPMy_hOBmLL5SHE2be6Yp3J3Dg",
  authDomain: "login-page-e416b.firebaseapp.com",
  projectId: "login-page-e416b",
  storageBucket: "login-page-e416b.firebasestorage.app",
  messagingSenderId: "425587316622",
  appId: "1:425587316622:web:4807d22ff5b39a4f0476df",
};

const app = initializeApp(firebaseConfig);
function showMessage(message){
    var messageDiv = document.getElementById('signUpMessage') 
    messageDiv.style.display = 'block'
    messageDiv.innerHTML=message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity = 0
    },3000)
}
let submit = document.getElementById("submit");
submit.addEventListener("click", async function (e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  
    const auth = getAuth(app);
    const db = getFirestore(app);    

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        showMessage('Logged In Successfully ✔️')
        let user = userCredential.user;
        localStorage.setItem('loggedInUserId' , user.uid)
        window.location.href = './profile.html'
    })
    .catch((error)=>{
        let errorCode = error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password ⚠️ !!!','signUpMessage')
        }else{
            showMessage('Account deos not exist ❌ !!!','signUpMessage')
        }

    })
})