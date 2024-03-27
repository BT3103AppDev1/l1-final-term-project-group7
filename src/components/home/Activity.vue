<template>
    <div class="activity-widget">
      <div class="title">
        <p>
            ACTIVITY PROGRESS
        </p>
      </div>
      <div class="stats">
        <div class="stat">
          <span class="label">STEPS: 89%</span>
          <span>13050 / 15000</span>
        </div>
        <div class="stat">
          <span class="label">DAILY EXERCISE: 75%</span>
          <span>40 / 60 MINUTES</span>
        </div>
        <div class="stat">
          <span class="label">TOTAL EXERCISES COMPLETED: 20%</span>
          <span>50 / 250</span>
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
                data: [20, 80], // Remaining percentage to complete the circle
                backgroundColor: ['rgba(0, 74, 173, 0.8)', 'rgba(0, 74, 173, 0.3)'],
                borderWidth: 0,
            }
          ],
          labels: [
            'Steps',
            'Daily Exercise',
            'Total Exercises Completed'
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
    background-color: #89939c;
    border-radius: 10px;
    padding: 20px;
    color: white;
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
    width: 100%; /* Ensure stats take full width of parent */
    padding-left: 30px; /* Adjust the padding to match your design */
    border-left: 1px solid rgba(255, 255, 255, 0.5); /* Separator line */
  }
  
  .stat {
    font-size: 1.2em; /* Increase the font size of stats */
    margin: 20px 0; /* Space between stat items */
  }
  
  .label {
    font-weight: bold;
    display: block; /* Make label a block to break line */
    color: #ffffff;
    margin-bottom: 5px; /* Space between label and numbers */
  }

  #activityWidget {
  max-width: 600px; /* Set a max-width to the doughnut chart for a smaller appearance */
  margin-right: 30px;
  margin-bottom: 5px;
  }
  
  /* Additional styling as needed */
  </style>
  