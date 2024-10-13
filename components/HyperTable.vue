<template>
  <UCard class="w-full" :ui="{
    base: '',
    ring: '',
    divide: 'divide-y divide-gray-200 dark:divide-gray-700 min-w-fit',
    header: { padding: 'px-4 py-5' },
    body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700 min-w-fit' },
    footer: { padding: 'p-4' },

  }">

    <UAccordion v-if="filters?.length" color="white" variant="soft"
      :default-open="!!Object.values(filterModel).some(i => Array.isArray(i) ? i.length : !!i)"
      :items="[{ slot: 'filters', label: 'الفلاتر', icon: 'i-heroicons-funnel' }]"
      :ui="{ wrapper: 'flex flex-col w-full px-3 py-2' }">
      <template #filters="{}">
        <div class="flex items-center flex-wrap">
          <UFormGroup class="w-1/4 px-4 py-2" :label="filter.label" v-for="(filter, index) in filters" :key="index">
            <div>
              <USelectMenu v-model="filterModel[`${filter.key}`]" value-attribute="value" :options="filter?.options"
                :multiple="filter?.multiple" :placeholder="filter.label" :searchable="filter?.searchable"
                :searchable-placeholder="filter?.searchable_label ?? 'Search...'" class=" w-full relative">
                <template #label>
                  <span v-if="!filter?.options && filterModel[`${filter.key}`]" class="block truncate">
                    <Icon name="eos-icons:loading" /> loading ...
                  </span>
                  <span v-else-if="filter?.multiple && Array.isArray(filterModel[`${filter.key}`])
                    && filterModel[`${filter.key}`].length
                    && Number.isInteger(parseInt(filterModel[`${filter.key}`][0]) || filterModel[`${filter.key}`][0])
                  " class="block truncate">{{
                    filterModel[`${filter.key}`].length }} selected</span>
                  <span
                    v-else-if="!filter?.multiple && (typeof filterModel[`${filter.key}`] == 'number' || !!filterModel[`${filter.key}`])"
                    class="block truncate">
                    {{ filter?.options?.filter(i => i.value == filterModel[`${filter.key}`])[0]?.label }}
                  </span>
                  <span v-else class="block truncate">{{
                    (Array.isArray(filterModel[`${filter.key}`]) && filterModel[`${filter.key}`].length) ?
                      filterModel[`${filter.key}`].join(', ') :
                      filter.label
                  }}</span>
                </template>
              </USelectMenu>
            </div>

          </UFormGroup>

            <UFormGroup  class="w-1/4 px-4 py-2" label="التاريخ" >
  
              <UPopover  :popper="{ placement: 'bottom-start' }">
                <UButton class="w-full" color="white"  v-if="filterModel.dateRange" icon="i-heroicons-calendar-days-20-solid">
                  {{ format(filterModel.dateRange.start, 'd MMM, yyy') }} - {{ format(filterModel.dateRange.end, 'd MMM, yyy') }}
                </UButton>
                <UButton class="w-full" color="white" @click="setDateRange" v-else icon="i-heroicons-calendar-days-20-solid">
                    التاريخ
                </UButton>
    
                <template #panel="{ close }">
                  <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
                    <div class="hidden sm:flex flex-col py-4">
                      <UButton v-for="(range, index) in ranges" :key="index" :label="range.label" color="gray"
                        variant="ghost" class="rounded-none px-6"
                        :class="[isRangeSelected(range.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
                        truncate @click="selectRange(range.duration)" />
                    </div>
    
                    <DatePicker v-model="filterModel.dateRange" @close="close" />
                  </div>
                </template>
              </UPopover>
            </UFormGroup>



        </div>
        <div class="flex items-center justify-end gap-3 flex-wrap pt-5 px-4">
          <UButton icon="i-heroicons-x-mark" color="gray" variant="solid" size="xs"
            :disabled="!Object.keys(filterModel).length" @click="resetFilters">
            اعادة
          </UButton>
          <UButton icon="i-heroicons-funnel" color="primary" variant="solid" size="xs"
            :disabled="!Object.keys(filterModel).length" @click="filter">
            فلترة
          </UButton>
        </div>
      </template>
    </UAccordion>

    <!-- Filters -->
    <div class="flex items-center justify-between gap-3 px-4 py-3">

      <div class="flex items-center gap-1.5">
        <span class="text-sm leading-5">Per page:</span>

        <USelect v-model="query.perPage" :options="[3, 5, 10, 20, 30, 40]" size="xs" />
        <UInput @keyup="filterSearch" v-model="search" icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Search..." />
      </div>

      <div class="flex">

        <UDropdown class="mx-2" v-if="selectedRows.length > 1" :items="bulkActions" :ui="{ width: 'w-36' }">
          <UButton icon="i-heroicons-chevron-down" trailing color="gray" size="xs">
            Mark as
          </UButton>
        </UDropdown>
        <slot name="extra-header" />
      </div>
    </div>

    <!-- Table -->
    <UTable v-if="response?.data" :ui="ui" v-model="selectedRows" :rows="response?.data" :columns="[...columns, {
      key: 'actions',
      label: 'اجراءات'
    }]" :loading="pending" sort-asc-icon="i-heroicons-arrow-up" sort-desc-icon="i-heroicons-arrow-down" class="w-full">
      <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
        <slot v-if="!pending" :name="slot" v-bind="props" :response="response" />
      </template>

      <template>
        <slot v-if="!pending" :name="slot" v-bind="props" :response="response" />
      </template>

      <template #id-data="{ row }">
        <NuxtLink class="text-primary dark:text-gray-400 font-bold underline" :to="`${$route.path}/${row.id}`">
          {{ row.id }}
        </NuxtLink>
      </template>

      <template #actions-data="{ row }">
        <div class="flex gap-2">
          <NuxtLink :to="`${$route.path}/${row.id}`">
            <UTooltip text="View">
              <Icon class="hover:text-primary mx-1" name="carbon:view" />
            </UTooltip>
          </NuxtLink>

          <NuxtLink :to="`${$route.path}/${row.id}/edit`">
            <UTooltip text="Edit">
              <Icon class="hover:text-primary mx-1" name="carbon:edit" />
            </UTooltip>
          </NuxtLink>
          <slot name="extra-actions" />
        </div>
      </template>

    </UTable>

    <!-- Number of rows & Pagination -->
    <template #footer>
      <div class="flex flex-wrap justify-between items-center">
        <div>
          <span class="text-sm leading-5">
            Showing
            <span class="font-medium">{{ pageFrom }}</span>
            to
            <span class="font-medium">{{ pageTo }}</span>
            of
            <span class="font-medium">{{ response?.total || 0 }}</span>
            results
          </span>
        </div>

        <UPagination v-model="query.page" :page-count="parseInt(query.perPage)" :total="response?.total || 0" :ui="{
          wrapper: 'flex items-center gap-1',
          rounded: '!rounded-full min-w-[32px] justify-center',
          default: {
            activeButton: {
              variant: 'outline'
            }
          }
        }" />
      </div>
    </template>
  </UCard>

  <UModal fullscreen :ui="{
    fullscreen: 'max-w-4xl w-full mx-4 rounded-lg',
    container: 'flex min-h-full items-start pt-[10%] justify-center text-center ',
    rounded: 'rounded-lg',
  }" v-model="bulkEditOpen">
    <BulkEdit :columns="columns" :items="selectedRows" />
  </UModal>

  <UModal v-model="bulkDeleteOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        Are you sure to delete ?
      </template>

      <UTable :columns="[{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }]" :rows="selectedRows" />

      <template #footer>
        <div class="flex justify-between">
          <UButton @click="bulkDeleteOpen = false" color="gray" label="Cancel" />
          <UButton @click="bulkDelete" color="red" label="Delete" />
        </div>
      </template>
    </UCard>
  </UModal>

