<template>
    <div class="achievements">
      <h1 class="achievements-heading">Achievements</h1>
      <div class="up-next">Up Next:</div>
      <div class="progress-container">
        <div class="progress-bar"></div>
        <div class="progress-text">11.0% of achievements unlocked!</div>
      </div>
      <div class="achievement" v-for="(achievement, index) in achievements" :key="index">
        <div class="achievement-title">{{ achievement.title }}</div>
        <div class="achievement-description">{{ achievement.description }}</div>
      </div>
    </div>
  </template>

<script>
export default {
    name: 'Achievements',
    data() {
        return {
            achievements: [
                {title: 'First Steps', description: 'Complete your first workout'},
                {title: 'Consistency Champ', description: 'Complete 5 workouts in a week'},
                {title: 'Social Butterfly', description: 'Make 10 friends on HeathGuru'},
                {title: 'Goal Getter', description: 'Set and achieve your first calorie goal'},
                {title: 'Nutrition Novice', description: 'Complete your first dietary challenge'}
            ]
        };
    }
};
</script>

<style scoped>
.achievements {
  text-align: center;
}

.achievements-heading {
  margin-bottom: 10px;
}

.up-next {
  text-align: left;
}

.progress-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
}

.progress-bar {
  width: 70%; /* Adjust as needed based on progress */
  height: 20px;
  background-color: #2ecc71; /* Green color */
  border-radius: 10px;
}

.progress-text {
  font-size: 0.9em;
}

.achievement {
  background-color: #3498db; /* Blue color */
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

.achievement-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.achievement-description {
  font-size: 0.9em;
}
</style>