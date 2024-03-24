<template>
    <div id="app">
      <div id="top-bar">
        <img src="@/assets/HealthGuru.png" alt="HealthGuru" class="logo"/>
        <h1 id="website-name">HealthGuru</h1>
      </div>
      <div id="main">
        <div id="nav">
          <!-- Navigation links -->
          <router-link to="/">
            <img src="@/assets/Home-Icon.png" alt="Home Icon" class="icon"/>
            Home</router-link>
          <router-link to="/workouts">
            <img src="@/assets/Workouts-Icon.png" alt="Workouts Icon" class="icon"/>
            Workouts</router-link>
          <router-link to="/routines">
            <img src="@/assets/Routines-Icon.png" alt="Routines Icon" class="icon"/>
            Routines</router-link>
          <router-link to="/meals">
            <img src="@/assets/Meals-Icon.png" alt="Meals Icon" class="icon"/>
            Meals</router-link>
          <router-link to="/calories">
            <img src="@/assets/Calories-Icon.png" alt="Calories Icon" class="icon"/>
            Calories</router-link>
          <router-link to="/social">
            <img src="@/assets/Social-Icon.png" alt="Social Icon" class="icon"/>
            Social</router-link>
        </div>
        <div id="content">
            <router-view class="router-view"/>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>