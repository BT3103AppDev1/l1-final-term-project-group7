<template>
  <div class="calories-input-widget">
    <!-- Calories Input -->
    <div class="calories-input">
      <label for="meal-select" class="input-label">Calories Input</label>
      <div class="search-container">
        <img src="@/assets/Search-Icon.png" alt="Search" class="search-icon"> <!-- replace with search icon-->
        <select v-model="selectedMeal" class="dropdown">
          <option disabled value="">Select meals...</option>
          <option v-for="meal in meals" :key="meal.id" :value="meal">
            {{ meal.name }} ({{ meal.calories }} kcal)
          </option>
        </select>
      </div>  
      <ul>
        <li v-for="(meal, index) in selectedMeals" :key="index" class="list-item">
          <span>{{ meal.name }}: {{ meal.calories }} kcal</span>
          <img src="@/assets/Cross-Icon.png" alt="Delete" class="delete-icon" @click="removeMeal(index)">
        </li>
      </ul>
      <div class="total-calories">Total: {{ totalInputCalories }} kcal</div>
    </div>

    <!-- Calories Burnt -->
    <div class="calories-burnt">
      <label for="workout-select" class="input-label">Calories Burnt</label>
      <div class="search-container">
        <img src="@/assets/Search-Icon.png" alt="Search" class="search-icon"> <!-- replace with search icon-->
        <select v-model="selectedWorkout" class="dropdown">
          <option disabled value="">Select workouts...</option>
          <option v-for="workout in workouts" :key="workout.id" :value="workout">
            {{ workout.name }} (-{{ workout.calories }} kcal)
          </option>
        </select>
      </div>
      <ul>
        <li v-for="(workout, index) in selectedWorkouts" :key="index" class="list-item">
          <span>{{ workout.name }}: -{{ workout.calories }} kcal </span>
          <img src="@/assets/Cross-Icon.png" alt="Delete" class="delete-icon" @click="removeWorkout(index)">
        </li>
      </ul>
      <div class="total-calories">Total: {{ totalBurntCalories }} kcal</div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: 'CalorieInput',
    data() {
      return {
        selectedMeal: '',
        selectedWorkout: '',
        selectedMeals: [],
        selectedWorkouts: [],
        meals: [
          // Placeholder data -- to fill with API
          { id: 1, name: 'Chicken Salad', calories: 350 },
          { id: 2, name: 'Beef Steak', calories: 450 },
          // Add more meals
        ],
        workouts: [
          // Placeholder data -- to fill with API
          { id: 1, name: 'Running', calories: 300 },
          { id: 2, name: 'Swimming', calories: 400 },
          // Add more workouts
        ]
      };
    },
    methods: {
      addSelectedItem(type) {
        if (type === 'meal' && this.selectedMeal) {
          this.selectedMeals.push(this.selectedMeal);
          this.selectedMeal = null; // Reset the selection
        } else if (type === 'workout' && this.selectedWorkout) {
          this.selectedWorkouts.push(this.selectedWorkout);
          this.selectedWorkout = null; // Reset the selection
        }
      },
      removeMeal(index) {
        this.selectedMeals.splice(index, 1);
      },
      removeWorkout(index) {
        this.selectedWorkouts.splice(index, 1);
      }
    },
    computed: {
      totalInputCalories() {
        return this.selectedMeals.reduce((total, meal) => total + meal.calories, 0);
      },
      totalBurntCalories() {
        return this.selectedWorkouts.reduce((total, workout) => total - workout.calories, 0);
      },
    },
    watch: {
      selectedMeal(newMeal) {
        if (newMeal) {
          this.addSelectedItem('meal');
        }
      },
      selectedWorkout(newWorkout) {
        if (newWorkout) {
          this.addSelectedItem('workout');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .calories-input-widget {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-radius: 10px;
    max-width: 70%;
  }
  
  .calories-input, .calories-burnt {
    width: 45%;
  }
  
  .input-label {
    font-weight: bold;
    font-size: 2em;
    color: #1c43c2; 
    margin-bottom: 0.5rem; 
    display: block; 
  }

  .search-container { 
   position: relative; /* Establishes a positioning context for search icon */
   padding: 2%; 
  }

  .dropdown {
    border: 2px solid #1c43c2; 
    border-radius: 20px; 
    padding: 10px 40px 10px 40px; /* Left padding to make room for the icon */
    width: calc(100% - 20px); /* Adjust width to account for icon width */
    outline: none; /* Removes the default focus outline */
    font-size: 1em;
  }

  .search-icon {
    position: absolute; 
    left: 25px; 
    top: 50%; 
    transform: translateY(-50%); 
    width: 20px; 
    height: 20px; 
    pointer-events: none; /* Allows click events to go through the icon to the input */
  }

  ul {
  list-style: none;
  padding: 0; 
  margin: 0;
}

  li {
    display: flex; 
    align-items: center; 
    padding: 0.5rem 2rem; 
    margin: 8px 0; 
    background-color: #ffffff; 
    border-radius: 10px; 
    position: relative; 
  }

  .list-item {
    display: flex; 
    justify-content: space-between; /* Arrange content and delete button on opposite ends */
    align-items: center; 
    padding: 0.5rem 2rem; 
    margin: 8px 0; 
    background-color: #ffffff; 
    border-radius: 10px; 
  }

  .delete-icon {
    cursor: pointer; /* Change cursor to pointer when hovering over the icon */
    width: 20px; /* Set width for the delete icon */
    height: 20px; /* Set height for the delete icon */
    margin-left: 10px
  }

  ul li::before {
    content: ''; 
    width: 8px;
    height: 8px; 
    background-color: #1c43c2; 
    border-radius: 50%; 
    position: absolute; /* Positions it relative to the list item */
    left: 10px; /* Distance from the left side of the list item */
  }

  ul li:last-child {
    border-bottom: none; /* Removes bottom border from the last item */
  }
  
  .total-calories { 
    padding-top: 1rem;
    font-weight: bold;
  }
  </style>
  