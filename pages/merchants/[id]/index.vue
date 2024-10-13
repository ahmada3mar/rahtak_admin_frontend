<template>
  <div>
  <div v-if="response">

    <div class="py-4 mb-8 rounded-md bg-white-bk" >
      <UCard class="w-full" :ui="{
        base: 'p-5',
        ring: '',
        divide: 'divide-none',
        header: { padding: 'px-4 py-5' },
        body: { padding: '', base: 'min-w-fit' },
        footer: { padding: 'p-4' },

      }">
        <div v-if="$can('update merchants')" class="flex justify-end">
          <History v-if="response?.activities?.length" :response="response"   />
          <NuxtLink :to="{ name: 'merchants-id-edit', params: { id: resource.id } }">
            <UButton icon="i-heroicons-pencil-square" color="primary" label="Edit" variant="outline" />
          </NuxtLink>
        </div>

        <resource disabled :resource="resource" />
        <UFormGroup label="Rules">
          <USelectMenu disabled="" v-model="response.rules_ids" value-attribute="id" option-attribute="name"
            :options="response?.available_rules" multiple placeholder="Rules">

            <template #option="{ option }">
              <UBadge class="capitalize text-[10px] p-1 py-0 justify-center w-11"
                :label="option.is_default ? 'default' : 'custom'" :color="option.is_default ? 'blue' : 'teal'" />
              <span class="pl-2 col-start-2">{{ option.name }}</span>
            </template>


            <template #label>
              <span v-if="response?.rules_ids?.length">
                <UBadge v-for="(rule, index) in response.rules_ids" class="mr-2 capitalize justify-center" size="xs"
                  :label="response?.available_rules.filter(i => i.id == rule)[0]?.name || 'N/A'" color="primary" :key="index" />
              </span>
              <span v-else>No rules attached</span>
            </template>
          </USelectMenu>
        </UFormGroup>
      </UCard>

    </div>
    <div class="py-4 mb-8 rounded-md bg-white-bk">
      <UCard class="w-full" :ui="{
        base: '',
        ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700 min-w-fit',
        header: { padding: 'px-4 py-5' },
        body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700 min-w-fit' },
        footer: { padding: 'p-4' },

      }">
        <div class="p-4 flex justify-between items-center">
          <p >Configs</p>
        </div>



        <UTable :ui="{ th: { base: 'text-left' } }" :rows="config.values" sort-asc-icon="i-heroicons-arrow-up"
          sort-desc-icon="i-heroicons-arrow-down" class="w-full">


          <template #empty-state>
            <div class="flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14">

              <div class="flex items-center justify-center mb-4 gap-5">
                <Icon color="rgb(var(--color-gray-400) / var(--tw-text-opacity))" name="iconoir:info-empty"
                  size="50px" />
                <span class="text-gray-400">No Configs</span>
              </div>
            </div>
          </template>

        </UTable>
      </UCard>

    </div>

    <div class="py-4 mb-8 rounded-md bg-white-bk">
      <UCard class="w-full" :ui="{
        base: '',
        ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700 min-w-fit',
        header: { padding: 'px-4 py-5' },
        body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700 min-w-fit' },
        footer: { padding: 'p-4' },

      }">
        <p class="p-4">Channels</p>


        <UTable :ui="{ th: { base: 'text-left' } }" :rows="response?.channels" :columns='[
          {
            key: "id",
            label: "Channel ID",
          },
          {
            key: "name",
            label: "Channel name",
          },
          {
            key: "created_at",
            label: "Created at",
          },
        ]' sort-asc-icon="i-heroicons-arrow-up" sort-desc-icon="i-heroicons-arrow-down" class="w-full">

          <template #id-data="{ row }">
            <NuxtLink :to="{ name: 'channels-id', params: { id: row?.id } }"
              class="text-primary font-bold underline dark:text-gray-400 ">
              {{ row?.id }}
            </NuxtLink>
          </template>



          <template #empty-state>
            <div class="flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14">

              <div class="flex items-center justify-center mb-4 gap-5">
                <Icon color="rgb(var(--color-gray-400) / var(--tw-text-opacity))" name="iconoir:info-empty"
                  size="50px" />
                <span class="text-gray-400">No channels</span>
              </div>
            </div>
          </template>

        </UTable>


      </UCard>

    </div>

  </div>
  <div v-else>
    <skeleton :count="8" />
  </div>
</div>

</template>


<script>
import useApiFetch from "~/composables/UseApiFetch";
import options from "../options";

export default {
  data() {
    return {
      response: null,
      resource: null,
      config: {
        values:[]
      },
      options: options,
    };
  },

  mounted() {
    useApiFetch(`/merchants/${this.$route.params.id}`).then((response) => {
      this.response = response;
      const {
        updated_at,
        created_by,
        created_at,
        channels,
        reviewed,
        config,
        rules_ids,
        available_rules,
        activities,
        ...resource
      } = response;

      this.resource = resource;
      this.response.rules_ids = this.response.rules_ids.filter(r=> this.response.available_rules.includes(r))

      if (this.response.config?.values) {
        Object.keys(this.response.config.values).forEach((name, index) => {
          this.config.values.push({ name, value:this.response.config.values[name] })
        })

      }


    });
  },
};
</script>