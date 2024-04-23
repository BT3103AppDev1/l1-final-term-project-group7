<template>
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
        <activityWidget />
      </div>
      <div class="calendar">
        <calendarWidget />
      </div>
    </div>
    <div class="featured">
      <FeaturedExercise/>
    </div>
  </div>
  
</template>
  
<script>
  import weightWidget from '@/components/home/Weight.vue'
  import stepsWidget from '@/components/home/Steps.vue'
  import calendarWidget from '@/components/home/Calendar.vue'
  import netCaloriesWidget from '@/components/home/NetCalories.vue'
  import activityWidget from '@/components/home/Activity.vue'
  import FeaturedExercise from '@/components/home/FeaturedExercise.vue'

  export default {
    name: 'App',
    components: {
      weightWidget,
      stepsWidget,
      calendarWidget,
      netCaloriesWidget,
      activityWidget,
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
  flex-direction: column;
  margin: 20px;
  width: fit-content;
  gap: 30px;
  /* border: solid 2px red; */
}

.top-row, .bottom-row, .featured {
  display: flex;
  width: 100%;
  gap: 30px;
  justify-content: center;
}

.chart {
  flex: 1; /* Each chart will grow to take up equal space */
  height: fit-content;
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

</style>