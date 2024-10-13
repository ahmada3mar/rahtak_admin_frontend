<template>
    <div class="grid grid-cols-4 gap-5 py-5 px-2">

        <ULink :to="{
            name: 'services-sadad-type-service-id',
            params: { id: type.id ?? 0 }
        }" class="h-36" v-for="type in count" v-key="c">
            <UCard class="h-full">
                <h5>{{ type.nameAr }}</h5>
            </UCard>
        </ULink>
    </div>
</template>


<script>
import useApiFetch from '~/composables/UseApiFetch';



export default {

    data() {
        return {
            count: Array.from({ length: 40 }, () => Math.floor(Math.random() * 40))

        }
    },

    mounted() {

        const [service, code] = useRoute().params.service.split("_")
        useApiFetch(`/sadad/get-service-info/${service}`)
            .then(res => {
                this.count = res

            })



    }
}



</script>