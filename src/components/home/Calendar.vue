  <template>
    <div class="calendar-widget">
      <div class="day" v-for="workout in workouts" :key="workout.id">
        <div class="date">{{ workout.date }}</div>
        <div class="activity" v-if="workout.activity">{{ workout.activity }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'calendarWidget',
    data() {
      return {
        workouts: [
          { id: 1, date: 'TODAY, 23 MAR', activity: 'PUSH WORKOUT' },
          { id: 2, date: 'TOMORROW 24 MAR', activity: 'PULL WORKOUT' },
          { id: 3, date: 'MONDAY,  25 MAR', activity: 'RUN' },
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  .calendar-widget {
    height: 80%;
    background-color: #404b5a;
    border-radius: 15px; 
    padding: 20px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  }
  
  .day {
    background-color: #323c4a; 
    border-radius: 10px; 
    margin-bottom: 10px; 
    padding: 10px 15px; 
    color: white; 
    font-size: 0.9em; 
  }
  
  .date {
    font-weight: bold;
  }
  
  .activity {
    background-color: #2d89ef;
    border-radius: 8px; 
    padding: 5px 12px; 
    margin-top: 5px; 
    max-width: 80%; 
    font-weight: 550
  }
  </style>
  