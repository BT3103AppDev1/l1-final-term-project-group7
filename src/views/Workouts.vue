<template>
  <div class="container">
    <workoutInfo />
  </div>
</template>
  
<script>
  import WorkoutInfo from '@/components/WorkoutInfo.vue';

  export default {
    name: 'App',
    components: {
      WorkoutInfo
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
    justify-content: center;
    align-items: center;
  }
</style>