import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyBOXdaTNqdFZhTHqJMZbAhSHSkOc54Nd7E",
    authDomain: "hackthon-prepration.firebaseapp.com",
    projectId: "hackthon-prepration",
    storageBucket: "hackthon-prepration.appspot.com",
    messagingSenderId: "1014328056995",
    appId: "1:1014328056995:web:2eb4d817fec9c22b8ff316"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)


// signup form

let btn = document.getElementById("sign_btn");
btn.addEventListener("click", () => {
    let name = document.getElementById("username");
    let phone = document.getElementById("usernumber");
    let email = document.getElementById("useremail");
    let password = document.getElementById("userpassword");
    
     let userData = {
        name: name.value,
        phone: phone.value,
        email: email.value,
        password: password.value
    } 
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then(async(userCredential) => {
      const user = userCredential.user;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
           
      location="./dashboard.html"

      try {
        const docRef = await addDoc(collection(db, "users"), {
          ...userData,
          uid:user.uid
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
     
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("erroMessage",errorMessage);
     
    });
  
})

let getAllUsers = async() =>{
    const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} =>`,doc.data());
});
}

// signin form

const login = () => {
    console.log(auth);

    let email = document.querySelector("#email-in")
    let password = document.querySelector("#password-in")
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((resolve) => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your login successfully',
                showConfirmButton: false,
                timer: 1500
              })
         
              window.location = "./dashboard.html"
        }).catch((reject) => {
            // alert("reject")
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
        })
}
let btn_login = document.getElementById("signBtn")
btn_login.addEventListener("click", login)

