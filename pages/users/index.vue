<template>
  <div>
    <hyper-table ref="table" :columns="options.columns" :filters="options.filters" url="/users" :ui="{ th: { base: 'text-left' } }">
      <template #roles-data="{ row }">
        <UBadge v-for="role in row.roles" :key="role.name" :ui="{ rounded: 'rounded-full' }" class="mx-1 capitalize"
          size="xs" :label="role.name" :color="role.name.toLowerCase().includes('admin') ? 'emerald' : 'orange'" />
      </template>

      <template #extra-header>
        <UButton size="xs" @click="addUser = true" v-if="$can('create users')" label="Add User" />
      </template>

      <template #name-data="{ row }">
        <NuxtLink 
        class="text-primary font-bold underline dark:text-gray-400 "
        :to="{name:'users-id' ,params:{id:row.id}}"
        >{{ row.name }}</NuxtLink>
      </template>
    </hyper-table>

    <USlideover v-model="addUser">


      <div class="p-4 flex-1">
        <UForm :schema="schema" :state="user" @submit="createUser">
          <div class="flex justify-end">
            <UButton type="submit" color="primary" variant="outline">
              <Icon name="heroicons:user-plus" />
              Create User
            </UButton>
          </div>

          <UFormGroup class="my-2 capitalize" label="Name" name="name">
            <UInput icon="i-heroicons-user-circle" size="md" v-model="user.name" variant="outline" />
          </UFormGroup>
          <UFormGroup class="my-2 capitalize" label="E-mail" name="email">
            <UInput icon="i-heroicons-at-symbol" size="md" v-model="user.email" variant="outline" />
          </UFormGroup>
          <UFormGroup class="my-2 capitalize" label="Password" name="password">
            <UInput icon="i-heroicons-finger-print-solid" size="md" type="password" v-model="user.password" variant="outline" />
          </UFormGroup>
          <UFormGroup class="my-2 capitalize" label="Roles" name="roles">
            <USelectMenu v-model="user.roles" value-attribute="value" option-attribute="value" :searchable="options.searchAsync" multiple placeholder="Select roles..." />
          </UFormGroup>
          <UFormGroup class="my-2 capitalize" label="Groups" name="groups">
            <USelectMenu v-model="user.groups" value-attribute="value" option-attribute="label" :searchable="options.searchGroupAsync" multiple placeholder="Select groups..." />
          </UFormGroup>
        </UForm>
      </div>
    </USlideover>
  </div>
</template>



<script setup>
import options from "./options";
import { any, email, minLength, object, string, tuple } from 'valibot';

const schema = object({
  name: string('Name is required'),
  email: string('Email is required', [email('Invalid email')]),
  password: string('Password is required', [minLength(8)]),
  roles: tuple([any()], 'Roles is required')
});

definePageMeta({
  auth: {
    permission: "view users",
  },
});
</script>

<script>
import useApiFetch from '~/composables/UseApiFetch';




export default {
  data() {
    return {
      addUser: false,
      user: {
        roles: [],
        groups: [],
      },
      options: options,
    }
  },
  methods: {
    createUser() {
      useApiFetch(`/users`, { method: "POST", body: this.user })
        .then(() => {
          this.addUser = false;
          this.$refs.table.refresh()
          this.user = {
            roles:[]
          }

        });
    }
  }
}
</script>


