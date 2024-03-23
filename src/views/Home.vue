<template>
  <div class="container">
    <h1>Home Page</h1>
    <div class="grid-container">
      <div class="top-row">
        <div class="chart weight">
          <weightWidget />
        </div>
        <div class="chart steps">
          <stepsWidget />
        </div>
        <div class="chart netCalories">
          <netCaloriesWidget />
        </div>
      </div>
      <div class="bottom-row">
        <div class="activity">
          <activtyWidget />
        </div>
        <div class="calendar">
          <calendarWidget />
        </div>
      </div>
    </div>
  </div>
  
</template>
  
<script>
  import weightWidget from '@/components/Weight.vue'
  import stepsWidget from '@/components/Steps.vue'
  import calendarWidget from '@/components/Calendar.vue'
  import netCaloriesWidget from '@/components/NetCalories.vue'
  import activtyWidget from '@/components/Activity.vue'

  export default {
    name: 'App',
    components: {
      weightWidget,
      stepsWidget,
      calendarWidget,
      netCaloriesWidget,
      activtyWidget
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

<style scoped>
.container {
  max-width: 100%;
  margin: 1 auto;
  padding: 30px;
}

.top-row, .bottom-row {
  max-width: 100%;
  display: flex;
  justify-content: space-between; /* Adjusts spacing between child elements */
  margin-bottom: 20px; /* Space between rows */
}

.weight, .steps, .netCalories {
  min-width: 500px;
  min-height: 300px;
  flex: 1; /* Distribute space evenly */
  margin-right: 20px; /* Space between widgets */
}

.activity {
  flex: 2; /* Takes 3 times more space than calendar */
}

.calendar {
  flex: 1; 
  margin-left: 20px; /* Space between activity and calendar widgets */
}

.chart, .activity, .calendar {
  /* Common styles for widgets */
  border-radius: 10px;
  padding: 10px;
}

/* Clear the borders used for visual alignment if they were just for development purposes */
</style>
