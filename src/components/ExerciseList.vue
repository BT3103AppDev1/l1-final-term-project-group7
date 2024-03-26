<template>
  <div class="exercise-list-container">
    <h1>{{ muscle }}</h1>
    <ul>
      <li v-for="exercise in exercises[muscle]" 
          :key="exercise.name" 
          @click="selectExercise(exercise)"
          :class="{ selected: selectedExercise === exercise }">
        {{ exercise.name }}
      </li>
    </ul>
    <div v-if="selectedExercise">
      <h2>{{ selectedExercise.name }}</h2>
      <p>{{ selectedExercise.description }}</p>
      <ol>
        <li v-for="(step, index) in selectedExercise.steps" :key="index">{{ step }}</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExerciseList',
  props: ['muscle'],
  data() {
    return {
      exercises: {
        Arms: [
          { name: 'Bicep Curl', description: 'Description for Bicep Curl', steps: ['Step 1', 'Step 2', 'Step 3'] },
          { name: 'Tricep Row', description: 'Description for Tricep Row', steps: ['Step 1', 'Step 2', 'Step 3'] }
        ],
        Back: [
          { name: 'Lat Pulldown', description: 'Description for Lat Pulldown', steps: ['Step 1', 'Step 2', 'Step 3'] },
          { name: 'Bentover Rows', description: 'Description for Bentover Rows', steps: ['Step 1', 'Step 2', 'Step 3'] }
        ],
        Legs: [
          { name: 'Squats', description: 'Description for Squats', steps: ['Step 1', 'Step 2', 'Step 3'] },
          { name: 'Lunges', description: 'Description for Lunges', steps: ['Step 1', 'Step 2', 'Step 3'] }
        ]
      },
      selectedExercise: ""
    };
  },
  methods: {
    selectExercise(exercise) {
      if (this.selectedExercise === exercise) {
        this.selectedExercise = ""; // Hide exercise description if clicked again
      } else {
        this.selectedExercise = exercise; // Show exercise description if not already selected
        this.$emit('exerciseSelected', this.selectedExercise)
      }
    }
  },
};
</script>

<style scoped>
.exercise-list-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.exercise-list-container ul {
  list-style-type: none;
  padding: 0;
}

.exercise-list-container li {
  cursor: pointer;
}

.selected {
  text-decoration: underline;
}
</style>