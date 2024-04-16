<template>
  <nav id="top-bar">
    <div id="logo">
      <img src="@/assets/HealthGuru.png" alt="HealthGuru" class="logo"/>
      <h1 id="website-name">HealthGuru</h1>
    </div>
    <div id="search-and-options">
      <div id="searchBar">
        <input type="text" v-model="input" placeholder="Search..." class="search-input"/>
      </div>
      <Options class="options" v-if="user" @logged-out="handleLogout"/>
    </div>
  </nav>
</template>

<script>
import Options from  "@/components/topbar/Options.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Topbar",

  components: {
    Options
  },

  data() {
      return {
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
    handleLogout() {
      this.user = false;
      this.$forceUpdate();
    }
  }
}
</script>

<style>
  #logo{
    display:flex;
    align-items: center;
    margin-left: 120px;
  }

  .search-input {
    border-radius: 20px;
    border-width: 0px;
    margin: 0px 20px;
    padding: 5px 50px 5px 10px;
  }

  #searchBar{
    display: flex;
    align-items: center;
    left: 80%;
  }

  #search-and-options {
    display: flex;
  }

  #top-bar {
    display: flex;
    position: fixed;
    background-color: #335076;
    color: white;
    height: 80px;
    width: 100%;
    justify-content: space-between;
  }  
</style>