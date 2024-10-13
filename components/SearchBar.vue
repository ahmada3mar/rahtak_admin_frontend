<template>
  <Transition enter-to-class="opacity-100" enter-active-class="transition ease-in duration-300 opacity-0 "
    leave-active-class="transition opacity-100 ease-in duration-300" leave-to-class="opacity-5">
    <div v-show="search" @click.self="search = false"
      :class="`absolute bg-[#00000059] flex  h-screen p-10 w-screen top-0 z-50`">
      <div class="mx-auto h-fit relative max-w-lg w-full">
        <input ref="searchInput" v-model="searchInput" :class="`h-10 w-full  rounded px-4 pl-10`" placeholder="Search"
          type="text" />
        <Icon class="absolute left-2 translate-y-1/2" color="gray" name="carbon:search" />
        <div :class="`container ease-in overflow-y-scroll overflow-x-hidden duration-300 bg-gray-100  ${searchInput.length >= 3 ? 'max-h-80' : 'max-h-0'
          } w-full rounded mt-2 rounded-b-lg flex justify-center`">
          <div role="button" v-if="searchList.length > 0" class="w-full">
            <NuxtLink v-for="(type, index) in searchList" :key="index" class="flex flex-col mx-4 route-search" @click="
              search = false;
            searchInput = '';
            " :to="{
                name: 'services-sadad-type-service-id',
                params: {
                    type: type.categoryNameAr ?? 'na',
                    service: `${type.billerNameAr}_${type.billerCode}`,
                    id: type.id

                }
            }">
                <UCard v-if="type" class="h-full my-3 hover:bg-orange-100 hover:border-orange-200 border">
                    <div class="flex items-center mx-2" >
                            <Icon v-if="Icons[type.categoryNameEn]" size="35px" :name="Icons[type.categoryNameEn]" />
                        <div class="flex flex-col gap-1 mx-3" >
                            <div>
                                {{ type.categoryNameAr }}
                            </div>
                            <div>
                                {{ type.billerNameAr }}
                            </div>
                            <div>
                                {{ type.serviceNameAr }}
                            </div>
                        </div>
                    </div>

                </UCard>
            </NuxtLink>
          </div>
          <div v-else class="p-5">No results</div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import route_list from "~/Data/Routes"
import { useAuthStore } from '~/stores/useAuthStore';
import Icons from '~/Data/Services'

</script>

<script>
export default {
  data() {
    return {
      searchResults: [],
      searchList: [],
      keys: [],
      search: false,
      searchInput: "",

    };
  },

  watch: {
    searchInput(value) {
      if (value.length >= 3) {

            if (value) {

                this.searchList = useAuthStore().list.filter(r => {
                    return r.billerNameAr.includes(value) ||
                        r.serviceNameAr.includes(value) ||
                        r.categoryNameAr.includes(value)
                })
            } else {
                this.searchList = []
            }


    //    this.searchList = this.searchResults.filter(i => i.name.toLowerCase().includes(value.toLowerCase()) || i.parent?.toLowerCase().includes(value.toLowerCase()))
      }

    }
  },

  methods: {
    searchDialog() {
      this.search = true;
      this.$nextTick(() => this.$refs.searchInput.focus());
    },
    handleKeyPress(e) {
      this.keys[e.key] = true;
      if (this.keys.Shift && this.keys.Control && this.keys.F) {
        this.searchDialog();
      }
    },
    handleKeyPressUp() {
      this.keys = {};
    },
    setSearchItems(list, parent = null) {
      list.forEach((i) => {
        if (i.path) {
          const r = { name: i.name, icon: i.icon, path: i.path };
          if (parent) {
            r.parent = parent;
          }
          this.searchResults.push(r);
        }

        if (i.items?.length) {
          return this.setSearchItems(i.items, i.name);
        }
      });
    },
  },

  created() {
    const collection = Object.values(route_list).flat();
    this.setSearchItems(collection);

    if (typeof window !== "undefined") {
      document.addEventListener("keydown", this.handleKeyPress);
      document.addEventListener("keyup", this.handleKeyPressUp);
    }
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keydown", this.handleKeyPress);
      document.removeEventListener("keyup", this.handleKeyPressUp);
    }
  },
  expose: ['searchDialog']
};
</script>