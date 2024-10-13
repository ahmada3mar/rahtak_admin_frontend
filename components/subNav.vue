<template>
    <nav-has-sub :item="item" :expanded="expanded" v-if="item.items && item.items.length" />
    <li v-else>
        <ULink  :active="item.path == '/' ?  $route.fullPath == item.path : $route.fullPath.includes(item.path)" 
        active-class="bg-gray-200 dark:bg-primary-800 router-link-exact-active" 
        :target="item.meta?.target"
            v-if="!item.meta?.auth || $can(item.meta?.auth.project_name, item.meta?.auth.permission)" :to="item.path" class="relative flex flex-col justify-center nav-link  min-h-11 focus:outline-none 
        text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-300 dark:hover:bg-primary-900">
            <div class="flex justify-start items-center py-2">
                <span class="inline-flex justify-center items-center mr-5">
                    <Icon :name="item.icon" />
                </span>
                <span :class="`mr-2 ${expanded ? 'w-full opacity-100' : 'opacity-0 w-0'}  eas-in-out duration-300 
                    nav-name text-sm tracking-wide capitalize 
                    truncate`">{{ item.name }}
                </span>
            </div>
        </ULink>
    </li>
</template>

<script>
export default {
    props: {
        expanded: false,
        target: null,
        item: {}
    }
}
</script>