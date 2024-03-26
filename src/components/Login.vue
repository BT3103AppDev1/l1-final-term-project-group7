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
import { useRouter } from "vue-router";
import firebase from "@/uifire.js"
import { getAuth } from 'firebase/auth';
const auth = getAuth()
  
export default {
    setup() {
        const email = ref("");
        const password = ref("");
        const router = useRouter();
        const errorMessage = ref("");

        const signIn = () => {
            firebase.auth().signInWithEmailAndPassword(email.value, password.value)
                .then(() => {
                console.log("Successfully signed in!");
                router.push('/');
                })
                .catch((error) => {
                    console.error(error.code);
                    switch(error.code) {
                        case "auth/invalid-email":
                            errorMessage.value = "Invalid email";
                            break;
                        case "auth/user-not-found":
                            errorMessage.value = "No user found";
                            break;
                        case "auth/wrong-password":
                            errorMessage.value = "Incorrect password";
                            break;
                        default:
                            errorMessage.value = "Incorrect email or password";
                    }
                });
        };

        const signInWithGoogle = () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    console.log(result.user);
                    router.push("/");
                })
                .catch((error) => {
                    console.error(error.code)
                    alert(error.message)
                });
        }


        return {
            email,
            password,
            signIn,
            signInWithGoogle,
            errorMessage,
        };
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