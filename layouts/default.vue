<template>
  <div class="h-screen  antialiased bg-gray-50 dark:bg-gray-950 text-gray-800">
    <div class="p-5 h-full pr-1 float-left  w-fit dark:border-gray-700 border-none flex flex-col fixed z-40">
      <div
        :class="`relative flex flex-col h-full ${expanded ? 'w-[240px] p-4' : 'w-[5rem]'} nav-bar transition-all ease-in duration-300 rounded-lg text-gray-400 bg-gray-100 dark:bg-gray-900 dark:text-gray-400 p-0  my-4 overflow-y-hidden`">
        <div class="flex items-center justify-center min-h-[64px] max-h-[64px] dark:border-gray-700 border-b px-2 py-3">
          <img :class="`transition-all ease-in duration-300  ${expanded && 'h-0 opacity-0'}   short`"
            src="https://www.rahtak.net/images/home/logo.png" />
          <img :class="`transition-all ease-in duration-300 ${expanded ? 'opacity-100 h-full' : 'h-0 opacity-0'}   long`"
            src="https://www.rahtak.net/images/home/logo.png" />
          <Icon role="button" @click="expanded = !expanded"
            :name="expanded ? 'humbleicons:switch-on' : 'humbleicons:switch-off'"
            :class="`absolute right-5 top-5 ${!expanded && 'opacity-0'} nav-switch transition-all ease-in duration-300`" />
        </div>
        <div class="overflow-y-auto overflow-x-hidden flex-grow">
          <ul class="flex flex-col py-4 space-y-1">
            <div v-for="key  in Object.keys(route_list)" :key="key">
              <li :class="`px-5 ${expanded ? 'block' : 'hidden'} `">
                <div class="flex flex-row items-center h-8">
                  <div class="text-sm font-light tracking-wide text-gray-400">{{ key }}</div>
                </div>
              </li>
              <Nav :expanded="expanded" :list="route_list[key]"></Nav>
              </div>
                <li >
                  <div 
                     class="relative flex flex-col justify-center nav-link  min-h-11 focus:outline-none 
                  text-gray-600 hover:text-gray-800 dark:text-gray-400  hover:bg-gray-300 dark:hover:text-gray-100 hover:bg-gray-300 dark:hover:bg-primary-900 ">
                      <div @click="logout" role="button" class="flex justify-start items-center py-2">
                          <span class="inline-flex justify-center items-center mr-5">
                              <Icon name="ic:outline-logout" />
                          </span>
                          <span :class="`mr-2  'w-full opacity-100'  eas-in-out duration-300 
                              nav-name text-sm tracking-wide capitalize 
                              truncate`">تسجيل خروج
                          </span>
                      </div>
                  </div>
              </li>

          </ul>
        </div>
      </div>
    </div>
    <div
      :class="`flex flex-col  h-full  p-5 ${expanded ? 'mr-[260px]' : 'mr-[100px]'} transition-all ease-in duration-300`">
      <div class="flex justify-center items-center h-16 w-full overflow-hidden text-gray-400 bg-gray-100 dark:bg-gray-900 dark:text-gray-400 rounded-lg my-4">
        <a @click="searchDialog" class="flex items-center justify-center mr-3" href="#">
          <Icon name="carbon:search" size="26px" />
        </a>
        <a @click="$colorMode.preference = $colorMode.preference =='light' ? 'dark' : 'light'" class="flex items-center justify-center w-12 h-12 mr-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700" href="#">
          <transition name="fade" mode="out-in">
            <Icon v-if="$colorMode.preference =='light'" name="carbon:moon" size="26px" />
            <Icon v-else-if="$colorMode.preference =='dark'" name="carbon:sun" size="26px" />
            <Icon v-else="" name="carbon:window-black-saturation" size="26px" />
          </transition>  
          </a>
        <div class="flex  items-center mr-2 dark:border-gray-700 border-l dark:border-gray-700 border-gray-300">
        </div>
        <a 
          class="flex items-center justify-center w-16 h-16 mr-auto bg-gray-200 hover:bg-gray-300 dark:bg-primary-900" href="#">
          <svg class="w-6 h-6 stroke-current" xmrns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </a>
      </div>
      <div class="h-full w-full text-gray-400  rounded-lg my-4 overflow-y-auto gutter-stable">
        <Breadcrumb/>
        <slot />
      </div>
    </div>
    <search-bar ref="searchBar" />

  </div>
</template>


<script setup>
import route_list from "~/Data/Routes"
import { useAuthStore } from "~/stores/useAuthStore";
</script>

<script>
export default {
  data() {
    return {
      expanded: true,
    }
  },
  methods: {
    searchDialog() {
      this.$refs.searchBar.searchDialog();
    },
    logout(){
      const store = useAuthStore()
      store.logout()
    }
  }


}
</script>