</template>


<script setup>
import useApiFetch from "~/composables/UseApiFetch";

import { sub, format, isSameDay } from 'date-fns'

const ranges = [
  { label: 'Last 7 days', duration: { days: 7 } },
  { label: 'Last 14 days', duration: { days: 14 } },
  { label: 'Last 30 days', duration: { days: 30 } },
  { label: 'Last 3 months', duration: { months: 3 } },
  { label: 'Last 6 months', duration: { months: 6 } },
  { label: 'Last year', duration: { years: 1 } }
]
const dateRange = ref({ start: sub(new Date(), { days: 14 }), end: new Date() })

function isRangeSelected(duration) {
  return isSameDay(dateRange.value.start, sub(new Date(), duration)) && isSameDay(dateRange.value.end, new Date())
}

function selectRange(duration) {
  dateRange.value = { start: sub(new Date(), duration), end: new Date() }
}



const props = defineProps({
  url: "",
  columns: {
    type: Array,
    default: [],
  },
  filters: {
    type: Array,
    default: [],
  },
  ui: {
    type: Object,
    default: {},
  },
  bulkActions: {
    type: Array,
    default: null,
  },
});

// Selected Rows
const selectedRows = ref([]);
const timer = ref(null);
const bulkEditOpen = ref(false);
const bulkDeleteOpen = ref(false);
const router = useRouter();


