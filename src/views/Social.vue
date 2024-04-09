<template>
  <div class="social-page">
    <div class="leaderboard-container">
      <Leaderboard></Leaderboard>
    </div>
    <div class="achievements-container">
      <Achievements></Achievements>
    </div>
  </div>
</template>

<script>
import Leaderboard from '@/components/social/Leaderboard.vue';
import Achievements from '@/components/social/Achievements.vue';

export default {
  components: {
    Leaderboard,
    Achievements
  },
  data() {
    return {
      refreshComp: 0
    };
  },
  methods: {
    change() {
      this.refreshComp += 1;
    }
  }
};
</script>

<style scoped>
.social-page {
  display: flex;
}

.leaderboard-container {
  flex: 0.8;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  margin-right: 20px;
  margin-top: 40px;
}

.achievements-container {
  flex: 1.2;
  background-color: #335076;
  border-radius: 20px;
  padding: 20px;
  margin-top: 40px;
}
</style>
