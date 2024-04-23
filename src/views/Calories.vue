<template>
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
</template>
  
  
<script>
import CalorieGoalDoughnut from '@/components/calories/CalorieGoal.vue'
import CalorieInput from '@/components/calories/CalorieInput.vue'
import NetCalorieChart from '@/components/calories/NetCalorieChart.vue'
import InputDataPopup from '@/components/calories/InputData.vue' 

export default {
  name: 'App',
  components: {
    CalorieGoalDoughnut,
    CalorieInput,
    NetCalorieChart,
    InputDataPopup
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
  align-items: center;
  margin-top: 5%;
  gap: 100px;
}

.calorie-goal {
  width: fit-content;
}

.input-data-pop-up{
  justify-content: center;
  align-items: center;
  /* border:solid; */
}

.calories-container {
  margin-top: 2%;
  display: flex;
  gap: 50px;
}

.net-calorie-chart {
  align-self: center;
}
</style>