<template>
  <div class="container" :class="containerIntensity.class">
    <div id="top-row">
      <h1 id="routine-name">{{ routineName }}</h1>
      <a @click="deleteRoutine" href="#" class="clickable-img-wrapper">
        <img id="delete-button" src="@/assets/Cross-Icon.png" alt="Delete Routine" class="icon">
      </a>
    </div>
    <!-- <img class="routine-img" :src="routineImage" alt="Routine Image"> -->
    <h2 id="intensity">Intensity: {{ containerIntensity.label }}</h2>
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
      default: () => ([]),
    },
  },
  computed: {
    containerIntensity() {
      let result = {
        class: '',
        label: ''
      };

      if (this.totalDuration <= 10) {
        result.class = 'low-intensity';
        result.label = 'Low';
      } else if (this.totalDuration <= 30) {
        result.class = 'medium-intensity';
        result.label = 'Medium';
      } else {
        result.class = 'high-intensity';
        result.label = 'High';
      }
      return result;
    },
    totalDuration() {
      return this.exercises.length * 10;
    }
  },
  data() {
    return {
      refreshComp: 0
    }
  },
  methods: {
    change() {
      this.refreshComp += 1
    },
    deleteRoutine() {
      this.$emit('delete-routine', this.routineName);
      console.log("routine delete event emitted");
    }
  }
}
</script>

<style scoped>
.container {
  border-radius: 15px;
  margin: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 25%;
}

.low-intensity {
  background-color: #7bbc7b; /* Green for low intensity */
}

.medium-intensity {
  background-color: #ffc272; /* Yellow for medium intensity */
}

.high-intensity {
  background-color: #f67d68; /* Red for high intensity */
}

#top-row {
  display: flex;
  justify-content: space-between;
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