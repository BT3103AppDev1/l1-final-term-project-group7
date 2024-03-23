<template>
  <h1>Home Page</h1>
  <div>
    <weightWidget />
  </div>
</template>
  
<script>
  import weightWidget from '@/components/Weight.vue'

  export default {
    name: 'App',
    components: {
      weightWidget
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