<template>
  <div class="calorieGoalWidget">
    <div id="mainContainer">
      <!--Target Icon-->
      <img id="target-icon" src="@/assets/Target-Icon.png" alt="Target Icon" class="goalIcon" />
      <!--Calorie Goal Info-->
      <div class="goalInfo">
        <div class="calories">
          <span>CURRENT CALORIE GOAL: </span>
          <span :class="['calories-value',{'goal-exceeded': goalExceeded }]">{{ netCalories.toFixed(1) }} / {{ userCalorieGoal }}</span>
        </div>
      <!--Calorie Goal Doughnut-->
      </div>
      <Doughnut 
        id="CalorieGoalDoughnut"
        :data="progress" 
        :options="options" 
      />
      <!--Edit Calorie Goal-->
      <img src="@/assets/Edit-Icon.png" alt="Edit Goal" class="edit-goal-icon" @click="showEditGoalPopup" />
    </div>

    <div v-if="showEditPopup" class="overlay">
      <div class="popup">
      <h2>Edit Calorie Goal</h2>
      <form @submit.prevent="submitNewGoal">
        <label for="newGoal">Enter new calorie goal:</label>
        <input type="number" id="newGoal" v-model.number="newCalorieGoal" placeholder="">
        <div class="popup-buttons">
          <button @click="updateCalorieGoal">Update Goal</button>
          <button @click="showEditGoalPopup">Cancel</button>
        </div>
      </form>
      </div>
    </div>
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
  position: relative;
}

#mainContainer {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px;
}

#target-icon {
  height: 64px;
}

canvas {
  width: 124px !important;
  height: 124px !important;
}

.calories {
  font-size: 1.8em;
  font-weight: bold;
  white-space: nowrap; /* Keeps the text on a single line */
}

.calories-value {
  color: #76c442; /* Adjust color to match the progress ring */
  display: block; /* Makes the element a block to occupy its own line */
}


.edit-goal-icon {
  cursor: pointer;
  height: 2rem;
  width: 2rem; 
  position: absolute; /* Absolute positioning within the icon container */
  top: 0.5rem; 
  right: 0.5rem; 
}

.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 2; /* Higher z-index to be above the overlay */
  color: black;
}

label {
  margin-right: 5px; /* Add margin for spacing */
}

input[type="number"] {
  flex: 1; /* Take up remaining space */
  margin-bottom: 10px; /* Space before the next row */
  border-radius: 20px;
  border-width: 1px;
  padding: 0px 5px; 
}

button {
  margin-top: 1em;
  display: flex;
  justify-content: center; /* Centers buttons horizontally */
  gap: 10px; /* Optional: adds space between the buttons */
  border-radius: 20px;
  border-width: 1px;
}
</style>
  