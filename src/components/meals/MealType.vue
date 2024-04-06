<template>
    <div class="clickable" @click="handleClick">
        <h1>{{ mealName }}</h1>
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
