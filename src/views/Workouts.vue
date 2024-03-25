<template>
  <div class="container">
    <p @click="change" id="displaySample" v-if="!showWorkoutInfo">Display Sample Workout</p>
    <transition name="fade">
      <!-- Listen for the close event -->
      <workoutInfo v-if="showWorkoutInfo" @close="showWorkoutInfo = false" />
    </transition>
  </div>
</template>

<script>
import WorkoutInfo from '@/components/WorkoutInfo.vue';

export default {
  name: 'Workouts',
  components: {
    WorkoutInfo
  },
  data() {
    return {
      showWorkoutInfo: false
    };
  },
  methods: {
    change() {
      this.showWorkoutInfo = !this.showWorkoutInfo;
    }
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