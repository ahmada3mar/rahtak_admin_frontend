<template>
  <div>
    <USelect
        @click="onClick"
      :model-value="modelValue"
      @update:model-value="onUpdate"
      :key="index"
      value-attribute="name"
      option-attribute="name"
      creatable
      :options="options"
    />
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: null,
    },
    options: {
      type: Array,
      default: [],
    },
    modelValue: {
      type: [String, Number, Object, Array, Boolean],
      default: "",
    },
  },
  emits: ["update:modelValue", "update:query", "open", "close", "change"],
  setup(props, { emit, slots }) {
   const clickCount = ref(0)
   const clickTimer = ref(null)

   const onUpdate = (value) => {
       emit("update:modelValue", value);
       emit("change", value);
    };
 
    const onClick = (e) => {
        e.preventDefault();
      clickCount.value++;
      if (clickCount.value === 1) {
        clickTimer.value = setTimeout(() => {
          clickCount.value = 0;
        //   emit("single-click");
        }, 1500);
      } else if (clickCount.value === 2) {
        clearTimeout(clickTimer.value);
        clickCount.value = 0;
        emit("double-click");
      }
      console.log(clickCount.value);
    };
    return {
        onUpdate,
        onClick
    }
  },
  methods: {
    handleClick(e) {
      e.preventDefault();
      this.clickCount++;
      if (this.clickCount === 1) {
        this.clickTimer = setTimeout(() => {
          this.clickCount = 0;
          this.$emit("single-click");
        }, 3000);
      } else if (this.clickCount === 2) {
        clearTimeout(this.clickTimer);
        this.clickCount = 0;
        this.$emit("double-click");
      }
      console.log(this.clickCount);
    },
  },
};
</script>
