<template>

    <div>
        <div @click="openHistory"  role="button"   class="mx-4" >
            <UTooltip  text="History">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <g fill="none">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M12 8v4l2.5 2.5" />
                    <path fill="currentColor"
                      d="m5.604 5.604l-.53-.53zM4.338 6.871l-.75.003a.75.75 0 0 0 .746.747zm2.542.762a.75.75 0 1 0 .007-1.5zM5.075 4.321a.75.75 0 0 0-1.5.008zM3.75 12a.75.75 0 0 0-1.5 0zm13.125 8.445a.75.75 0 1 0-.75-1.298zm2.272-4.32a.75.75 0 1 0 1.298.75zM5.14 5.07a.75.75 0 1 0 1.056 1.066zm13.722.067c-3.82-3.82-9.993-3.859-13.788-.064l1.06 1.06c3.2-3.199 8.423-3.18 11.668.065zM5.074 5.074L3.808 6.34l1.06 1.06l1.267-1.265zm-.74 2.547l2.546.012l.007-1.5l-2.545-.012zm.754-.754L5.075 4.32l-1.5.008l.013 2.545zM12 3.75A8.25 8.25 0 0 1 20.25 12h1.5A9.75 9.75 0 0 0 12 2.25zm0 16.5A8.25 8.25 0 0 1 3.75 12h-1.5A9.75 9.75 0 0 0 12 21.75zm4.125-1.103A8.209 8.209 0 0 1 12 20.25v1.5c1.775 0 3.44-.475 4.875-1.305zM20.25 12a8.209 8.209 0 0 1-1.103 4.125l1.298.75A9.708 9.708 0 0 0 21.75 12zM6.196 6.137A8.221 8.221 0 0 1 12 3.75v-1.5a9.721 9.721 0 0 0-6.86 2.821z" />
                  </g>
                </svg>
              </UTooltip>
        </div>

        <UModal :ui="{
            width: 'w-full sm:max-w-3xl',
            base:''
        }" v-model="model">
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
                            @click="model = false" />
                    </div>
                </template>

                <div class="max-h-[500px] relative text-left rtl:text-right flex flex-col overflow-y-auto"  v-if="log">
                    <div class="my-4 bg-gray-50 dark:bg-slate-700 p-2 rounded-lg" v-for="item in log">

                        <UTable :columns="[{ 'key': 'old', 'label': 'Old' }, { 'key': 'new', 'label': 'New' }]"
                            :rows="item.items">

                            <template #new-data="{ row }">
                                <UFormGroup :label="row.new.key">
                                    <label class="px-2 bg-green-300 text-primary ">{{ row.new.value }}</label>
                                </UFormGroup>
                            </template>

                            <template #old-data="{ row }">
                                <UFormGroup :label="row.old.key">
                                    <label class="px-2 line-through bg-red-300 text-primary">{{ row.old.value }}</label>
                                </UFormGroup>
                            </template>

                        </UTable>
                        <p class="text-sm">Happened at: <span class="underline text-primary">{{ item.at }}</span></p>
                    </div>


                </div>

            </UCard>
        </UModal>

    </div>


</template>


<script setup>
const model = defineModel()
const log = ref(null);

const props = defineProps({
    response: {
        default: {},
        required: true
    }
})

const openHistory = () => {
    model.value = true
    let collections = [];

    console.log(props.response.activities)

    props.response.activities.forEach(i => {
        let newAttributes = [];
        Object.keys(i.properties.attributes).forEach(key => {
            newAttributes.push({
                new: {
                    key,
                    value: i.properties.attributes[key]
                },
                old: {
                    key,
                    value: i.properties.old[key]
                }
            })
        })

        collections.push({ at: i.created_at, items: newAttributes })
    })



    log.value = collections
}


</script>