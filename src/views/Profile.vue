<template>
    <div>
        <div><h3><strong>This is the profile page</strong></h3></div>
        <div>
            <p> 
            Name: <strong>{{ user.displayName }}</strong><br>
            Email:<strong>{{ user.email }}</strong><br>
            Uid:<strong>{{ user.uid }}</strong><br>
            </p>
        </div>
    </div>
</template>
<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '@/firebase'; 

const auth = getAuth(firebaseApp);
const user = auth.currentUser;
</script>