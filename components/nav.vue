<template>
    <sub-nav :expanded="expanded" v-for="( item, index) in list" :item="item" :key="index" />
</template>

<script>
import subNav from './subNav.vue'
export default {
    components: { subNav },
    props: {
        list: {
            type: Array,
            default: []
        },
        expanded: Boolean
    }
}
</script>