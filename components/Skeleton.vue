<template>
  <div
    v-for="i in count"
    :key="i"
    class="my-5"
  >
    <USkeleton class="h-4 my-2 w-[150px]" />
    <USkeleton class="h-8 my-2 w-full" />
  </div>
</template>

<script>
export default {
  props: {
    count: 5,
  },
};
</script>