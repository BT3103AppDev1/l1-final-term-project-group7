<template>
    <div id="registerContainer">
      <h1 id="mainHead">Health Guru</h1>
      <h1 id="message">Create An Account</h1>
      <p><input type="text" placeholder="email" v-model="email" /></p>
      <p><input type="password" placeholder="password" v-model="password" /></p>
      <p><button @click="register">Submit</button></p>
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

        const register = () => {
            firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
                .then(() => {
                    console.log("Successfully registered!");
                    router.push('/');
                })
                .catch((error) => {
                    console.error(error.code);
                    alert(error.message);
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
            register,
            signInWithGoogle,
        };
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