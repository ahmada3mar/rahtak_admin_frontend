<template>
  <div
    role="button"
    @click="showDoc(doc_type)"
    :class="className"
    :style="`background-size:cover;background-position:center;background-image:url(${icon})`"
  >
  </div>
  <UModal v-model="modal">
    <img :src="src" />
  </UModal>

</template>

<script>
export default {
  data() {
    return {
      modal: false,
    };
  },
  methods: {
    showDoc(doc_type) {
      if (doc_type == "pdf") {
        window.open(this.src, "_blank");
      } else {
        this.modal = true;
      }
    },
  },
};
</script>

<script setup>
const props = defineProps({
  class: {
    default: "w-32 h-40",
  },
  src: "",
});

const className = `m-4 rounded-lg ${props.class}`;

const doc_type = props.src.split(".").pop().toLowerCase();
const icon =
  doc_type == "pdf"
    ? new URL("~/assets/imgs/pdf.png", import.meta.url).href
    : props.src;
</script>