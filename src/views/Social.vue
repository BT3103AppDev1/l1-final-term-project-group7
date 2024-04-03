<template>
  <div>
    <h1>Social Page</h1>
    <achievements></achievements>
  </div>
</template>
  
<script>
import Achievements from '@/components/social/Achievements.vue';

  export default {
    name: 'Social',
    components: {
      Achievements
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