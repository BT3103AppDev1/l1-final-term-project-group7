<template>
    <div class="calorieGoalWidget">
      <img src="@/assets/Calories-Icon.png" alt="Target Icon" class="goalIcon" />
      <div class="goalInfo">
        <div class="calories">
          <span>CURRENT CALORIE GOAL: </span>
          <span class="calories-value">1875 / 2500</span>
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
    data() {
      return {
        progress: {
          datasets: [
            {
                label: 'Calories',
                data: [75, 25], // Remaining percentage to complete the circle
                backgroundColor: ['rgba(126, 217, 87, 1)', 'rgba(126, 217, 87, 0.3)'], 
                borderWidth: 0, // No borders
            }
          ]
        },
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
  max-width: 70%;
  max-height: 15vh;
  justify-content: space-around;
}

.goalInfo {
  display: flex;
  align-items: center;
  flex-grow: 1;
  /* border: solid; */
}

.goalIcon {
  width: 10vh; /* Adjust as necessary */
  margin-right: 6vh;
  margin-left: 3vh;
}

.calories {
  font-size: 2em; 
  font-weight: bold;
}

.calories-value {
  display: block;
  color: #76c442; /* Adjust color to match the progress ring */
}

#CalorieGoalDoughnut {
  max-width: 40vh; /*Set a max-width to the doughnut chart for a smaller appearance */
  max-height: 50vh;
  margin-right: 5vh;
  margin-bottom: 5px;
  flex-grow: 1;
  /* border:solid red; */
}
  </style>
  