<template>
    <div class="achievements">
      <h1 class="achievements-heading">Achievements</h1>
      <div class="up-next">
        Up Next:
      </div>
      <div class="progress-container">
        <div class="progress-text">11.0% of achievements unlocked!</div>
        <div class="progress-bar"></div>
      </div>
      <div class="achievement" v-for="(achievement, index) in achievements" :key="index">
        <div class="achievement-item">
          <div class="achievement-title">{{ achievement.title }}</div>
          <div class="achievement-description">{{ achievement.description }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Achievements',
    data() {
      return {
        achievements: [
          { title: 'First Steps:', description: 'Complete your first workout' },
          { title: 'Consistency Champ:', description: 'Complete 5 workouts in a week' },
          { title: 'Social Butterfly:', description: 'Make 10 friends on HeathGuru' },
          { title: 'Goal Getter:', description: 'Set and achieve your first calorie goal' },
          { title: 'Nutrition Novice:', description: 'Complete your first dietary challenge' }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .achievements {
    text-align: center;
    background-color: #335076;
    border-radius: 20px;
    padding: 20px;
  }
  
  .achievements-heading,
  .up-next {
    color: #ffffff;
    margin-bottom: 10px;
  }
  
  .up-next {
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Align "Up Next" to the left */
    font-weight: bold;
  }
  
  .progress-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  
  .progress-bar {
    height: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    width: 11%;
    margin-top: 5px;
  }
  
  .progress-text {
    font-size: 0.9em;
    color: #ffffff;
    white-space: nowrap;
    margin-right: 5px;
  }
  
  .achievement {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .achievement-item {
    display: flex;
    align-items: center;
  }
  
  .achievement-title {
    font-weight: bold;
    text-align: left;
  }
  
  .achievement-description {
    font-size: 0.9em;
    text-align: left;
    margin-left: 5px;
  }
  </style>
  