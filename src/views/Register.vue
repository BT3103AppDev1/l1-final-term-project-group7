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

<script>
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import firebaseApp  from '@/firebase.js'; 
import { doc, getDoc, setDoc, getFirestore, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
    name: 'Register',

    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
            user: '',
            uid: '',
            auth: getAuth(firebaseApp),
        };
    },

    mounted() {
        onAuthStateChanged(this.auth, (user) => {
        if (user) {
            this.user = user;
            this.uid = user.uid;
        }
        })
    },

    methods: {
        async register() {
            try {
                await createUserWithEmailAndPassword(this.auth, this.email, this.password);
                console.log("Successfully registered!");
                this.$router.push('/');
            } catch (error) {
                console.error(error.code);
                switch(error.code) {
                    case "auth/email-already-in-use": 
                        this.errorMessage = "Email is in use";
                        break;
                    case "auth/weak-password": 
                        this.errorMessage = "Password should have at least 6 characters";
                        break;
                    default: 
                        this.errorMessage = "Invalid email or password";
                }
            }
        },

        async registerWithGoogle() {
            try {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(this.auth, provider);
                console.log("Successfully registered with Google!");
                this.$router.push('/');
            } catch (error) {
                console.error(error.code);
                this.errorMessage = "Failed to register with Google.";
            }
        },

        goToLogin() {
            this.$router.push('/login');
        }
    },
};
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
