<template>
<div  v-for="ic in Object.values(Icons)" :key="ic" >

    <div>
        <Icon size="16px" :name="ic" />
    </div>
</div>
</template>

<script setup>
import Icons from '~/Data/Services'


</script>