<template>
    <div class="calorieGoalWidget">
      <img src="@/assets/Target-Icon.png" alt="Target Icon" class="goalIcon" />
      <div class="goalInfo">
        <div class="calories">
          <span>CURRENT CALORIE GOAL: </span>
          <span :class="['calories-value',{'goal-exceeded': goalExceeded }]">{{ netCalories.toFixed(1) }} / 2500</span>
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
      goalExceeded() {
        return this.netCalories > 2500;
      },
      progress() {
        const remainingCalories =  Math.max(2500 - this.netCalories, 0);
        return {
          datasets: [
            {
              label: 'Calories',
              data: [this.netCalories, remainingCalories > 0 ? remainingCalories : 0],
              backgroundColor: [this.goalExceeded ? 'rgb(221, 34, 78, 0.8)' : 'rgba(126, 217, 87, 1)', 'rgba(126, 217, 87, 0.3)'], 
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
  padding: 1%;
  color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 55%; 
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
  margin-right: 2vh;
}

.calories {
  font-size: 1.8em;
  font-weight: bold;
  white-space: wrap; /* Keeps the text on a single line */
  max-width: 100%; /* Ensures the text does not exceed its container */
  font-size: 1.5vw;
}

.calories-value {
  color: #76c442; /* Adjust color to match the progress ring */
  display: block; /* Makes the element a block to occupy its own line */
}

.goal-exceeded {
  color: rgb(221, 34, 78, 0.8); /* Ensures this color overrides other styles */
}

#CalorieGoalDoughnut {
  max-width: 30vh; /* Adjust width of the doughnut */
  max-height: 35vh; /* Adjust height of the doughnut */
  flex-grow: 1; /* Prevents the doughnut from growing */
  flex-shrink: 0; /* Prevents the doughnut from shrinking */
}

</style>
  