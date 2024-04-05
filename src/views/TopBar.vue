<template>
    <nav id="top-bar">
        <div id="logo">
          <img src="@/assets/HealthGuru.png" alt="HealthGuru" class="logo"/>
          <h1 id="website-name">HealthGuru</h1>
        </div>
        <div id="searchBar">
          <input type="text" v-model="input" placeholder="Search..." class="search-input"/>
        </div>
        <Options/>
    </nav>
</template>

<script>
import Options from  "@/components/topbar/Options.vue"

export default {
  name: "Topbar",

  components: {
    Options
  },
}
</script>

<style>
  #logo{
    display:flex;
    align-items: center;
  }

  #searchBar{
    display: flex;
    align-items: center;
    left: 80%;
    margin-left: 950px;
  }

  #top-bar {
    display: flex;
    position: fixed;
    background-color: #335076;
    color: white;
    padding-left: 120px;
    height: 80px;
    width: 100%;
    justify-content: flex;
  }

  .Options {
    margin-left: 30px;
  }
</style>
