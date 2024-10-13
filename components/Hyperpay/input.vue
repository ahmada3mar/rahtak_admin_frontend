<template>
  <input
    :autocomplete="autocomplete"
    :type="type"
    :name="name"
    :id="id"
    :placeholder="placeholder"
    class="bg-white-bk border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    v-model="proxyValue"
  />
</template>


<script setup>
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    String,
    required: true,
  },
  type: "text",
  name: null,
  id: null,
  placeholder: null,
  autocomplete: false,
});

const proxyValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>