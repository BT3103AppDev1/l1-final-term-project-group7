<template>
  <div class="container">
    <h1>Home Page</h1>
    <div class="grid-container">
      <div class="chart weight">
        <weightWidget />
      </div>
      <div class="chart steps">
        <stepsWidget />
      </div>
      <div class="calendar">
        <calendarWidget />
      </div>
      <!-- Add more widgets here as needed -->
    </div>
  </div>
  
</template>
  
<script>
  import weightWidget from '@/components/Weight.vue'
  import stepsWidget from '@/components/Steps.vue'
  import calendarWidget from '@/components/Calendar.vue'

  export default {
    name: 'App',
    components: {
      weightWidget,
      stepsWidget,
      calendarWidget
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
  max-width: 80%; /* or whatever maximum width you want */
  margin: 1 auto;
  padding: 20px; /* add some spacing around the content */
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* creates two columns */
  grid-gap: 20px; /* space between the widgets */
  margin-bottom: 20px; /* space below the grid for any additional content */
}
.chart{
  min-width: 550px; /* Minimum width for each widget */
  min-height: 300px; 
  border: solid; /* for visual alignmnet purpose */
  align-items: stretch;
  /* padding: 0;
  margin: 0; */
}
.calendar{
  max-width: 300px; /* Minimum width for each widget */
  min-height: 100px; 
  border: solid; /* for visual alignmnet purpose */
  align-items: stretch;
}
</style>