<template>
    <li role="button">
        <div :class="`nav-parent relative flex flex-col justify-center nav-link  min-h-11 focus:outline-none 
        text-gray-400 dark:text-400`">
            <div @click="expandedSub = !expandedSub" 
            :class="`nav-parent nav-menu dark:text-gray-400 text-gray-600 relative flex justify-start items-center py-2 hover:text-gray-800 
             dark:hover:text-gray-100 dark:hover:bg-primary-900`">
                <span class="inline-flex justify-center items-center mr-5">
                    <Icon :name="item.icon" />
                </span>
                <span :class="`mr-2 ${expanded ? 'w-full opacity-100' : 'opacity-0 w-0'}  eas-in-out duration-300 
                    nav-name text-sm tracking-wide 
                    truncate`">{{ item.name }}
                </span>
                <Icon :class="`absolute right-1 top-2 ${expandedSub && 'rotate-180'} transition-all ease-in duration-300`"
                    name="mdi:chevron-up" />
            </div>
            <ul
                :class="` flex h-auto overflow-hidden ${expandedSub ? 'max-h-80 py-2' : 'max-h-0 p-0'} transition-all ease-in duration-300 text-sm text-gray-400 dark:hover:text-gray-100
                 pl-8 sub-nav flex-col`">
                <div v-for="( item, index) in item.items" :key="index" >
                    <ULink :active="$route.fullPath.includes(item.path)" 
                    active-class="bg-gray-200 dark:bg-primary-800 router-link-exact-active" 
                    :to="item.path" v-if="!item.meta?.auth || $can(item.meta?.auth.project_name, item.meta?.auth.permission)"
                    class="text-gray-600 dark:text-gray-400 dark:hover:text-gray-100 hover:!bg-gray-300 dark:hover:!bg-primary-900 py-2 flex px-2">
                    <span class="inline-flex justify-center items-center">
                        <Icon size="16px" :name="item.icon" />
                    </span>
                    <span :class="`mr-2 ${expanded ? 'w-full opacity-100' : 'opacity-0 w-0'}  eas-in-out duration-300 
                    nav-name text-sm tracking-wide 
                    overflow-hidden
                    truncate`">{{ item.name }}
                    </span>
                </ULink>
            </div>
            </ul>
        </div>
    </li>
</template>


<script >


export default {
    props: {
        expanded: false,
        item: {}
    },
    data() {
        return {
            expandedSub: false// this.item.items.map(i=> `${item.name}-${i.link}`).includes(this.$route.name) ,
        }
    },
    created() {
        this.expandedSub = this.item.items.map(i => i.path?.toLowerCase()).includes(this.$route.fullPath.toLowerCase())
    },
    
}
</script>