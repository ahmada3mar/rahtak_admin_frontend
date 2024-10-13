<template>
    <div class="w-full rounded-lg flex flex-col border border-gray-200">
        <img v-if="img" class="w-full" :src="img" alt="Sunset in the mountains">
        <div class="px-6 py-4">
            <div class="font-bold text-lg mb-2">{{ title }}</div>
            <div class="flex flex-row items-center justify-between gap-2">
                <div class="flex flex-wrap items-center justify-center basis-3/4 text-gray-400 text-base text-sm">
                    {{ text }}
                </div>
                <div  v-if="icon" class="w-20 h-20">
                    <div :class="`w-full h-full bg-cover bg-center`" :style="`background-image:url(${icon})`"  alt="Sunset in the mountains"></div>
                </div>
            </div>
        </div>
        <div class="px-6 flex pt-4 pb-2">
            <NuxtLink
                v-for="(action,index) in actions"
                :to="action.link"
                :key="index"
                class="cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-400 mr-auto mb-2">
                {{ action.name  }}
            </NuxtLink>
    </div>
</div>
</template>

<script>
export default {
    props:{
        img:null,
        text:String,
        title:String,
        actions:Array,
        icon:null
    }
}
</script>