<template>
  <div>
    <MealType mealType = "Vegan" @mealSelected="selectMeal($event)"/>
    <MealType mealType = "Vegetarian" @mealSelected="selectMeal($event)"/>
    <MealType mealType = "Chicken" @mealSelected="selectMeal($event)"/>
    <MealType mealType = "Pasta" @mealSelected="selectMeal($event)"/>
    <MealType mealType = "Seafood" @mealSelected="selectMeal($event)"/>
    <FeaturedMeal :mealInfo = "randomMeal1"/>
    <FeaturedMeal :mealInfo = "randomMeal2"/>
    <MealList
      class="overlay"
      :mealType = this.selectedMealType
      v-if="showMeals"
      @close="showMeals = false"
    />
  </div>
</template>
  
<script>
import MealType from '@/components/meals/MealType.vue';
import MealList from '@/components/meals/MealList.vue';
import FeaturedMeal from '@/components/meals/FeaturedMeal.vue';
import axios from 'axios';

  export default {
    name: 'Meals',
    components: {
      MealType,
      MealList,
      FeaturedMeal,
    },
    data() {
      return {
        selectedMealType : "",
        showMeals: false,
        selectedRecipe : "",
        randomMeal1: {},
        randomMeal2: {},
      }
    },
    async mounted() {
      const response1 = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      response1.data['meals'][0]['strMeal'] = "Featured: " + response1.data['meals'][0]['strMeal'];
      this.randomMeal1 = response1.data['meals'][0];

      const response2 = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      response2.data['meals'][0]['strMeal'] = "Featured: " + response2.data['meals'][0]['strMeal'];
      this.randomMeal2 = response2.data['meals'][0];
    },
    methods: {
      selectMeal(mealType) {
        this.selectedMealType = mealType;
        this.showMeals = !this.showMeals;
      }
    }
  }
</script>

<style scoped>
.clickable {
    background-color: green;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s ease;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure popup is above content */
}
</style>