<template>
  <UCard class="w-full" >
    <div v-if="info_resource">
      <div class="py-4 mb-8 rounded-md ">
        <div v-if="$can('update rules')" class="flex justify-end">
          <History v-if="response.activities.length" :response="response"   />

          <NuxtLink :to="{ name: 'rules-id-edit', params: { id: resource.id } }">
            <UButton icon="i-heroicons-pencil-square" color="primary" label="Edit" variant="outline" />
          </NuxtLink>
        </div>

        <div class="grid my-4 gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
          <UAlert :ui="{ title: 'truncate' }" :title="response.is_default ? 'Default' : 'Custom'"
            :color="response.is_default ? 'green' : 'orange'" variant="outline" />

          <UAlert :ui="{ title: 'truncate' }" :title="'During ' + $dayjs.duration(response.interval, 'm').humanize()"
            color="green" variant="outline" />
        </div>

        <div class="grid grid-cols-3 overflow-y-auto">

          <div class="flex flex-col p-4 ">

            <resource disabled :resource="info_resource">
              <template #description="{ value }">
                <UTextarea disabled :rows="9" icon="i-heroicons-rule-circle" size="md" :model-value="value"
                  variant="outline" />
              </template>

              <template #is_default="{ value }">
                <UToggle :model-value="value" />
              </template>

            </resource>
          </div>
          <div class="p-4 flex-1 col-span-2 overflow-y-auto">

            <UFormGroup class="my-2 capitalize" label="Tables" name="table">
              <div class="grid grid-cols-4 items-center">
                <div class="">
                  <UInput disabled="" :model-value="query_resource.table" />
                </div>

                <div v-for="(table, indexTable) in query_resource.tables" :key="indexTable" class="grid items-center"
                  style="grid-template-columns: 45px auto">
                  <div class="px-2 flex flex-col items-center">
                    <span>|</span>
                    <small>Join</small>
                    <span>|</span>
                  </div>
                  <div class="flex gap-1 items-center relative">
                    <UInput disabled="" :model-value="table" />
                  </div>
                </div>
              </div>
            </UFormGroup>

            <UFormGroup class="my-5 capitalize" name="distinct" :ui="{ label: { wrapper: 'flex gap-5 justify-start' } }"
              label="Distinct">
              <template #hint>
                <UToggle icon="i-heroicons-rule-circle" size="md" disabled :model-value="!!query_resource.distinct"
                  variant="outline" />
              </template>
              <template #default>
                <div v-if="!!query_resource.distinct" class="grid grid-cols-3 items-center">
                  <UInput disabled="" :model-value="query_resource.distinct" />
                </div>
              </template>
            </UFormGroup>

            <UFormGroup class="my-2 capitalize" label="Conditions">
              <div class="border p-4">
                <div v-for="(condition, indexGroup) in query_resource.conditions" :key="indexGroup"
                  class="my-2 capitalize flex flex-col gap-5">
                  <UChip :ui="{
                    base: '-mx-2 rounded-full  absolute top-1/2 me-2 bg-transparent dark:bg-transparent w-14 h-[30px]',
                  }" v-if="condition.attached">
                    <UDivider class="my-2" :label="condition.attached" />
                  </UChip>
                  <div class="p-4 flex flex-col gap-5 border border-gray-500 rounded">
                    <div v-for="(statement, index) in condition.statements" class="relative">
                      <div class="relative">
                        <UDivider class="mb-3" v-if="index" :label="condition.joins[index - 1]" />
                        <UChip :ui="{
                          wrapper: '',
                          base: '-mx-2 rounded-full  absolute right-0 top-1/2  me-2 bg-transparent dark:bg-transparent w-12 h-[25px]',
                        }" v-if="index">
                        </UChip>
                      </div>

                      <div class="grid grid-cols-3 gap-3">
                        <UFormGroup :name="`conditions.${indexGroup}.statements.${index}.column`">
                          <UInput disabled :model-value="statement.column" />

                        </UFormGroup>

                        <UFormGroup :name="`conditions.${indexGroup}.statements.${index}.operator`">
                          <UInput disabled :model-value="statement.operator" />
                        </UFormGroup>

                        <UFormGroup :name="`conditions.${indexGroup}.statements.${index}.operator`">
                          <UInput class="mb-2" v-for="(value, inputIndex) in statement.value" disabled
                            :model-value="value" />
                        </UFormGroup>

                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </UFormGroup>

            <h4 class="text-sm text-black">Determiner</h4>
            <div class="flex gap-3">
              <UFormGroup class="my-2 capitalize" name="basedOn.name">
                <div class="flex items-center gap-3">
                  <label class="text-sm  text-nowrap" for="based_on">Based on</label>
                  <UInput disabled :model-value="query_resource.basedOn.name" />
                </div>
              </UFormGroup>



              <UFormGroup name="basedOn.value" class="flex items-center">
                <div v-if="query_resource.basedOn.name == 'sum'" disabled class="relative">
                  <UInput disabled :model-value="query_resource.basedOn.value" />
                </div>
              </UFormGroup>

              <UFormGroup name="basedOn.operator" class="flex items-center">
                <UInput disabled :model-value="query_resource.basedOn.operator" />

              </UFormGroup>

              <UFormGroup name="basedOn.result" class="flex items-center">

                <div class="flex items-center gap-2">
                  <label for="based_on">Result: </label>
                  <UInput disabled :model-value="query_resource.basedOn.result" />
                </div>
              </UFormGroup>

            </div>
            <UFormGroup name="basedOn.groupBy">
              <div v-if="query_resource.basedOn.name == 'sum'" class="flex items-center gap-2 mr-20 mt-5 groupBy">
                <label for="based_on">Group by:</label>
                <div class="relative mx-3">
                  <UInput disabled :model-value="query_resource.basedOn.groupBy" />
                </div>
              </div>
            </UFormGroup>

          </div>

        </div>
      </div>

    </div>
    <div class="px-4" v-else>
      <skeleton  :count="8" />
    </div>
  </UCard>
</template>

<style scoped>
.groupBy {
  position: relative;
}

.groupBy::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -60px;
  width: 50px;
  height: 40px;
  border: #8080806b 1px solid;
  border-top-color: transparent;
  border-right-color: transparent;
}
</style>



<script>
import useApiFetch from "~/composables/UseApiFetch";
import options from "../options";

export default {
  data() {
    return {
      resource: {},
      response: {},
      info_resource: null,
      query_resource: null,
      open_history: false,
      options: options,

    };
  },

  mounted() {
    useApiFetch(`/rules/${this.$route.params.id}`).then((response) => {
      this.info_resource = {
        id: response.id,
        name: response.name,
        description: response.description,
        action: response.action,
        created_at: response.created_at,
      },
        this.query_resource = {
          table: response.table,
          tables: response.tables,
          distinct: response.distinct,
          conditions: response.conditions,
          basedOn: response.basedOn,
        },
        this.resource = response;
      this.response = response;
    });
  }
};

</script>