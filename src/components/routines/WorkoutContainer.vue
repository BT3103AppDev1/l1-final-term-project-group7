<template>
  <div class="container">
    <h1 id="routine-name">{{ routineName }}</h1>
    <!-- <img class="routine-img" :src="routineImage" alt="Routine Image"> -->
    <h2 id="duration">Duration: {{ totalDuration }} min</h2>
    <ul id="list-exercises">
      <li v-for="exercise in exercises" :key="exercise">{{ exercise }}</li>
    </ul>
  </div>
</template>
    
<script>
  
  export default {
    name: 'WorkoutContainer',
    props: {
      routineName: String,
      routineImage: String,
      routineDuration: String,
      exercises: {
        type: Array,
        // Provide a default value to ensure it's always an array
        default: () => ([]),
      },
    },
    computed: {
      totalDuration() {
        // Assuming each exercise takes 10 minutes
        return this.exercises.length * 10;
      },
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
  margin: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 25%;
}

#routine-name {
  margin: 0px;
}

.routine-img {
  width: 100%;
}

li {
  font-size: 1em;
}
</style>