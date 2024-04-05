<template>
    <div class="menu-item" @click="isOpen = !isOpen">
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path fill="#000000" fill-rule="evenodd" d="M18 5a1 1 0 100-2H2a1 1 0 000 2h16zm0 4a1 1 0 100-2H2a1 1 0 100 2h16zm1 3a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 5a1 1 0 100-2H2a1 1 0 100 2h16z"/>
      </svg>
      <transition name="fade" appear>
         <div class="sub-menu" v-if="isOpen">
            <div class="menu-item">
              <router-link to="/profile">Profile</router-link>
            </div>
            <div class="item">
              <button v-if="user" @click="logOut">Log Out</button>
            </div>
          </div>
      </transition>
    </div>
</template>


<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default {
    name: 'Options',

    data() {
      return {
        isOpen: false,
        user: false,
      }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user;
        }
        })
    },

    methods: {
      logOut() {
        const auth = getAuth();
        const user = auth.currentUser;
        signOut(auth, user)
        this.$router.push('/login')
      }
    },
}

</script>
<style scoped>
.menu-item {
  color: black;
  padding: 20px 20px;
  position: relative;
  text-align: center;
  border-bottom: 5px solid transparent;
  display: flex;
  transition: 0.4s;
}
.menu-item svg {
    width: 20px;
}

.menu-item .sub-menu {
  position: absolute;
  background-color: white;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  border-radius: 0px 0px 16px 16px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.sub-menu {
  cursor: pointer;
}
</style>