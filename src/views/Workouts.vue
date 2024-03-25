<template>
  <div>
    <h1>Workouts Page</h1>
    <ExerciseList :muscle="muscleSelected" />
  </div>
</template>

<script>
import ExerciseList from '@/components/ExerciseList.vue';

export default {
  name: 'Workouts',
  components: {
    ExerciseList
  },
  data() {
    return {
      muscleSelected: ''
    };
  }
};
</script>
