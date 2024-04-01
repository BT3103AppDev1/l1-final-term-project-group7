<template>
  <div>
    <h1>Workouts Page</h1>

    <SelectMuscle @muscleSelected="selectMuscle($event)"/>

    <ExerciseList :muscle="muscleGroup"/>

    <div class="container"> <!-- Note to Davy: use @exerciseSelected to listen to emits for selected exercise from ExerciseList.vue -->
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
      showWorkoutInfo: false
    };
  },
  methods: {
    selectMuscle(muscle) {
      this.muscleGroup = muscle
    },
    change() {
      this.showWorkoutInfo = !this.showWorkoutInfo;
    },
  }
};
</script>

<style scoped>  
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