<template>
  <div class="container">
    <h1 id="routine-name">Routine Name</h1>
    <img class="routine-img" src="@/assets/LateralPulldown.webp" alt="Routine Image">
    <h2 id="intensity-level">Intensity Level: High</h2>
    <h2 id="duration">Duration: 45min</h2>
    <ul id="list-exercises">
      <li>Exercise 1</li>
      <li>Exercise 2</li>
      <li>Exercise 3</li>
    </ul>
  </div>
</template>
    
<script>
  
  export default {
    name: 'WorkoutContainer',
    components: {

    },
    data() {
      return {
        refreshComp: 0
      }
    },
    methods: {
      change() {
        this.refreshComp += 1
      }
    }
  }
</script>

<style scoped>
.container {
  background-color: #dfe2e7;
  border-radius: 15px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 25%;
}

.routine-img {
  width: 100%;
}

li {
  font-size: 1.5em;
}
</style>