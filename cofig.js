// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut  } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfPZwwM8Nwx_cC-tNADQdIQF0epEqew20",
    authDomain: "weather-site-cec60.firebaseapp.com",
    projectId: "weather-site-cec60",
    storageBucket: "weather-site-cec60.firebasestorage.app",
    messagingSenderId: "514429115577",
    appId: "1:514429115577:web:2ecc8526ec563a6774cf68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up function
async function signUp() {
    try {
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        
        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Invalid email format.");
            return;
        }

        // Ensure password meets Firebase requirements (at least 6 characters)
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const currentUser = { uid: userCredential.user.uid, name: username };
        
        localStorage.setItem("chatUser", JSON.stringify(currentUser));
        console.log("User created:", currentUser);
        alert(`User Created Successfully! Welcome, ${username}`);

         // **Change Signup/Login to "Hi, Username"**
         document.getElementById("nav-auth").innerText = `Hi, ${username}`;
         // **Show and Hide Elements**
        const getDiv = document.getElementById("get");
        const fetchDiv = document.getElementById("fetch");

        if (getDiv) getDiv.style.display = "none";
        if (fetchDiv) fetchDiv.style.display = "flex";
         // Close the menu by unchecking the menu button checkbox
         document.querySelector(".menu-btn").checked = false;
    } catch (error) {
        console.error("Signup Error:", error);
        alert(`Error: ${error.message}`);
    }
}

// Sign In function
 async function signIn() {
    try {
        const email = document.getElementById("emaill")?.value.trim();
        const password = document.getElementById("passwordd")?.value.trim();

        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // **Fetch user info from Firebase Auth**
        const username = user.displayName || "User"; 

        console.log("User signed in:", user);
        alert(`Welcome back, ${username}!`);

        // **Update Navigation Bar**
        const navAuth = document.getElementById("nav-auth");
        if (navAuth) {
            navAuth.innerText = `Hi, ${username}`;
        }

        // **Show and Hide Elements**
        document.getElementById("get")?.style.display = "none";
        document.getElementById("fetch")?.style.display = "flex";

        // **Close the menu**
        const menuBtn = document.querySelector(".menu-btn");
        if (menuBtn) {
            menuBtn.checked = false;
        }

    } catch (error) {
        console.error("Sign-in Error:", error);
        alert(`Error: ${error.message}`);
    }
}

// Log Out function
async function logOut() {
    try {
        await signOut(auth);
        console.log("User logged out");
        alert("Log Out Successful!");
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}

// Attach functions to window so they can be accessed in HTML onclick attributes
window.signUp = signUp;
window.signIn = signIn;
window.logOut = logOut;
