import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
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
    
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  
    const auth = getAuth(app);
    const db = getFirestore(app);    

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        let user = userCredential.user;
        let userData = {
            email : email,
            fname : fname,
            lname : lname
        }
        showMessage('Account Created Successfully ✔️')
        let docRef = doc(db , 'users' , user.uid)
        setDoc(docRef,userData)
        .then(
            ()=>{
                window.location.href = './accessts/login.html'
            }
        )
        .catch((error)=>{
            console.error('error writing document' , error)
        })
    })
    .catch((error)=>{
        let errorCode = error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exist ❌ !!!','signUpMessage')
        }else{
            showMessage('Unable to create user ⚠️ !!!','signUpMessage')
        }

    })
})