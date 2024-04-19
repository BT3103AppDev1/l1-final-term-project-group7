<template>
    <div>
        <div id="profileContainer">
            <h1> Profile Page </h1>
            <div id="profileInfo">
                <ProfileInfo/>
            </div>
            <div id="changePassword">
                <ChangePassword/>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileInfo from '@/components/profile/ProfileInfo.vue';
import ChangePassword from '@/components/profile/ChangePassword.vue';

export default {
    name: 'Profile',

    components: {
        ProfileInfo,
        ChangePassword
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
#profileContainer {
    display: flex; /* Use flexbox to align children side by side */
    justify-content: space-around; /* Distribute space around the items */
    align-items: start; /* Align items at the start of the container vertically */
    max-width: 95%;
    margin: auto;
    padding: 20px;
    margin-top: 3%;
    margin-left: 5%;
    margin-right: 5%;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-color: white;
    border-radius: 8px;
}

#profileInfo, #changePassword {
    margin-top: 7%;
    margin-bottom: 2%;
    flex: 1; /* Each child will take equal amount of space */
    padding: 10px; /* Adds some space inside each box */
    min-width: 300px; /* Minimum width of each section */
}


</style>