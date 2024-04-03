<template>
  <div class="workout-info" v-if="showWorkout">
    <div id="title-row">
      <h1 id="workout-title">{{ exerciseName }}</h1>
      <a href="#" class="clickable-img-wrapper">
        <!-- Consider dynamically changing icons based on user actions like liking an exercise -->
        <img src="@/assets/Like-Icon.webp" alt="likeIcon" class="icon">
      </a>
      <a @click.prevent="hideWorkoutInfo" class="clickable-img-wrapper">
        <img src="@/assets/Cross-Icon.png" alt="crossButton" class="icon">
      </a>
    </div>
    <div class="exercise-content">
      <a href="#" class="clickable-img-wrapper">
        <img src="@/assets/Left-Icon.webp" alt="leftIcon" class="arrows" id="left">
      </a>
      <div id="img-and-desc">
        <div class="exercise">
          <!-- You might want to set a default image or handle dynamically -->
          <img :src="exerciseImage" alt="Exercise image">
        </div>
        <div id="description">
          <!-- Assuming instructions are a string that you'll split into steps -->
          <ul>
            <li v-for="(step, index) in exerciseSteps.split('.').filter(step => step.trim())" :key="index">
              {{ step.trim() }}.
            </li>
          </ul>
        </div>
      </div>
      <a href="#" class="clickable-img-wrapper">
        <img src="@/assets/Right-Icon.webp" alt="rightIcon" class="arrows" id="right">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'workoutInfo',
  props: {
    showWorkout: Boolean,
    exerciseName: String,
    exerciseImage: String,
    exerciseSteps: String, // Adjusted to accept a string
  },
  methods: {
    hideWorkoutInfo() {
      this.$emit('close');
      console.log("Hiding workout info");
    },
  },
};
</script>

<style scoped>
.clickable-img-wrapper {
  display: inline-block;
  transition: transform .2s; /* Animation */
}

.clickable-img-wrapper:hover {
  transform: scale(1.5);
}

a {
  padding: 0;
}

.arrows {
  height: 64px;
  margin: 10px;
}

.icon {
  margin: 0px 15px;
}

#title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
}

#workout-title {
  margin: 5px;
  flex-grow: 1;
}

.exercise-content {
  display: flex;
  align-items: center;
}

#img-and-desc {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
}

.exercise {
  display: flex;
  justify-content: center;
}

.exercise img {
  width: auto;
  max-height: 40vh;
}

#description {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.workout-info {
  background-color: #dfe2e7;
  border-radius: 15px;
  margin: 50px auto;
  padding: 20px 20px 0px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 70vw;
  height: 60vh;
  overflow-y: scroll;
}
</style>
