<template>
    <div id="loginContainer">
        <h1 id="mainHead">Health Guru</h1>
        <h1 id="message">Log In to An Account</h1>
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <p><button @click="signIn">Submit</button></p>
        <p><button @click="signInWithGoogle">Sign In With Google</button></p>
        <h3 id="pagecontent">HealthGuru is a .... </h3>
    </div>
</template>
<script>
import 'firebase/compat/auth';
import { ref } from "vue";
//import { useRouter } from "vue-router";
import firebase from "@/uifire.js"
  
export default {
    data() {
        return {
            user: false,
            email: "",
            password: "",
            errorMessage: "",
        }
    },

    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
                this.user = user;
                // Optional: Redirect the user after sign-in
                // this.$router.push('/');
            }
        })
    },

    methods: {
        signIn() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                console.log("Successfully signed in!");
                this.$router.push('/');
                })
                .catch((error) => {
                    console.error(error.code);
                    switch(error.code) {
                        default:
                            this.errorMessage = "Incorrect email or password";
                    }
                    this.$forceUpdate();
                });
        },

        signInWithGoogle() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    console.log(result.user);
                    this.$router.push("/");
                })
                .catch((error) => {
                    console.error(error.code)
                    alert(error.message)
                });
        }
    }
}

</script>
<style scoped>
#firebaseui-auth-container{
    margin-top: 20px;
    margin-bottom: 50px;
}

#pagecontent{
    height:100px;
    font-size: larger;
    font-weight: bolder;
    text-align: center;
}

#mainHead{
    width: 100%;
    text-align: center;
    background-color: white;
}

#loginContainer{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>