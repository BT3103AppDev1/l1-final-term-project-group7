<template>
  <div class="user-info" v-for="(userDetail, index) in usernames">
    <div class="username">
      <div class="user-rank">
        <div class="rank-circle">{{ index + 1 }}</div>
      </div>
      {{ userDetail.username }}
      <button @click="deleteFriend(userDetail)">
        <img src="@/assets/Cross-Icon.png" alt="crossButton" class="clickable">
      </button>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  props: ["userid"],
  emits: ['friendAdded'],
  data() {
    return {
      usernames: [],
    }
  },
  methods: {
    async deleteFriend(userDetail) {
      const deleteRef = doc(db, "users", this.userid, "friends", userDetail.uid);
      await deleteDoc(deleteRef);
      console.log("deleted")
      this.$emit('friendDeleted')
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const friendRef = collection(db, "users", user.uid, "friends");
        const friendSnapshot = await getDocs(friendRef);
        friendSnapshot.forEach((doc) => {
          let userDetail = {
            uid: doc.id,
            username: doc.data().username,
          };
          this.usernames.push(userDetail);
        });
      }
    });
  },
}
</script>

<style scoped>
.user-info {
  display: flex;
  align-self: stretch;
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
.clickable {
  height: 24px;
}
.clickable:hover {
  cursor: pointer;
}
button {
  margin-left: 20px;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  padding-top: 5px;
}
</style>