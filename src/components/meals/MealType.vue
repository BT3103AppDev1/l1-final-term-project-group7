<template>
    <div class="clickable" @click="handleClick">
        <h1 style="color: white;">{{ mealName }}</h1>
    </div>
</template>

<script>
export default {
    name: 'MealType',
    props: ['mealType'],
    data() {
        return {
            mealName: this.mealType,
        };
    },
    methods: {
        handleClick() {
            this.$emit('mealSelected', this.mealName);
        }
    }
}
</script>

<style scoped>
.clickable {
    display: flex;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>