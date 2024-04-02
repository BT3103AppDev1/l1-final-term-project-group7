<template>
<div id="registerContainer">
    <h1 id="mainHead">Health Guru</h1>
    <h1 id="message">Create An Account</h1>
    <p><input type="text" placeholder="email" v-model="email" /></p>
    <p><input type="password" placeholder="password" v-model="password" /></p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="registerWithGoogle">Register With Google</button></p>
    <h3 id="pagecontent">HealthGuru is a .... </h3>
</div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseApp  from '@/firebase.js'; 

export default {
    data() {
        return {
        email: "",
        password: "",
        errorMessage: "",
        };
    },

    methods: {
        async register() {
        try {
            const auth = getAuth(firebaseApp);
            await createUserWithEmailAndPassword(auth, this.email, this.password);
            console.log("Successfully registered!");
            this.$router.push('/');
        } catch (error) {
            console.error(error.code);
            this.errorMessage = this.getErrorMessage(error.code);
        }
        },

        async registerWithGoogle() {
        try {
            const auth = getAuth(firebaseApp);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log(result.user);
            this.$router.push("/");
        } catch (error) {
            console.error(error.code);
            this.errorMessage = "Failed to sign in with Google.";
        }
        },

        getErrorMessage(code) {
        switch(code) {
            case "auth/email-already-in-use": return "Email is in use";
            case "auth/weak-password": return "Password should have at least 6 characters";
            default: return "Invalid email or password";
        }
        }
    }
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
