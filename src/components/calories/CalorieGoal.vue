<template>
    <div class="calorieGoalWidget">
      <img src="@/assets/Target-Icon.png" alt="Target Icon" class="goalIcon" />
      <div class="goalInfo">
        <div class="calories">
          <span>CURRENT CALORIE GOAL: </span>
          <span class="calories-value">{{ netCalories }} / 2500</span>
        </div>
      </div>
        <Doughnut 
          id="CalorieGoalDoughnut"
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
    name: 'CalorieGoalDoughnut',

    components: {
      Doughnut
    },

    props: {
      netCalories: {
        type: Number,
        default: 0
      },

    },

    computed: {
      progress() {
        const remainingCalories = 2500 - this.netCalories;
        return {
          datasets: [
            {
              label: 'Calories',
              data: [this.netCalories, remainingCalories],
              backgroundColor: ['rgba(126, 217, 87, 1)', 'rgba(126, 217, 87, 0.3)'], 
              borderWidth: 0,
            }
          ]
        };
      }
    },

    data() {
      return {
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 100, // Increase this number to make the chart more like a ring
          legend: {
            display: false // Hides the legend
          },
        }
      };
    }
  };
  </script>
  
  <style scoped>
.calorieGoalWidget {
  background-color: #404b5a;
  border-radius: 15px;
  padding: 20px;
  color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 65%; /* Ensuring the widget does not exceed the parent width */
  max-height: 15vh;
}

.goalInfo {
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 1; /* Allows this element to shrink if necessary */
  max-width: calc(100% - 50vh); /* Adjust based on the size of the doughnut and icon */
}

.goalIcon {
  width: 10vh;
  margin-right: 2vh; /* Reduced margin to save space */
}

.calories, .calories-value {
  font-size: 2em;
  font-weight: bold;
  white-space: nowrap; /* Keeps the text on a single line */
  overflow: hidden; /* Prevents text from spilling over */
  text-overflow: ellipsis; /* Adds an ellipsis to indicate hidden overflow text */
  max-width: 100%; /* Ensures the text does not exceed its container */
}

.calories-value {
  color: #76c442; /* Adjust color to match the progress ring */
  display: block; /* Makes the element a block to occupy its own line */
}

#CalorieGoalDoughnut {
  max-width: 30vh; /* Adjust width of the doughnut */
  max-height: 30vh; /* Adjust height of the doughnut */
  margin-right: 2vh; /* Reduced margin to save space */
  flex-grow: 0; /* Prevents the doughnut from growing */
  flex-shrink: 0; /* Prevents the doughnut from shrinking */
}
  </style>
  