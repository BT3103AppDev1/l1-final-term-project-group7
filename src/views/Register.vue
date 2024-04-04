<template>
<div id="registerContainer">
    <h1 id="mainHead">Health Guru</h1>
    <h1 id="message">Create An Account</h1>
    <p><input type="text" placeholder="email" v-model="email" /></p>
    <p><input type="password" placeholder="password" v-model="password" /></p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="registerWithGoogle">Register With Google</button></p>
    <p><button @click="goToLogin">Have an Account? Log in here</button></p>
    <h3 id="pagecontent">HealthGuru is a .... </h3>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseApp  from '@/firebase.js'; 

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const auth = getAuth(firebaseApp);

const register = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        console.log("Successfully registered!");
        router.push('/');
    } catch (error) {
        console.error(error.code);
        switch(code) {
            case "auth/email-already-in-use": 
                errorMessage.value = "Email is in use";
            case "auth/weak-password": 
                errorMessage.value = "Password should have at least 6 characters";
            default: 
                errorMessage.value = "Invalid email or password";
        }
    }
}


const registerWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        console.log("Successfully registered with Google!");
        router.push("/");
    } catch (error) {
        console.error(error.code);
        errorMessage.value = "Failed to register with Google.";
    }
}
      
const goToLogin = async () => {
    router.push('/login');
}

</script>

<style scoped>
#pagecontent {
height: 100px;
font-size: larger;
font-weight: bolder;
text-align: center;
}

#mainHead {
width: 100%;
text-align: center;
background-color: white;
}

#registerContainer {
width: 100%;
display: flex;
align-items: center;
flex-direction: column;
}
</style>
