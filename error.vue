<template>
    <NuxtLayout v-if="error" :name="`${error.statusCode}`">
        <button @click="handleError">back</button>
    </NuxtLayout>
</template>

<script setup>
const error = useError();

const handleError = () => {
    clearError({
        redirect: '/',
    });
};
</script>
