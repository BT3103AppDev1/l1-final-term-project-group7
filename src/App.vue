<template>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/workouts">Workouts</router-link> |
      <router-link to="/routines">Routines</router-link> |
      <router-link to="/meals">Meals</router-link> |
      <router-link to="/calories">Calories</router-link> |
      <router-link to="/social">Social</router-link> |
      <router-link to="/about">About</router-link> 
    </div>
    <router-view/>
  </template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

#nav {
  padding: 30px;
  background-color: #5B789F;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: white;
  background-color: #929EAF;
  padding: 30px;
}
</style>
