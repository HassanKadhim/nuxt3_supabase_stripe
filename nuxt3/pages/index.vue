<template>
    <main>
        <div m="y-2" flex="lg:~ row gap-2" justify="content lg:center">
            <h1>Welcome Nuxt 3 Starter</h1>
        </div>
    </main>
</template>

<script lang="ts" setup>

definePageMeta({
    middleware: ['auth']
})


</script>

