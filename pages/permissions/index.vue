<template>
  <div>
    <hyper-table ref="table" :columns="options.columns" :filters="options.filters" url="/permissions" :ui="{ th: { base: 'text-left' } }">
      <template #roles-data="{ row }">
        <UBadge v-for="role in row.roles" :key="role.name" :ui="{ rounded: 'rounded-full' }" class="mx-1 capitalize"
          size="xs" :label="role.name" :color="role.name.toLowerCase().includes('admin') ? 'emerald' : 'orange'" />
      </template>

      <template #extra-header>
        <UButton size="xs" @click="addModel = true" v-if="$can('create permissions')" label="Add permission" />
      </template>

      <template #name-data="{ row }">
        <NuxtLink 
        class="text-primary font-bold underline dark:text-gray-400 "
        :to="{name:'permissions-id' ,params:{id:row.id}}"
        >{{ row.name }}</NuxtLink>
      </template>
    </hyper-table>

    <USlideover v-model="addModel">


      <div class="p-4 flex-1">
        <UForm :schema="schema" :state="permission" @submit="createPermission">
          <div class="flex justify-end">
            <UButton type="submit" color="primary" variant="outline">
              <Icon name="heroicons:user-plus" />
              Create permission
            </UButton>
          </div>

          <UFormGroup class="my-2 capitalize" label="Name" name="name">
            <UInput icon="i-heroicons-permission-circle" size="md" v-model="permission.name" variant="outline" />
          </UFormGroup>
          <UFormGroup class="my-2 capitalize" label="E-mail" name="email">
            <UInput icon="i-heroicons-at-symbol" size="md" v-model="permission.email" variant="outline" />
          </UFormGroup>
          <UFormGroup class="my-2 capitalize" label="Password" name="password">
            <UInput icon="i-heroicons-finger-print-solid" size="md" type="password" v-model="permission.password" variant="outline" />
          </UFormGroup>
          <UFormGroup class="my-2 capitalize" label="Roles" name="roles">
            <USelectMenu v-model="permission.roles" value-attribute="value" option-attribute="value" :searchable="options.searchAsync" multiple placeholder="Select roles..." />
          </UFormGroup>
        </UForm>
      </div>
    </USlideover>
  </div>
</template>



<script setup>
import options from "./options";
import { any, email, minLength, object, string } from 'valibot';

const schema = object({
  name: string('Name is required'),
  description: string('Email is required', [email('Invalid email')]),
});

definePageMeta({
  auth: {
    permission: "view permissions",
  },
});
</script>

<script>
import useApiFetch from '~/composables/UseApiFetch';




export default {
  data() {
    return {
      addModel: false,
      permission: {
        roles: [],
      },
      options: options,
    }
  },
  methods: {
    createPermission() {
      useApiFetch(`/permissions`, { method: "POST", body: this.permission })
        .then(() => {
          this.addModel = false;
          this.$refs.table.refresh()
          this.permission = {
            roles:[]
          }

        });
    }
  }
}
</script>


