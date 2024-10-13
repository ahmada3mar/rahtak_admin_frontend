<template>
  <div>
  <hyper-table
    :columns="options.columns"
    :filters="options.filters"
    url="/transactions"
    :ui="{th: { base: 'text-left' }}"
  >
    <template #status-data="{ row }">
      <UBadge
        class="w-full flex justify-center"
        variant="outline"
        size="xs"
        :label="row.status"
        :color="options.resolveColor(row.status)"
      />
    </template>





    <template #merchant-data="{ row }">
      <NuxtLink
        class="text-primary font-bold underline dark:text-gray-400 "
        v-if="row.merchant?.name"
        :to="{name:'merchants-id' ,params:{id:row.merchant.id}}"
      >
        {{ row.merchant?.name }}
      </NuxtLink>
      <div v-else>
        N/A
      </div>
    </template>

    <template #actions-data="{ row }">
        <div class="flex gap-2">
          <NuxtLink :to="`${$route.path}/${row.id}`">
            <UTooltip text="View">
              <Icon class="hover:text-primary mx-1" name="carbon:view" />
            </UTooltip>
          </NuxtLink>
        </div>
      </template>

  </hyper-table>
</div>
</template>

<script setup>
import options from "./options";

definePageMeta({
  auth: {
    permission: "view transactions",
  },
});
</script>

