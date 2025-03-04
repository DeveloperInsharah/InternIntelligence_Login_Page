import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc
  } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCFqKG-QnPMy_hOBmLL5SHE2be6Yp3J3Dg",
    authDomain: "login-page-e416b.firebaseapp.com",
    projectId: "login-page-e416b",
    storageBucket: "login-page-e416b.firebasestorage.app",
    messagingSenderId: "425587316622",
    appId: "1:425587316622:web:4807d22ff5b39a4f0476df",
  };

  let app = initializeApp(firebaseConfig)

  let auth = getAuth();
  let db = getFirestore();

  onAuthStateChanged(auth,(user)=>{
    let loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        let docRef = doc(db, 'users', loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
          if(docSnap.exists()){
            let userData=docSnap.data();
            document.getElementById('fname').innerHTML=userData.fname;
            document.getElementById('lname').innerHTML=userData.lname;
            document.getElementById('email').innerHTML=userData.email;
          }
          else{
            console.log('not document found matching id')
          }
        })
        .catch((error)=>{
          console.log('Error getting document')
        })
    } else{
      console.log("User id not found in local storage")
    }
  })
  let logout = document.getElementById('logout')
  logout.addEventListener('click' , ()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
      window.location.href = '../index.html'
    })
    .catch((error)=>{
      console.error('Error Signing Out :',error)
    })
  })
