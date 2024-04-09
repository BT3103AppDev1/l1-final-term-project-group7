<template>
<h1>Calories Page</h1>
<div class="calorie-goal">
  <CalorieGoalDoughnut />
</div>
<div class="calorie-input">
  <CalorieInput />
</div>
</template>
  
<script>
  import CalorieGoalDoughnut from '@/components/calories/CalorieGoal.vue'
  import CalorieInput from '@/components/calories/CalorieInput.vue'
  export default {
    name: 'App',
    components: {
      CalorieGoalDoughnut,
      CalorieInput
    },
    data() {
      return {
        refreshComp: 0
      }
    },
    methods: {
      change() {
        this.refreshComp += 1
      }
    }
  }
</script>