<template>
    <div>
        <div class="grid grid-cols-4 gap-5 py-5 px-2">

            <ULink :to="{ name: 'services-sadad-type', params: { type: type.arName ?? 'na' } }" class="h-36 "
                v-for="type in count" v-key="c">
                <UCard v-if="type" class="h-full hover:bg-orange-100 hover:border-orange-200 border">
                    <div class="flex gap-5 items-center justify-center flex-col">
                        <Icon v-if="Icons[type.enName]" size="35px" :name="Icons[type.enName]" />
                        <h5 style="direction: rtl;">{{ type.arName }}</h5>
                    </div>
                </UCard>
            </ULink>
        </div>
    </div>

</template>


<script>

import useApiFetch from '~/composables/UseApiFetch';
import Icons from '~/Data/Services.js'

export default {

    data() {
        return {
            count: Array.from({ length: 40 }, () => Math.floor(Math.random() * 40)),
            Icons,
            searchValue:null
        }
    },

    mounted() {
        useApiFetch("/sadad/get-biller-type")
        .then(res => {
            this.count = res.sort((a, b) => a.enName.localeCompare(b.enName))

        })
    },
}



</script>