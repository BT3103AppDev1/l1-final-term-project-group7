<template>
  <div class="leaderboard-container">
    <h1 class="leaderboard-heading">Leaderboard</h1>
    <AddFriend @friendAdded="addFriend"></AddFriend>
    <div class="user-info" v-for="(username, index) in usernames" :key="index">
      <div class="username">
        <div class="user-rank">
          <div class="rank-circle">{{ index + 1 }}</div>
        </div>
        {{ username.title }}
      </div>
    </div>
  </div>
</template>

<script>
import AddFriend from '@/components/social/AddFriend.vue';
import { db } from '@/firebase';

export default {
  name: 'Leaderboard',

  components: {
    AddFriend,
  },

  data() {
    return {
      usernames: [
        { title: '@cardiojunkie' },
        { title: '@sweatybettie' },
        { title: '@gymrat4life' },
        { title: '@musclemuncher' }
      ],
    };
  },

  methods: {
    async addFriend(username) {
      try {
        const currentUser = this.$firebase.auth().currentUser;
        await db.collection('friends').doc(currentUser.uid).collection('userFriends').add({
          friendUsername: username,
        });
        console.log('Friend added successfully');
      } catch (error) {
        console.error('Error adding friend:', error);
      }
    },
  },
};
</script>
  
<style scoped>
.social-page {
  display: flex;
  justify-content: space-between;
}

.leaderboard-container {
  flex: 1;
  text-align: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  margin-right: 10px;
}

.leaderboard-heading {
  color: #335076;
  margin-bottom: 10px;
}

.search-username {
  margin-top: 10px;
  border-radius: 20px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 40px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.user-rank {
  background-color: #ffffff;
  border-radius: 50%;
  width: 33px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.rank-circle {
  background-color: #335076;
  color: #ffffff;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ffffff;
}

.username {
  background-color: #335076;
  color: #ffffff;
  border-radius: 30px;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  flex: 1;
}
</style>