<template>
    <div>
        <div><h3><strong>This is the profile page</strong></h3></div>
        <div>
            <p>Username: <input v-model="username" placeholder="Enter username"  type="text" /></p>
            <p>Email: <strong>{{ email }}</strong></p>
            <p>Height (cm): <input v-model="height" placeholder="Enter height" type="text" /></p>
            <p>Weight (kg): <input v-model="weight" placeholder="Enter weight" type="text" /></p>
            <p>Birthday:<strong>{{ birthday }}</strong></p>
            <p><button @click="updateUserProfile">Save Changes</button></p>
        </div>
        <p id="errorMsg" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { db } from '@/firebase';
import firebaseApp  from '@/firebase.js'; 
import { collection, doc, setDoc, addDoc, getDoc} from 'firebase/firestore';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getVNodeBlockHelper } from '@vue/compiler-core';
export default {

    data() {
        return {
            email: '',
            username: '',
            weight: '',
            height: '',
            birthday: '',
            errorMessage: '',
            user: '',
            uid: ''
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
            this.uid = user.uid;
            console.log("uid", this.uid);
            this.username = user.displayName || '';
            this.email = user.email || '';
            console.log("username:", this.username)
            const docRef = doc(db, 'users', this.uid);
            this.fetchData(docRef);
        }
        })
    },

    methods: {
        
        async fetchData(docRef) {
            try {
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data())

                // check if document exists and is not missing
                if (docSnap.exists() && docSnap.data().userInfo) {
                    const userData = docSnap.data().userInfo
                    console.log("User data:" , userData)
                    this.weight = userData.weight,
                    this.height = userData.height,
                    this.birthday = userData.birthday
                    // username and email gotten in mounted
                } else {
                    console.log("cant find document or document exist but userinfo missing");
                    console.log("creating  new document");
                    await setDoc(docRef, {
                        userInfo: {
                            email: this.email,
                            username: this.username,
                            weight: this.weight,
                            height: this.height,
                            birthday: this.birthday
                        }
                    });
                    console.log("document updated");
                }
            } catch (error) {
                this.errorMessage = error.message;
            }
        },

        async updateUserProfile() {
            console.log('updating to uid:', this.uid);
            const docRef = doc(db, 'users', this.uid);
            console.log("docref", docRef);
            console.log("Current weight:", this.weight, "Type:", typeof this.weight);
            console.log("Current height:", this.height, "Type:", typeof this.height);
            console.log("this.user", this.user);
            try {
                console.log("calling updatedoc");
                await setDoc(docRef, {
                    userInfo: {
                        email: this.email,
                        username: this.username,
                        weight: this.weight,
                        height: this.height,
                        birthday: this.birthday
                    }
                });

                console.log("height and weight updated");
                // update displayName on auth side if changed
                if (this.user.displayName != this.username) {
                    console.log("updating displayname from", this.user.displayName);
                    console.log("updated displayname to", this.username);
                    await updateProfile(this.user, {
                        displayName: this.username
                    });
                    console.log("displayname updated")
                }
            } catch (error) {
                this.errorMessage = 'Failed to update profile' + error.Message;
            }
        }
    }

}
</script>