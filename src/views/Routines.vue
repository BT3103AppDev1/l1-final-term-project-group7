<template>
  <WorkoutContainer />
</template>
  
<script>
import WorkoutContainer from '@/components/routines/WorkoutContainer.vue';
  
  export default {
    name: 'Routines',
    components: {
      WorkoutContainer
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