<template>
    <UFormGroup class="my-2 capitalize" v-for="key in Object.keys(resource)" :key="key" :label="key.replaceAll('_' , ' ')" >
        <slot :name="key.replaceAll(' ' ,'')" :value="resource[key]" :index="key">
            <UInput size="md"  :disabled="disabled" v-model="resource[key]"   color="gray" variant="outline"  />
        </slot>
 </UFormGroup>
</template>

<script>
export default {
    props:{
        resource:{},
        disabled:{
            type:Boolean,
            default:false
        }
    }
}
</script>