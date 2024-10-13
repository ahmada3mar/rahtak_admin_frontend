<template>
  <UCard class="w-full" >
    <div class="py-8 mb-8 rounded-md" v-if="rule">

      <UForm :schema="schema" :state="rule" @submit="save">
        <div v-if="$can('update rules')" class="flex justify-end gap-5">
          <UButton type="button" @click="testQuery(rule)" color="orange" variant="outline">
            <Icon name="heroicons:play-circle" />
            Test Rule
          </UButton>

          <UButton type="submit" color="primary" variant="outline">
            <Icon name="iconoir:save-floppy-disk" />
            Save
          </UButton>
        </div>


        <div class="grid grid-cols-3 overflow-y-auto">
          <div class="flex flex-col p-4">
            <UFormGroup class="my-2 capitalize" label="Name" name="name">
              <UInput icon="i-line-md-list-3-filled" v-model="rule.name" variant="outline" />
            </UFormGroup>

            <UFormGroup class="my-7 capitalize" label="Description" name="description">
              <UTextarea :rows="9" icon="i-heroicons-rule-circle" size="md" v-model="rule.description"
                variant="outline" />
            </UFormGroup>

            <UFormGroup name="action" class="my-5 capitalize" :ui="{ label: { wrapper: 'flex gap-5 justify-start' } }"
              label="Action">
              <USelectMenu v-model="rule.action" value-attribute="value" option-attribute="name"
                :options="[{ name: 'Send email', value: 'Email' }, { name: 'Phone Call', value: 'Call' }]"
                placeholder="Select Action" />
            </UFormGroup>




            <div class="flex my-4 justify-between">
              <label class="block font-medium text-gray-700 dark:text-gray-200 text-sm">Set as default Rule:
              </label>
              <UToggle icon="i-heroicons-rule-circle" size="md" v-model="rule.is_default" variant="outline" />
            </div>


            <UFormGroup class="my-2 capitalize" name="interval">
              <div class="flex flex-col gap-2">
                <URadioGroup :legend="''" :ui="{ fieldset: 'flex gap-3', }" @change="rule.interval = 1"
                  v-model="intervalSelected" :options="['Days', 'Hours', 'Minuets']" />
                <label class="text-sm text-gray-700 mt-2">{{ `interval ${$dayjs.duration(rule.interval,
                  'm').humanize()}`
                  }}</label>
                <URange class="my-2" size="md" :step="setStep(intervalSelected)" :max="setMax(intervalSelected)"
                  :min="1" v-model="rule.interval" variant="outline" />

              </div>
            </UFormGroup>
          </div>
          <div class="p-4 flex-1 col-span-2 overflow-y-auto">

            <UFormGroup class="my-2 capitalize" label="Tables" name="table">
              <div class="grid grid-cols-4 items-center">
                <div class="">
                  <USelectMenu v-model="rule.table" :options="Tables.map((i) => i.name)" placeholder="Table" />
                </div>

                <div v-for="(table, indexTable) in rule.tables" :key="indexTable" class="grid items-center"
                  style="grid-template-columns: 45px auto">
                  <div class="px-2 flex flex-col items-center">
                    <span>|</span>
                    <small>Join</small>
                    <span>|</span>
                  </div>
                  <div class="flex gap-1 items-center relative">
                    <USelectMenu v-model="rule.tables[indexTable]" class="flex-auto"
                      :options="Tables.map((i) => i.name).filter(r => !rule.tables.includes(r))" placeholder="Table" />
                    <UIcon role="button" @click="rule.tables.splice(indexTable, 1)" class="text-red-600"
                      name="i-heroicons-x-circle-16-solid" />
                  </div>
                </div>
              </div>
              <div class="flex float-right">
                <UButton :disabled="Tables.length <= rule.tables.length" class="ms-auto"
                  @click="rule.tables.push({ name: null })" color="primary" variant="solid" label="add table" />
              </div>
            </UFormGroup>

            <UFormGroup class="my-5 capitalize" name="distinct" :ui="{ label: { wrapper: 'flex gap-5 justify-start' } }"
              label="Distinct">
              <template #hint>
                <UToggle icon="i-heroicons-rule-circle" size="md" :disabled="!!!rule.table" v-model="rule.distinct"
                  variant="outline" />
              </template>
              <template #default>
                <div class="grid grid-cols-3 items-center">
                  <USelectMenu v-if="!!rule.distinct" v-model="rule.distinct" :options="Tables.filter(
                    (i) => i.name == rule.table
                  )[0].children.map((i) => i.name)
                    " placeholder="Column" />
                </div>
              </template>
            </UFormGroup>

            <UFormGroup class="my-2 capitalize" label="Conditions">
              <div class="border p-4">
                <div v-for="(condition, indexGroup) in rule.conditions" :key="indexGroup"
                  class="my-2 capitalize flex flex-col gap-5">
                  <UChip :ui="{
                    base: '-mx-2 rounded-full  absolute top-1/2 me-2 bg-transparent dark:bg-transparent w-14 h-[30px]',
                  }" v-if="condition.attached">
                    <template #content>
                      <UIcon @click="
                        rule.conditions = rule.conditions.filter(
                          (item, y) => y != indexGroup
                        )
                        " role="button" name="i-heroicons-x-circle-16-solid" class="w-full h-full text-red-500 " />
                    </template>
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
                          <template #content>
                            <UIcon @click="
                              condition.statements =
                              condition.statements.filter(
                                (item, y) => y != index
                              );
                            condition.joins = condition.joins.filter(
                              (i, x) => x != index - 1
                            );
                            " role="button" name="i-heroicons-x-circle-16-solid" class="w-full h-full text-red-500 " />
                          </template>
                        </UChip>
                      </div>

                      <div class="grid grid-cols-3 gap-3">
                        <UFormGroup :name="`conditions.${indexGroup}.statements.${index}.column`">

                          <div class="relative">
                            <select
                              class="appearance-none relative w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 inline-flex items-center text-left cursor-default rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 pe-9"
                              v-model="statement.column" name="" id="">
                              <template
                                v-for="(option, index) in Tables.filter((i) => rule.tables.includes(i.name) || i.name == rule.table)">
                                <optgroup v-if="option.children" :key="`${option.name}-optgroup-${index}`"
                                  :value="option.name" :label="option.name">
                                  <option v-for="(childOption, index2) in option.children"
                                    :key="`${option.name}.${childOption.name}`"
                                    :value="`${option.name}.${childOption.name}`"
                                    :selected="childOption.name === statement.column" :disabled="childOption.disabled"
                                    v-text="childOption.name" />
                                </optgroup>
                                <option v-else :key="`${option.name}-${index}`" :value="option.name"
                                  :selected="option.name === statement.column" :disabled="option.disabled"
                                  v-text="option.name" />
                              </template>
                            </select>
                            <span
                              class=" h-[34px] absolute inset-y-0 end-0 flex items-center pointer-events-none px-2.5"><span
                                class="i-heroicons-chevron-down-20-solid flex-shrink-0 text-gray-400 dark:text-gray-500 h-5 w-5"
                                aria-hidden="true"></span></span>
                          </div>
                        </UFormGroup>

                        <UFormGroup :name="`conditions.${indexGroup}.statements.${index}.operator`">
                          <USelectMenu :disabled="!rule.table" v-model="statement.operator" :key="index" :options="[
                            '=',
                            '!=',
                            '>',
                            '<',
                            '>=',
                            '<=',
                            'NOT IN',
                            'IN',
                          ]" placeholder="Operator" />
                        </UFormGroup>


                        <div class="flex flex-col gap-2" v-if="statement.custom">
                          <UFormGroup v-for="(value, inputIndex) in statement.value"
                            :name="`conditions.${indexGroup}.statements.${index}.value.${inputIndex}`">
                            <UInput type="text" :ref="`input-${index}`" :disabled="!rule.table"
                              v-model="statement.value[inputIndex]"
                              :placeholder="`value ${['IN', 'NOT IN'].includes(statement.operator) ? inputIndex + 1 : ''}`"
                              :ui="{ icon: { trailing: { pointer: '' } } }">
                              <template #trailing>
                                <UIcon v-if="!inputIndex" @click="switchToSelect(statement)" role="button"
                                  name="i-heroicons-x-circle-16-solid" class="w-5 h-5 text-red-500 " />
                                <UIcon v-else @click="statement.value.splice(inputIndex, 1)" role="button"
                                  name="i-heroicons-trash" class="w-5 h-5 text-red-500 " />
                              </template>
                            </UInput>

                            <template #error="{ error }">
                              <div class="flex justify-center -mt-2">
                                <span v-if="error" class="text-red-500 text-xs dark:text-red-400 m-0 "> {{ error
                                  }}</span>
                              </div>
                            </template>
                          </UFormGroup>
                          <span v-if="['IN', 'NOT IN'].includes(statement.operator)" role="button"
                            class="float-left text-xs text-center mt-0 text-gray-500"
                            @click="statement.value.push('')">+
                            option</span>
                        </div>


                        <div v-else :disabled="!rule.table" class="relative">
                          <UFormGroup :name="`conditions.${indexGroup}.statements.${index}.value.0`">
                            <select
                              class="appearance-none relative w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 inline-flex items-center text-left cursor-default rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 pe-9"
                              v-model="statement.value[0]" name="" id="">
                              <template
                                v-for="(option, index) in Tables.filter((i) => rule.tables.includes(i.name) || i.name == rule.table)">
                                <optgroup v-if="option.children" :key="`${option.name}-optgroup-${index}`"
                                  :value="option.name" :label="option.name">
                                  <option v-for="(childOption, index2) in option.children"
                                    :key="`${option.name}.${childOption.name}`"
                                    :value="'`' + option.name + '`.`' + childOption.name + '`'"
                                    :selected="childOption.name === statement.value[0]" :disabled="childOption.disabled"
                                    v-text="childOption.name" />
                                </optgroup>
                                <option v-else :key="`${option.name}-${index}`" :value="option.name"
                                  :selected="option.name === statement.value[0]" :disabled="option.disabled"
                                  v-text="option.name" />
                              </template>
                            </select>
                            <span class="absolute inset-y-0 end-0 flex items-center h-8 px-2.5">
                              <UIcon @click="test(statement, index)" role="button"
                                name="i-heroicons-pencil-square-16-solid" class="w-5 h-5" />
                            </span>
                            <template #error="{ error }">
                              <div class="flex justify-center">
                                <p v-if="error" class="text-red-500 dark:text-red-400 m-0 "> {{ error }}</p>
                              </div>
                            </template>
                          </UFormGroup>
                        </div>



                      </div>

                    </div>
                    <div class="flex justify-end gap-5">
                      <UButton @click="
                        rule.conditions[indexGroup].statements.push({
                          column: '',
                          operator: '=',
                          value: [''],
                          custom: false
                        });
                      rule.conditions[indexGroup].joins.push('OR');
                      " color="orange" variant="soft" label="OR" />
                      <UButton @click="
                        rule.conditions[indexGroup].statements.push({
                          column: '',
                          operator: '=',
                          value: [''],
                          custom: false
                        });
                      rule.conditions[indexGroup].joins.push('AND');
                      " color="green" variant="soft" label="AND" />
                    </div>
                  </div>
                </div>
                <div class="flex justify-end gap-5">
                  <UButton @click="
                    rule.conditions.push({
                      statements: [{ column: '', operator: '=', value: [''] }],
                      joins: [],
                      attached: 'OR',
                    })
                    " color="orange" variant="soft" label="OR Group" />
                  <UButton @click="
                    rule.conditions.push({
                      statements: [{ column: '', operator: '=', value: [''] }],
                      joins: [],
                      attached: 'AND',
                    })
                    " color="green" variant="soft" label="AND Group" />
                </div>
              </div>
            </UFormGroup>

            <h4 class="text-sm">Determiner</h4>
            <div class="flex gap-5">
              <UFormGroup class="my-2 capitalize" name="basedOn.name">
                <div class="flex items-center gap-2">
                  <label for="based_on">Based on</label>
                  <USelectMenu :disabled="!rule.table" id="based_on" value-attribute="name" option-attribute="name"
                    v-model="rule.basedOn.name" :options="[{ name: 'sum' }, { name: 'count' }]"
                    placeholder="Based on" />
                </div>

                <template #error="{ error }">
                  <div class="flex justify-center">
                    <p v-if="error" class="text-red-500 dark:text-red-400 m-0 absolute"> {{ error }}</p>
                  </div>
                </template>


              </UFormGroup>



              <UFormGroup name="basedOn.value" class="flex items-center">
                <div v-if="rule.basedOn.name == 'sum'" :disabled="!rule.table" class="relative">
                  <select placeholder="field"
                    class="appearance-none relative w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 inline-flex items-center text-left cursor-default rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 pe-9"
                    v-model="rule.basedOn.value">
                    <option :value="null" :selected="true" :disabled="true" text="Field" />

                    <template
                      v-for="(option, index) in Tables.filter((i) => rule.tables.includes(i.name) || i.name == rule.table)">
                      <optgroup v-if="option.children" :key="`${option.name}-optgroup-${index}`" :value="option.name"
                        :label="option.name">
                        <option v-for="(childOption, index2) in option.children"
                          :key="`${option.name}.${childOption.name}`"
                          :value="'`' + option.name + '`.`' + childOption.name + '`'"
                          :selected="childOption.name === rule.basedOn.value" :disabled="childOption.disabled"
                          v-text="childOption.name" />
                      </optgroup>
                      <option v-else :key="`${option.name}-${index}`" :value="option.name"
                        :selected="option.name === rule.basedOn.value" :disabled="option.disabled"
                        v-text="option.name" />
                    </template>

                  </select>
                  <span class=" h-[34px] absolute inset-y-0 end-0 flex items-center pointer-events-none px-2.5"><span
                      class="i-heroicons-chevron-down-20-solid flex-shrink-0 text-gray-400 dark:text-gray-500 h-5 w-5"
                      aria-hidden="true"></span></span>
                </div>
                <template #error="{ error }">
                  <div class="flex justify-center">
                    <p v-if="error" class="text-red-500 dark:text-red-400 m-0 absolute"> {{ error }}</p>
                  </div>
                </template>
              </UFormGroup>

              <UFormGroup name="basedOn.operator" class="flex items-center">

                <USelectMenu :disabled="!rule.table" v-model="rule.basedOn.operator" :options="[
                  '>',
                  '<',
                  '>=',
                  '<=',
                ]" placeholder="Operator" />
                <template #error="{ error }">
                  <div class="flex justify-center">
                    <p v-if="error" class="text-red-500 dark:text-red-400 m-0 absolute"> {{ error }}</p>
                  </div>
                </template>
              </UFormGroup>

              <UFormGroup name="basedOn.result" class="flex items-center">

                <div class="flex items-center gap-2">
                  <label for="based_on">Result: </label>
                  <UInput :disabled="!rule.table" type="number" :min="1" v-model="rule.basedOn.result" />
                </div>
                <template #error="{ error }">
                  <div class="flex justify-center">
                    <p v-if="error" class="text-red-500 dark:text-red-400 absolute"> {{ error }}</p>
                  </div>
                </template>
              </UFormGroup>

            </div>
            <UFormGroup name="basedOn.groupBy">
              <div v-if="rule.basedOn.name == 'sum'" class="flex items-center gap-2 mr-20 mt-5 groupBy">
                <label for="based_on">Group by:</label>
                <div class="relative mx-3">
                  <select
                    class="appearance-none relative  disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 inline-flex items-center text-left cursor-default rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 pe-9"
                    v-model="rule.basedOn.groupBy" name="" id="">
                    <option :value="null" :selected="!rule.basedOn.value" text="None" />


                    <template
                      v-for="(option, index) in Tables.filter((i) => rule.tables.includes(i.name) || i.name == rule.table)">
                      <optgroup v-if="option.children" :key="`${option.name}-optgroup-${index}`" :value="option.name"
                        :label="option.name">
                        <option v-for="(childOption, index2) in option.children"
                          :key="`${option.name}.${childOption.name}`"
                          :value="'`' + option.name + '`.`' + childOption.name + '`'"
                          :selected="childOption.name === rule.basedOn.value" :disabled="childOption.disabled"
                          v-text="childOption.name" />
                      </optgroup>
                      <option v-else :key="`${option.name}-${index}`" :value="option.name"
                        :selected="option.name === rule.basedOn.value" :disabled="option.disabled"
                        v-text="option.name" />
                    </template>

                  </select>
                  <span class=" h-[34px] absolute inset-y-0 end-0 flex items-center pointer-events-none px-2.5"><span
                      class="i-heroicons-chevron-down-20-solid flex-shrink-0 text-gray-400 dark:text-gray-500 h-5 w-5"
                      aria-hidden="true"></span></span>
                </div>
              </div>
              <template #error="{ error }">
                <div class="flex justify-center">
                  <p v-if="error" class=" text-red-500 dark:text-red-400 m-0 absolute"> {{ error }}</p>
                </div>
              </template>
            </UFormGroup>
          </div>
        </div>
      </UForm>

    </div>

    <div class="px-5"v-else>
      <skeleton :count="8" />
    </div>
    <UModal id="lll" :ui="{
        width: 'w-full sm:max-w-3xl',
      }" v-model="isOpen">
        <UCard :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                Test Result
              </h3>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                @click="isOpen = false" />
            </div>
          </template>

          <div>
            <p class="text-sm m-0 mb-2">Query: {{ resultTest.time }} milliseconds</p>
            <codemirror v-model:value="resultTest.query" :tabSize="2" :readOnly="true" :options="{
              mode: 'text/x-sql',
              theme: 'dracula',
              lineWrapping: true,
              styleActiveLine: false,
            }" />
          </div>

          <template #footer>
            <div v-if="resultTest.error">
              <UAlert icon="i-heroicons-command-line" color="red" variant="subtle" title="Error: "
                :description="resultTest.error" />
            </div>
            <div v-else>
              <p class="text-sm m-0 mb-2">Rows:</p>
              <div class="p-3 rounded border-gray-100 border">
                <UTable :rows="resultTest.rows" />
              </div>
            </div>
          </template>
        </UCard>
      </UModal>
  </UCard>
