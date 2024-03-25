<template>
  <div>
    <h3>{{ muscle }}</h3>
    <ul>
      <li v-for="exercise in exercises[muscle]" :key="exercise.name" @click="selectExercise(exercise)">
        {{ exercise.name }}
      </li>
    </ul>
    <div v-if="selectedExercise">
      <h4>{{ selectedExercise.name }}</h4>
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
        arms: [
          { name: 'Bicep Curl', description: 'Description for Bicep Curl', steps: ['Step 1', 'Step 2', 'Step 3'] },
          { name: 'Tricep Row', description: 'Description for Tricep Row', steps: ['Step 1', 'Step 2', 'Step 3'] }
        ],
        back: [
          { name: 'Lat Pulldown', description: 'Description for Lat Pulldown', steps: ['Step 1', 'Step 2', 'Step 3'] },
          { name: 'Bentover Rows', description: 'Description for Bentover Rows', steps: ['Step 1', 'Step 2', 'Step 3'] }
        ],
        legs: [
          { name: 'Squats', description: 'Description for Squats', steps: ['Step 1', 'Step 2', 'Step 3'] },
          { name: 'Lunges', description: 'Description for Lunges', steps: ['Step 1', 'Step 2', 'Step 3'] }
        ]
      },
      selectedExercise: null
    };
  },
  methods: {
    selectExercise(exercise) {
      this.selectedExercise = exercise;
    }
  },
  watch: {
    muscle() {
      this.selectedExercise = null; // Reset selected exercise when muscle changes
    }
  }
};
</script>