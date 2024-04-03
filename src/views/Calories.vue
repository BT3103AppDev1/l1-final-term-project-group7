<template>
<h1>Calories Page</h1>
<div class="calorie-goal">
  <CalorieGoalDoughnut />
</div>
</template>
  
<script>
  import CalorieGoalDoughnut from '@/components/calories/CalorieGoal.vue'
  export default {
    name: 'App',
    components: {
      CalorieGoalDoughnut

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