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
      <!-- <a href="#" class="clickable-img-wrapper">
        <img src="@/assets/Left-Icon.webp" alt="leftIcon" class="arrows" id="left">
      </a> -->
      <div id="img-and-desc">
        <p>Difficulty: {{ this.$capitalizeFirstLetter(exerciseDifficulty) }}<br>
          Type: {{ this.$capitalizeFirstLetter(exerciseType) }}
        </p>
        <div class="youtube-link-container">
          <a :href="youtubeLink" target="_blank">Video Demonstration</a>
        </div>
        <div id="description">
          <ul>
            <li v-for="(step, index) in exerciseSteps.split('.').filter(step => step.trim())" :key="index">
              {{ step.trim() }}.
            </li>
          </ul>
        </div>
      </div>
      <!-- <a href="#" class="clickable-img-wrapper">
        <img src="@/assets/Right-Icon.webp" alt="rightIcon" class="arrows" id="right">
      </a> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'workoutInfo',
  props: {
    showWorkout: Boolean,
    exerciseName: String,
    exerciseDifficulty: String,
    exerciseType: String,
    exerciseSteps: String, // Adjusted to accept a string
  },
  data() {
    return {
      youtubeLink: '', 
    };
  },
  methods: {
    hideWorkoutInfo() {
      this.$emit('close');
      console.log("Hiding workout info");
    },
    async fetchYoutubeLink(searchQuery) {
      const options = {
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/search',
        params: {
          q: searchQuery,
          part: 'snippet,id',
          regionCode: 'US',
          maxResults: '1', // Fetch only the first result
          order: 'date'
        },
        headers: {
          'X-RapidAPI-Key': 'ab77cb18d8msha789c05491d526cp1e5bf9jsna3322edfdf9a',
          'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        if (response.data.items.length > 0) {
          const videoId = response.data.items[0].id.videoId;
          this.youtubeLink = `https://www.youtube.com/watch?v=${videoId}`; 
        }
      } catch (error) {
        console.error('Error fetching YouTube link:', error);
      }
    }
  },
  created() {
    this.fetchYoutubeLink(this.exerciseName);
    console.log("fetched youtube link")
  }
};
</script>

<style scoped>
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

.clickable-img-wrapper {
  display: inline-block;
  transition: transform .2s; /* Animation */
}

.clickable-img-wrapper:hover {
  transform: scale(1.5);
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

#description {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.youtube-link-container a {
  text-decoration: none;
  font-weight: bold;
}

.youtube-link-container a:hover {
  text-decoration: underline;
}
</style>
