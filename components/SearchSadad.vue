<template>
    <div class=" px-10 bg-white w-auto relative">

        <UForm @submit="search" class="px-2 flex gap-5 mb-5 w-full">
            <UInput size="lg" type="text" class="w-full" v-model="searchValue" />
            <UButton type="submit">
                بحث
            </UButton>
        </UForm>
        <div class="absolute h-96 overflow-y-scroll w-[800px]" v-if="list.length">
            <div class="h-36" >
            <ULink :to="{
                name: 'services-sadad-type-service-id',
                params: {
                    type: type.categoryNameAr ?? 'na',
                    service: `${type.billerNameAr}_${type.billerCode}`,
                    id: type.id

                }
            }" class="h-full " v-for="type in list" v-key="c">
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
            </ULink>
        </div>

        </div>
    </div>
</template>

<script>
import { useAuthStore } from '~/stores/useAuthStore';
import Icons from '~/Data/Services'



export default {

    data() {
        return {
            list: [],
            searchValue: null,
            Icons
        }
    },

    methods: {
        search() {
            if (this.searchValue) {

                this.list = useAuthStore().list.filter(r => {
                    return r.billerNameAr.includes(this.searchValue) ||
                        r.serviceNameAr.includes(this.searchValue) ||
                        r.categoryNameAr.includes(this.searchValue)
                })
                console.log(this.list)
            } else {
                this.list = []
            }
        }
    }
}

</script>