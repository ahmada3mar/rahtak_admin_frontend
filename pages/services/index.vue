<template>
    <div class="grid grid-cols-4 gap-5 p-5">

        <ULink :to="Service.path" class="h-36" v-for="Service in Services[''].filter(n=>n.name == 'الخدمات')[0].items" v-key="c">
            <UCard :ui="{body:{padding:'p-0' , base:'w-full h-full'}}" class="h-full" >
                <div class="flex items-center flex-col gap-5 justify-center h-full w-full px-5" >
                    <Icon  size="35px" :name="Service.icon" />
                    <h5 style="direction: rtl;" >{{ Service.name }}</h5>
                </div>
            </UCard>
        </ULink>
    </div>
  </template>

  <script >
import Services from '~/Data/Routes';

export default {

    data(){
        return {
            Services
        }
    }
}

</script>