</template>


<script>
import useApiFetch from "~/composables/UseApiFetch";
import options from "../options";
import { pipe, maxValue, nonEmpty, number, safeParseAsync, array, minValue, minLength, object, string, custom } from "valibot";

import Codemirror from "codemirror-editor-vue3";

import "codemirror/mode/sql/sql.js";
import "codemirror/theme/dracula.css";



export default {
  components:{
    Codemirror
  },
  setup() {
    definePageMeta({
      auth: {
        permission: "update rules",
      },
    });


    const Tables = ref([]);
    const rule = ref({
      name: null,
      description: null,
      interval: 1,
      table: null,
      distinct: null,
      is_default: false,
      basedOn: {
        name: null,
        value: null,
        result: null,
        groupBy: null,
        operator: null
      },
      tables: [],
      conditions: [
        {
          statements: [{ column: "", operator: "=", value: [''] }],
          joins: [],
          attached: null,
        },
      ],
    },);


    const schema = object({
      name: pipe(string("Name is required"), nonEmpty("Name is required")),
      description: pipe(string("Description is required"), nonEmpty("Description is required")),
      interval: number("interval is required", [minValue(1), maxValue(43200)]),
      action: string("action is required"),
      table: pipe(string("Table is required"), custom(table => Tables.value.map(i => i.name).includes(table), "invalid table name")),
      description: string("Description is required"),
      // password: string("Password is required", [minLength(8)]),
      distinct: pipe(custom((distinct) => {

        if (distinct && rule.value.table) {
          return Tables.value.filter(i => i.name == rule.value.table)[0].children.map(c => c.name).includes(distinct)
        }
        return true

      }, 'invalid column name')),


      conditions: array(
        object({
          statements: array(
            object({
              column: pipe(string("column is required"), nonEmpty("column is required")),
              operator: pipe(string("operator is required"), nonEmpty("operator is required")),
              value: array(
                pipe(string("value is required"), nonEmpty("value is required"), minLength(1))
              ),
            }))
        }))
      ,

      basedOn: object({
        name: pipe(string("Name is required"), nonEmpty("based on is required")),
        operator: pipe(string("operator is required"), nonEmpty("operator is required")),
        value: pipe(custom((value) => !(rule.value.basedOn.name == "sum" && !value), "field is required")),
        result: pipe(number("result should be a number"), nonEmpty("result is required"), minValue(1, 'should be grater than 0')),
      })
    });

    return {
      rule,
      Tables,
      schema
    }

  },
  data() {
    return {
      options: options,
      intervalSelected: "Minuets",
      isOpen: false,
      resultTest: {
        error: null,
        query: null,
        rows: [],
      },
    };
  },
  mounted() {
    useApiFetch(`/rules/${this.$route.params.id}`).then((response) => {
      this.rule = response;
      this.Tables = response.availableTables?.tables || []

    });
  },
  methods: {
    searchAsync: async (search) => {
      const { data } = await useApiFetch(`/roles`, {
        query: { search },
      });
      return data.map((role) => role.name);
    },
    save() {
      useApiFetch(`/rules/${this.$route.params.id}`, {
        method: "PUT",
        body: this.rule,
      }).then(() => {
        const toast = useToast();
        toast.add({
          title: "User updated success",
          icon: "i-heroicons-check-circle-20-solid",
        });
        useRouter().replace({
          name: "rules-id",
          params: { id: this.$route.params.id },
        });
      });
    },
    async openSideWithRes() {
      this.addRule = true
      await this.$refs.rule_table?.response
      this.Tables = this.$refs.rule_table?.response?.tables
    },

    test(statement, index) {
      // statement.value = [statement.value];
      statement.custom = true;
      nextTick(() => {
        this.$refs[`input-${index}`][0].input.select();
      });
    },
    switchToSelect(statement) {
      statement.custom = false;
    },
    setMax(intervalSelected) {
      if (intervalSelected == 'Days')
        return 43200
      if (intervalSelected == 'Hours')
        return 1440
      if (intervalSelected == 'Minuets')
        return 60
    },
    setStep(intervalSelected) {
      if (intervalSelected == 'Days')
        return 1440
      if (intervalSelected == 'Hours')
        return 60
      if (intervalSelected == 'Minuets')
        return 1
    },
    testQuery(query) {
      const rule = JSON.parse(JSON.stringify(query))
      useApiFetch("/test", { method: "POST", body: rule })
        .then((r) => {
          this.isOpen = true;
          this.resultTest = {
            error: r.error,
            query: r.query,
            rows: r.rows,
            time: r.time ? r.time : 0,
          };
        })
    },
  },
};
</script>