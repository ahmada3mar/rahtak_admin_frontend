<template>
  <div>
    <hyper-table ref="table" :columns="options.columns" :filters="options.filters" url="/activities"
      :ui="{ th: { base: 'text-left' } }">
      <template #roles-data="{ row }">
        <UBadge v-for="role in row.roles" :key="role.name" :ui="{ rounded: 'rounded-full' }" class="mx-1 capitalize"
          size="xs" :label="role.name" :color="role.name.toLowerCase().includes('admin') ? 'emerald' : 'orange'" />
      </template>

      <template #id-data="{row}">
        <span role="button" class="underline text-primary font-bold" @click="view(row)"  >
            {{ row.id }}
        </span>
      </template>



      <template #causer-data="{ row }">
        <NuxtLink class="text-primary font-bold underline dark:text-gray-400 "
          :to="{ name: 'users-id', params: { id: row.causer.id } }">{{ row.causer.name }}</NuxtLink>
      </template>

      <template #event-data="{ row }">
        
        <UBadge variant="soft" :label="row.event" :color="options.resolveEventColor(row.event)" />

      </template>

      <template #subject-data="{ row }">
        <span :class="`text-[11px] w-16 text-center inline-block 
      bg-${options.resolveColor(row.log_name)}-500 
      rounded-lg text-gray-200 px-1 mr-2`">
          {{ row.subject_type.replace('App\\Models\\', '') }}
        </span>
        <NuxtLink class="text-primary font-bold underline dark:text-gray-400 "
          :to="{ name: `${row.log_name}s-id`, params: { id: row.subject.id } }">
          {{ row.subject.name }}
        </NuxtLink>
      </template>

      <template #actions-data="{ row }">
        <div class="flex gap-2">
            <UTooltip role="button" @click="view(row)" text="View">
              <Icon role="button" class="hover:text-primary mx-1" name="carbon:view" />
            </UTooltip>
        </div>
      </template>


    </hyper-table>



    <UModal id="lll" :ui="{
        width: 'w-full sm:max-w-3xl',
      }" v-model="open">
        <UCard :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                Changes
              </h3>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                @click="open = false" />
            </div>
          </template>

          <div v-if="log">
            <UTable :columns="[{'key':'old', 'label':'Old'}, {'key':'new', 'label':'New'}]" :rows="log" >

              <template #new-data="{row}">
                  <UFormGroup :label="row.new.key" >
                      <label class="px-2 bg-green-300 text-primary " >{{ row.new.value }}</label>
                  </UFormGroup>
              </template>

              <template #old-data="{row}">
                  <UFormGroup :label="row.old.key" >
                      <label class="px-2 line-through bg-red-300 text-primary"  >{{ row.old.value }}</label>
                  </UFormGroup>
              </template>

            </UTable>
            

          </div>

        </UCard>
      </UModal>

  </div>
</template>



<script setup>
import options from "./options";


definePageMeta({
  auth: {
    permission: "view activities",
  },
});
</script>

<script>


export default {
  data() {
    return {
      open: false,
      log:null,
  
      options: options,
    }
  },
  methods: {
    view(log){
      this.open = true
      let newAttributes = [];

      Object.keys(log.properties.attributes).forEach(key=>{
        newAttributes.push({
          new:{
            key,
            value:log.properties.attributes[key]
          },
          old:{
            key,
            value:log.properties.old[key]
          }
        })
      })

      this.log = newAttributes
    }
  }
}
</script>
