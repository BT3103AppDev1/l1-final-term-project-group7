<template>
    <div id="loginContainer">
    <h1 id="mainHead">Health Guru</h1>
    <h1 id="message">Log In to An Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p><button @click="signIn">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
    <p><button @click="goToRegister">Register for an Account</button></p>
    <h3 id="pagecontent">HealthGuru is a ...</h3>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseApp from '@/firebase'; // Adjust this path to your Firebase config initialization file

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const router = useRouter();

const auth = getAuth(firebaseApp);

const signIn = async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log("Successfully signed in!");
        router.push('/');
    } catch (error) {
        console.error(error.code);
        errorMessage.value = "Incorrect email or password";
    }
};

const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        console.log("Successfully signed in with Google!");
        router.push("/");
    } catch (error) {
        console.error(error.code);
        alert("Failed to sign in with Google.");
    }
};

const goToRegister = () => {
    router.push('/register');
}
</script>

<style scoped>
#firebaseui-auth-container {
    margin-top: 20px;
    margin-bottom: 50px;
}

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

#loginContainer {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
  