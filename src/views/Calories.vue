<template>
  <div class="main-container">
    <div class="top-container">
      <div class="calorie-goal">
        <CalorieGoalDoughnut :net-calories="netCalories" />
      </div>
      <div class="input-data-pop-up">
        <InputDataPopup @recorded="updateCalories" />
      </div>
    </div>
    <div class="calories-container">
      <div class="calorie-input">
        <CalorieInput @update-calories="updateCalories" />
      </div>
      <div class="net-calorie-chart">
        <NetCalorieChart :consumed="consumed" :burnt="burnt" :net-calories="netCalories" />
      </div>
    </div>
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
.top-container {
  display: flex;
  gap: 50px;
  margin-top: 5%;
}

.input-data-pop-up{
  flex:30%;
  justify-content: center;
  align-items: center;
  /* border:solid; */
}

.calories-container {
  display: flex;
  gap: 50px;
  width: 100%;
  margin-top: 1%;
}

.net-calorie-chart {
  /* flex-grow: 1; */
  width: 40%;
}
</style>