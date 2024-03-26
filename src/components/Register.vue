<template>
    <div id="registerContainer">
      <h1 id="mainHead">Health Guru</h1>
      <h1 id="message">Create An Account</h1>
      <p><input type="text" placeholder="email" v-model="email" /></p>
      <p><input type="password" placeholder="password" v-model="password" /></p>
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <p><button @click="register">Submit</button></p>
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
            }
        })
    },

    methods: {
        register() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    console.log("Successfully registered!");
                    //this.$router.push('/');
                })
                .catch((error) => {
                    console.error(error.code);
                    switch(error.code) {
                        case "auth/email-already-in-use":
                            this.errorMessage = "Email is in use";
                            break;
                        case "auth/weak-password)":
                            this.errorMessage = "Password should have at least 6 characters";
                        default:
                            this.errorMessage = "Invalid email or password";
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
                    console.error(error.code);
                    switch(error.code) {
                        default:
                            this.errorMessage = "Invalid email or password";
                    }
                    this.$forceUpdate();
                });
        }
    }
}
</script>
<style scoped>
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

#registerContainer{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}

</style>