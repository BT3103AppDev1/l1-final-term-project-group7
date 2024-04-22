<template>
    <div class="calorieGoalWidget">
      <!--Target Icon-->
      <img src="@/assets/Target-Icon.png" alt="Target Icon" class="goalIcon" />
      <!--Calorie Goal Info-->
      <div class="goalInfo">
        <div class="calories">
          <span>CURRENT CALORIE GOAL: </span>
          <span :class="['calories-value',{'goal-exceeded': goalExceeded }]">{{ netCalories.toFixed(1) }} / 2500</span>
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

      <div v-if="showEditPopup" class="overlay">
        <div class="popup">
        <h2>Edit Calorie Goal</h2>
        <form @submit.prevent="submitNewGoal">
          <label for="newGoal">Enter new calorie goal:</label>
          <input type="number" id="newGoal" v-model.number="newCalorieGoal" placeholder="Enter new calorie goal">
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
  import { ref } from 'vue';
  import { Doughnut } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
  import { db } from '@/firebase';
  import { doc, setDoc } from 'firebase/firestore';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';

  
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
        },
        showEditPopup: false,
        calorieGoalInput: null,
      };
    },
    methods: {
      showEditGoalPopup() {
        // Here you would handle syncing with Firestore
        console.log('New Calorie Goal:', this.calorieGoalInput);
        this.showEditPopup = !this.showEditPopup;
      },
      submitGoal() {
        // Here you would handle syncing with Firestore
        console.log('New Calorie Goal:', this.calorieGoalInput);
        // Assuming you want to hide the popup after submitting
        this.showEditPopup = false;
      }
    },

    setup() {
      const auth = getAuth();
      const showEditPopup = ref(false);
      const newCalorieGoal = ref('');

      const updateCalorieGoal = async () => {
        const user = auth.currentUser; 
        if (user) {
          const calorieGoalDocRef = doc(db, 'users', user.uid, 'CalorieGoal', 'CalorieGoal');
          try {
            // Write the new calorie goal to Firestore
            await setDoc(calorieGoalDocRef, { CalorieGoal: newCalorieGoal.value });
            console.log('Calorie goal updated successfully');
            
            // Close the popup and reset the input
            showEditPopup.value = false;
            newCalorieGoal.value = '';
          } catch (error) {
            console.error('Error updating calorie goal:', error);
          }
        } else {
          console.log('No user signed in');
        }
      };
      // Return reactive properties and methods
      return { showEditPopup, newCalorieGoal, updateCalorieGoal };
    }
  }
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
  max-width: 90%; 
  max-height: 15vh;
  position: relative;
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
  max-width: 30vh;
  max-height: 35vh; 
  flex-grow: 1; /* Prevents the doughnut from growing */
  flex-shrink: 0; /* Prevents the doughnut from shrinking */
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
  }

  .popup-buttons {
    margin-top: 1em;
    display: flex;
    justify-content: center; /* Centers buttons horizontally */
    gap: 10px; /* Optional: adds space between the buttons */
  }

  

</style>
  