<template>
    <div>
      <div class="container">

        <div class="topContainer">
          <h1>{{ mealName }}</h1>
          <div class="buttonsContainer">
            <button @click.prevent="closeRecipe" v-if="!showList">close</button>
            <button @click.prevent="hidePopup" class="clickable-img-wrapper">
              <img src="@/assets/Cross-Icon.png" alt="crossButton" class="icon">
            </button>
          </div>
        </div> <hr>

        <div class="contentContainer">
          <ul v-if="showList" class="mealItems">
            <li v-for="meal in meals">
              <a href="#" @click="selectRecipe(meal)">{{ meal["strMeal"] }}</a>
            </li>
          </ul>
          <div class="recipeContainer" v-if="!showList">
            <h2>{{ selectedRecipe['strMeal'] }}</h2>
            <img :src="imageLink" alt="crossButton" class="food">
            <h3>Ingredients</h3>
              <ul v-if="!showList" >
                <li class = ingredList v-for="ingredient in ingredients">
                  <p class = ingredList>{{ ingredient }} </p>
                </li>
              </ul>
            <h3>Instructions</h3>
            <pre >{{ selectedRecipe['strInstructions'] }}</pre>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'MealList',
    props: ['mealType'],
    data() {
        return {
          mealName: this.mealType,
          meals: [],
          selectedRecipe: {},
          imageLink: "",
          ingredients: [],
          showList : true,
        };
    },
  async mounted() {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + this.mealType);
      this.meals = response.data['meals'];
    },

    methods: {
    hidePopup() {
      // Emit an event to the parent component
      this.$emit('close');
      console.log("Hiding MealList");
    },
    async selectRecipe(meal) {
      var id = meal['idMeal'];
      this.imageLink = meal['strMealThumb'];
      this.showList = !this.showList;

      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
      this.selectedRecipe = response.data['meals'][0];

      for (let i = 1; i <= 20; i++) {
        var ingredientKey = "strIngredient" + i
        var measurementKey = "strMeasure" + i
        if (this.selectedRecipe[ingredientKey]) {
          var measuredIngredient = this.selectedRecipe[measurementKey] + " " + this.selectedRecipe[ingredientKey]
          this.ingredients.push(measuredIngredient)
        } else {
          break;
        }
      }
    },
    closeRecipe() {
      this.showList = !this.showList;
    }
  },
}
</script>

<style scoped>
.container {
  position:relative;
  background-color:pink;
  width: 500px;
  height: 500px;
  padding-left: 1em;
}
.topContainer {
  display:inline;
}
.contentContainer {
  height:75%;
  overflow: auto;
}
.buttonsContainer {
  position: absolute;
  top: 1%;
  right: 1%;
}
.clickable-img-wrapper {
  background-color: rgba(255, 255, 255, 0);
  border: none;
  transition: transform .2s; /* Animation */
}
pre {
    white-space: pre-wrap;
    font-size: medium;
}
.ingredList {
  margin: 0;
  padding: 0;
}
.food {
  display: block;
  margin-left:auto;
  margin-right: auto;
  width: 70%;
}
</style>