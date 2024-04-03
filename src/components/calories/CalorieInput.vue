<template>
    <div class="calories-input-widget">
      <div class="calories-input">
        <label for="meal-select" class="input-label">Calories Input</label>
        <div class="search-container">
          <img src="@/assets/Left-Icon.webp" alt="Search" class="search-icon">
          <input type="search" class="search-input" placeholder="Select meals..." v-model="selectedMeal">
        </div>
        <!-- Dropdown placeholder -->
        <ul>
          <li v-for="meal in meals" :key="meal.id" @click="addMeal(meal)">
            {{ meal.name }} ({{ meal.calories }} kcal)
          </li>
        </ul>
        <div class="selected-items">
          <div v-for="(meal, index) in selectedMeals" :key="index" class="selected-item">
            {{ meal.name }}: {{ meal.calories }} kcal
          </div>
          <div class="total-calories">Total: {{ totalInputCalories }} kcal</div>
        </div>
      </div>
  
      <div class="calories-burnt">
        <label for="workout-select" class="input-label">Calories Burnt</label>
        <div class="search-container">
          <img src="@/assets/Left-Icon.webp" alt="Search" class="search-icon">
          <input type="search" class="search-input" placeholder="Select workouts..." v-model="selectedWorkout">
        </div>
        <!-- Dropdown placeholder -->
        <ul>
          <li v-for="workout in workouts" :key="workout.id" @click="addWorkout(workout)">
            {{ workout.name }} (-{{ workout.calories }} kcal)
          </li>
        </ul>
        <div class="selected-items">
          <div v-for="(workout, index) in selectedWorkouts" :key="index" class="selected-item">
            {{ workout.name }}: -{{ workout.calories }} kcal
          </div>
          <div class="total-calories">Total: {{ totalBurntCalories }} kcal</div>
        </div>
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
          // Placeholder data
          { id: 1, name: 'Chicken Salad', calories: 350 },
          { id: 2, name: 'Beef Steak', calories: 450 },
          // Add more meals
        ],
        workouts: [
          // Placeholder data
          { id: 1, name: 'Running', calories: 300 },
          { id: 2, name: 'Swimming', calories: 400 },
          // Add more workouts
        ]
      };
    },
    methods: {
      addMeal(meal) {
        this.selectedMeals.push(meal);
      },
      addWorkout(workout) {
        this.selectedWorkouts.push(workout);
      },
    },
    computed: {
      totalInputCalories() {
        return this.selectedMeals.reduce((total, meal) => total + meal.calories, 0);
      },
      totalBurntCalories() {
        return this.selectedWorkouts.reduce((total, workout) => total - workout.calories, 0);
      }
    }
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
    font-size: 2em; /* Example font size change */
    color: #1c43c2; /* Example color change */
    margin-bottom: 0.5rem; /* Space below the label */
    display: block; /* Ensures the label takes up the full width */
  }

  .search-container { 
   position: relative; /* Establishes a positioning context for search icon */
   padding: 2%; 
  }

  .search-input {
    border: 2px solid #1c43c2; 
    border-radius: 20px; 
    padding: 10px 20px 10px 40px; /* Left padding to make room for the icon */
    width: calc(100% - 20px); /* Adjust width to account for icon width */
    outline: none; /* Removes the default focus outline */
  }

  .search-icon {
    position: absolute; 
    left: 10px; 
    top: 50%; 
    transform: translateY(-50%); 
    width: 20px; 
    height: 20px; 
    pointer-events: none; /* Allows click events to go through the icon to the input */
  }

  ul {
  list-style: none; /* Removes the default list bullets */
  padding: 0; /* Removes the default padding */
  margin: 0; /* Aligns the list to the container */
}

  li {
    display: flex; /* Makes it possible to align items in a row */
    align-items: center; /* Aligns items vertically */
    padding: 0.5rem 2rem; /* Padding for each list item */
    margin: 8px 0; /* Margin around each list item */
    background-color: #ffffff; /* Background color for each list item */
    border-radius: 10px; /* Rounded corners for each list item */
    position: relative; /* Establishes a positioning context for pseudo-elements */
  }

  ul li::before {
    content: ''; /* Necessary for a pseudo-element */
    width: 8px; /* Width of the bullet point */
    height: 8px; /* Height of the bullet point */
    background-color: #000000; /* Bullet point color */
    border-radius: 50%; /* Makes it circular */
    position: absolute; /* Positions it relative to the list item */
    left: 10px; /* Distance from the left side of the list item */
  }

  ul li:last-child {
    border-bottom: none; /* Removes bottom border from the last item */
  }

  .selected-items {
    background-color: #fff;
    border-radius: 10px;
    margin-top: 1rem;
    padding: 1rem;
  }
  
  .total-calories { 
    padding-top: 1rem;
    font-weight: bold;
  }
  </style>
  