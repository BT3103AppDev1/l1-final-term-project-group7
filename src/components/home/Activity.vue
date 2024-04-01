<template>
    <div class="activity-widget">
      <div class="title">
        <p>
            ACTIVITY PROGRESS
        </p>
      </div>
      <div class="stats">
        <div class="stat" id="steps">
          <span class="label">STEPS: 89%</span>
          <span>13050 / 15000</span>
        </div>
        <div class="stat" id="exercise_duration">
          <span class="label">DAILY EXERCISE: 75%</span>
          <span>40 / 60 MINUTES</span>
        </div>
        <div class="stat" id="exercises_completed">
          <span class="label" >TOTAL EXERCISES COMPLETED: 40%</span>
          <span>100 / 250</span>
        </div>
      </div>
      <Doughnut 
        id="activityWidget"
        :data="progress" 
        :options="options" />
    </div>
  </template>
  
  <script>
  import { Doughnut } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
  
  // Register the required components
  ChartJS.register(Title, Tooltip, Legend, ArcElement);
  
  export default {
    name: 'activityWidget',
    components: {
      Doughnut
    },
    data() {
      return {
        progress: {
          datasets: [
            {
                label: 'Steps',
                data: [89, 11], // Remaining percentage to complete the circle
                backgroundColor: ['rgba(255, 49, 98, 0.8)', 'rgba(255, 49, 98, 0.3)'], 
                borderWidth: 0, // No borders
            },
            {
                label: 'Daily Exercise',
                data: [75, 25], // Remaining percentage to complete the circle
                backgroundColor: ['rgba(126, 217, 87, 1)', 'rgba(126, 217, 87, 0.3)'], 
                borderWidth: 0,
            },
            {
                label: 'Total Exercises Completed',
                data: [40, 60], // Remaining percentage to complete the circle
                backgroundColor: ['rgba(45,137,239,0.8)', 'rgba(45,137,239,0.3)'],
                borderWidth: 0,
            }
          ]
        },
        options: {
          responsive: false,
          cutoutPercentage: 100, // Increase this number to make the chart more like a ring
          legend: {
            display: false // Hides the legend
          },
          // You can add more options to customize your chart
        }
      };
    }
  };
  </script>
  
  <style scoped>
  .activity-widget {
    background-color: #404b5a;
    border-radius: 10px;
    padding: 20px;
    color: whitesmoke;
    display: flex;
    justify-content: space-between; /*Add space between the stats and the doughnut */
    align-items: center;
    max-height: 80%;
  }

  .title {
    font-size: 1.3em; /* Larger font size for the title */
    font-weight: bold;
    margin-bottom: 20px; /* Space below the title */
    margin-right: 20px;
    margin-left: 10px
    }
    
  .stats {
    width: 100%; 
    padding-left: 30px; 
    border-left: 1px solid rgba(255, 255, 255, 0.5); /* Separator line */
  }
  
  .stat {
    font-size: 1.2em; /* Increase the font size of stats */
    margin: 20px 0; /* Space between stat items */
  }

  #steps {
    color: rgb(221, 34, 78);
    /* text-shadow:
    -0.5px -0.5px 0 #000,  
    0.5px -0.5px 0 #000,
    -0.5px  0.5px 0 #000,
    0.5px  0.5px 0 #000; */
  }

  #exercise_duration {
    color: rgb(122, 212, 83);
    /*text-shadow:
    -0.5px -0.5px 0 #000,  
    0.5px -0.5px 0 #000,
    -0.5px  0.5px 0 #000,
    0.5px  0.5px 0 #000; */
  }
  
  #exercises_completed {
    color: rgba(45,137,239,0.8);
    /* text-shadow:
    -0.5px -0.5px 0 #000,  
    0.5px -0.5px 0 #000,
    -0.5px  0.5px 0 #000,
    0.5px  0.5px 0 #000; */
  }

  .label {
    font-weight: bold;
    display: block; 
    margin-bottom: 5px; 
  }

  #activityWidget {
  max-width: 30vh; /* Set a max-width to the doughnut chart for a smaller appearance */
  max-height: 30vh;
  margin-right: 30px;
  margin-bottom: 5px;
  }

  </style>
  