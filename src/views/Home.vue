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
  import weightWidget from '@/components/home/Weight.vue'
  import stepsWidget from '@/components/home/Steps.vue'
  import calendarWidget from '@/components/home/Calendar.vue'
  import netCaloriesWidget from '@/components/home/NetCalories.vue'
  import activtyWidget from '@/components/home/Activity.vue'

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
  margin: 0 auto; /* centers the container */
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 85vh; /* Adjust the height calculation based on the header/footer height */
  overflow: hidden; /* Prevents overflow */
}

.grid-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* Fill the container height */
  justify-content: space-between; /* Distributes space between rows */
}

.top-row, .bottom-row {
  display: flex;
  justify-content: space-between; /* Distributes space between widgets */
}

.weight, .steps, .netCalories, .activity, .calendar {
  margin-right: 20px; /* Add margin to the right of each widget */
  flex-grow: 1; /* Widgets will grow to take up available space */
}

/* Last child of each row should not have a right margin */
.top-row > div:last-child, .bottom-row > div:last-child {
  margin-right: 0;
}

/* Adjust the flex-basis for activity and calendar widgets */
.activity {
  flex-basis: 60%; /* Takes up a larger base space when space allows */
}

.calendar {
  flex-basis: 30%; /* Takes up a smaller base space when space allows */
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