const canEdit = () => {
  let currentRouter = router.currentRoute.value
  let pattern = new RegExp(`(?=${currentRouter.name}-)(.*-edit)$`, "gi")
  let exists = router.getRoutes().filter(i => pattern.test(i.name)).length;
  let canVisit = useNuxtApp().$can(`update ${currentRouter.name}`)


  return exists && canVisit
}
const defaultActions = [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    shortcuts: ['E'],
    disabled: !canEdit(),
    click: () => {

      bulkEditOpen.value = true

    }
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
    shortcuts: ['D'],
    disabled: true
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    shortcuts: ['⌘', 'D'],
    click: () => {
      bulkDeleteOpen.value = true
    }
  }]
]

const bulkActions = ref(props.bulkActions || defaultActions)

function select(row) {
  const index = selectedRows.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selectedRows.value.push(row);
  } else {
    selectedRows.value.splice(index, 1);
  }
}

const resetPagination = () => {
  query.page = 1;
  query.perPage = 10;
};

const resetFilters = () => {
  Object.keys(query).forEach((key) => delete query[key]);
  Object.keys(filterModel).forEach((i) => {
    Array.isArray(filterModel[i]) ? filterModel[i] = [] : delete filterModel[i];
  });
  resetPagination()
};

const filter = () => {
  resetPagination();
  Object.assign(query, { ...filterModel, search: search.value });
};

const filterSearch = () => {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }

  timer.value = setTimeout(() => {
    filter();
  }, 800);
};



const filterModel = reactive({});

const route_query = router.currentRoute.value.query;
const search = ref(route_query.search ?? "");
const default_query = {
  ...route_query,
  page: parseInt(route_query.page ?? 1),
  perPage: parseInt(route_query.perPage ?? 10),
}
const query = reactive(default_query);

const bulkDelete = () => {
  selectedRows.value.forEach(i => {
    useApiFetch(`${router.currentRoute.value.name}/${i.id}`, {
      method: "DELETE"
    }).then(res => {
      const toast = useToast()
      toast.add({
        title: "deleted successfully",
        color: 'green',
        icon: ''
      })
    }).catch(err => {
      const toast = useToast()
      toast.add({
        title: err.response._data.message,
        color: 'red',
        icon: ''
      })
    }).finally(() => {
      bulkDeleteOpen.value = false
      refresh()
    })
  })
}

const setDateRange = () => {
  filterModel.dateRange = dateRange;
}

props.filters.forEach((filter) => {
  if (route_query.hasOwnProperty(`${filter.key}`)) {
    filterModel[`${filter.key}`] = filter.multiple ? [].concat(route_query[`${filter.key}`]) : route_query[`${filter.key}`];
  } else if (filter.multiple) {
    filterModel[`${filter.key}`] = []
  }
});

const pageFrom = computed(() => (query.page - 1) * query.perPage + 1);
const pageTo = computed(() => Math.min(query.page * query.perPage, 87));

// Data
const { data: response, pending, refresh } = useLazyAsyncData(
  "response",
  () =>
    useApiFetch(props.url, {
      query :{sortDesc:true ,...query},
    }),
  {
    default: () => ({
      total: 0,
    }),
    watch: [query],
  }
);

watch(query, (value) => {
  router.replace({ query: value });
});


defineExpose({
  refresh,
  response,
});



</script>
