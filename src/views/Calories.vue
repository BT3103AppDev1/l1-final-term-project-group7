<template>
<h1>Calories Page</h1>
<div class="calorie-goal">
  <CalorieGoalDoughnut :net-calories="netCalories" />
</div>
<div class="calorie-input">
  <CalorieInput @update-calories="updateCalories" />
</div>
<div class="net-calorie-chart">
  <NetCalorieChart :consumed="consumed" :burnt="burnt" :net-calories="netCalories" />
</div>
</template>
  
<script>
import CalorieGoalDoughnut from '@/components/calories/CalorieGoal.vue'
import CalorieInput from '@/components/calories/CalorieInput.vue'
import NetCalorieChart from '@/components/calories/NetCalorieChart.vue'

export default {
  name: 'App',
  components: {
    CalorieGoalDoughnut,
    CalorieInput,
    NetCalorieChart
  },
  data() {
    return {
      consumed: 0,
      burnt: 0,
      netCalories: 0,
      refreshComp: 0
    }
  },
  methods: {
    updateCalories(calorieData) {
      this.consumed = calorieData.consumed;
      this.burnt = calorieData.burnt;
      this.netCalories = this.consumed - this.burnt;
    },

    change() {
      this.refreshComp += 1
    }
  }
}
</script>

<style scoped>
.CalorieInput {
  max-width: 50%;
}
</style>