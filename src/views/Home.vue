<template>
  <h1>Home Page</h1>
  <div class="container">
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
    <FeaturedExercise/>
  </div>
  
</template>
  
<script>
  import weightWidget from '@/components/home/Weight.vue'
  import stepsWidget from '@/components/home/Steps.vue'
  import calendarWidget from '@/components/home/Calendar.vue'
  import netCaloriesWidget from '@/components/home/NetCalories.vue'
  import activtyWidget from '@/components/home/Activity.vue'
  import FeaturedExercise from '@/components/home/FeaturedExercise.vue'

  export default {
    name: 'App',
    components: {
      weightWidget,
      stepsWidget,
      calendarWidget,
      netCaloriesWidget,
      activtyWidget,
      FeaturedExercise,
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
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  height: 85%; /* Fill the container height */
  justify-content: space-around; /*Distributes space between rows */
  overflow: hidden; /* Prevents overflow */
  /* border: solid 2px red; */
}

.top-row, .bottom-row {
  display: flex;
  justify-content: space-around; /* Distributes space between widgets */
  /* border: solid 2px blue; */
}

.chart {
  flex: 1; /* Each chart will grow to take up equal space */
  margin-right: 2%; /*space between the charts */
  height: 25vh;
}

.activity, .calendar {
  margin-right: 3%; /* Add margin to the right of each widget */
  flex: 1; 
}

/* Last child of each row should not have a right margin */
.top-row > div:last-child, .bottom-row > div:last-child {
  margin-right: 0;
}

/* Adjust the flex-basis for activity and calendar widgets */
.activity {
  flex-basis: 65%; /* Takes up a larger base space when space allows */
}

.calendar {
  flex-basis: 35%; /* Takes up a smaller base space when space allows */
  margin-right: 0; /* Ensures there's no margin on the right of the last element */
}

/* Responsive settings */
@media (max-width: 768px) {
  .top-row, .bottom-row {
    flex-direction: column;
  }

  .weight, .steps, .netCalories, .activity, .calendar {
    margin-right: 0;
    margin-bottom: 10px; /* Add margin at the bottom instead for mobile */
  }

  .top-row > div, .bottom-row > div {
    width: 100%; /* Full width on smaller screens */
  }
}
</style>