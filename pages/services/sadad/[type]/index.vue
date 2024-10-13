<template>
    <div class="grid grid-cols-4 gap-5 py-5 px-2">

        <ULink :to="{name:'services-sadad-type-service' , params:{service:type.nameAr ? `${type.nameAr}_${type.code}` : 0 }}" class="h-36" v-for="type in count" v-key="c">
            <UCard :ui="{body:{padding:'p-0' , base:'w-full h-full'}}" class="h-full" >
                <div class="flex items-center justify-center h-full w-full px-5" >
                    <h5 style="direction: rtl;" >{{ type.nameAr }}</h5>
                </div>
            </UCard>
        </ULink>
    </div>
  </template>


<script>
import useApiFetch from '~/composables/UseApiFetch';
import Icons from '~/Data/Services'

export default {

    data(){
        return {
            count:Array.from({length: 40}, () => Math.floor(Math.random() * 40)),
            Icons
        }
    },

        mounted(){

        useApiFetch(`/sadad/get-biller-type/${useRoute().params.type}`)
        .then(res => {
            this.count = res
            console.log(res)

        })


    },

}



</script>
  
  