<template>
  <div class="calorie-widgets">
    <div id="calorie-goal">
      <CalorieGoalDoughnut :net-calories="netCalories" />
    </div>
    <div id="input-data-pop-up">
      <InputDataPopup @recorded="updateCalories" />
    </div>
    <div id="calorie-input">
      <CalorieInput @update-calories="updateCalories" />
    </div>
    <div id="net-calorie-chart">
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
.calorie-widgets {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 30px;
  row-gap: 30px;
  margin: 20px;
}

#input-data-pop-up {
  align-self: center;
  width: 40%;
}

.calories-container {
  margin-top: 2%;
  display: flex;
  gap: 30px;
}

#net-calorie-chart {
  align-self: center;
  width: 40%;
}
</style>