<template>
    <div class="menu" @click="isOpen = !isOpen">
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path fill="#000000" fill-rule="evenodd" d="M18 5a1 1 0 100-2H2a1 1 0 000 2h16zm0 4a1 1 0 100-2H2a1 1 0 100 2h16zm1 3a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 5a1 1 0 100-2H2a1 1 0 100 2h16z"/>
      </svg>
      <transition name="fade" appear>
         <div class="sub-menu" v-if="isOpen">
            <div class="item">
              <router-link to="/profile">Profile</router-link>
            </div>
            <div class="item">
              <button @click="logOut">Log Out</button>
            </div>
          </div>
      </transition>
    </div>
</template>


<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default {
    name: 'Options',

    props: {
      user: Object,
    },

    data() {
      return {
        isOpen: false,
      }
    },

    methods: {
      logOut() {
        const auth = getAuth();
        const user = auth.currentUser;
        signOut(auth, user)
        this.$emit('logged-out');
        this.$router.push('/login')
      }
    },
}

</script>
<style scoped>
.item {
  padding: 20px 20px;
  border-bottom: 5px solid transparent;
  display: flex;
  transition: 0.4s;
  justify-content: center;
  height: 18px;
  width: 50px;

}
.menu {
  color: black;
  padding: 20px 20px;
  position: relative;
  text-align: center;
  border-bottom: 5px solid transparent;
  display: flex;
  transition: 0.4s;
  justify-content: center;
}
.menu svg {
    width: 20px;
}

.menu .sub-menu {
  position: absolute;
  white-space: nowrap;
  background-color: white;
  top: 105%;
  transform: translateX(-40%);
  width: max-content;
  border-radius: 0px 0px 16px 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); 
}
.fade-enter-active,
.fade-leave-active {
  transition: all .5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>