<template>
  <div>
    <div id="muscle-view">
      <div id="select-muscle">
        <SelectMuscle @muscleSelected="selectMuscle($event)" @exerciseList="updateExercises"/>
      </div>
      <div id="exercise-list">
        <ExerciseList :muscle="muscleGroup" :exercises="exercises"/>
      </div>
    </div>

    <div class="pop-up"> <!-- Note to Davy: use @exerciseSelected to listen to emits for selected exercise from ExerciseList.vue -->
      <p @click="change" id="displaySample" v-if="!showWorkoutInfo">Display Sample Workout</p>
      <transition name="fade">
        <!-- Listen for the close event -->
        <workoutInfo v-if="showWorkoutInfo" @close="showWorkoutInfo = false" />
      </transition>
    </div>

  </div>
</template>

<script>
import SelectMuscle from '@/components/workouts/SelectMuscle.vue';
import ExerciseList from '@/components/workouts/ExerciseList.vue';
import WorkoutInfo from '@/components/workouts/WorkoutInfo.vue';

export default {
  name: 'Workouts',
  components: {
    SelectMuscle,
    ExerciseList,
    WorkoutInfo
  },
  data() {
    return {
      muscleGroup: "",
      showWorkoutInfo: false,
      exercises: []
    };
  },
  methods: {
    selectMuscle(muscle) {
      this.muscleGroup = muscle;
    },
    updateExercises(exercises) {
      this.exercises = exercises; // Update the exercises data property
    },
    change() {
      this.showWorkoutInfo = !this.showWorkoutInfo;
    },
  }
};
</script>

<style scoped>  
  #muscle-view {
  display: flex;
  height: 70%;
  margin: 30px 0px;
  justify-content: center;
  overflow-x: visible; /* Enables horizontal scrolling */
  gap: 30px; /* Ensures a minimum gap of 30px between children */
}

  #select-muscle {  
    min-width: 60%;
  }

  #exercise-list {
  }

  #displaySample {
    cursor: pointer;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s ease;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>