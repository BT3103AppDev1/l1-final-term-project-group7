<template>
  <div class="exercise-list-container">
    <h1>{{ capitalizeFirstLetter(muscle) }}</h1>
    <p v-if="loading">Loading...</p>
    <ul v-else>
      <li v-for="exercise in exercises" :key="exercise.id" @click="selectExercise(exercise)">
        {{ exercise.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ExerciseList',
  props: {
    muscle: String,
    exercises: Array,
    loading: Boolean, // Ensure 'loading' is defined here
  }, // Receive `muscle` and `exercises` as props from the parent component
  methods: {
    selectExercise(exercise) {
      // Emit the selected exercise to the parent component when an exercise is clicked
      this.$emit('exerciseSelected', exercise);
    },
    capitalizeFirstLetter(string) {
      // Utility method to capitalize the first letter of the muscle name
      if (!string) return '';
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
};
</script>

<style scoped>
.exercise-list-container {
  background-color: white;
  padding: 0px 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  min-height: 100%;
  min-width: 250px;
}

.exercise-list-container ul {
  list-style-type: none;
  padding: 0;
}

.exercise-list-container li {
  cursor: pointer;
}

/* Style for the selected item if needed */
.selected {
  text-decoration: underline;
}

h1 {
  text-wrap: nowrap;
}
</style>
