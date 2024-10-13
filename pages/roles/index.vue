<template>
  <div>
    <hyper-table ref="table" :columns="options.columns" :filters="options.filters" url="/roles" :ui="{ th: { base: 'text-left' } }">
      <template #roles-data="{ row }">
        <UBadge v-for="role in row.roles" :key="role.name" :ui="{ rounded: 'rounded-full' }" class="mx-1 capitalize"
          size="xs" :label="role.name" :color="role.name.toLowerCase().includes('admin') ? 'emerald' : 'orange'" />
      </template>

      <template #permissions-data="{ row , response }">
        <div v-if="row.permissions?.length">

          <UBadge  v-for="permission in response.permissions?.map(i=>i.name)" :key="permission" 
          :title="permission" :ui="{ rounded: 'rounded-full'  }" 
          :color="row.permissions?.map(i=>i.name).includes(permission) ? 'emerald' : 'gray'"
          class="mx-1 w-4 h-4 " />
        </div>  
        <span v-else>{{row.name}} has no permissions yet</span>
      </template>

      <template #extra-header>
        <UButton size="xs" @click="openSideWithRes" v-if="$can('create roles')" label="Add Role" />
      </template>
    </hyper-table>

    <USlideover  v-model="openSide">


      <div class="p-4 flex-1">
        <UForm :schema="schema" :state="resource" @submit="createResource">
          <div class="flex justify-end">
            <UButton type="submit" color="primary" variant="outline">
              <Icon name="heroicons:user-plus" />
              Create User
            </UButton>
          </div>

          <UFormGroup class="my-2 capitalize" label="Name" name="name">
            <UInput icon="i-heroicons-shield-exclamation" size="md" v-model="resource.name" variant="outline" />
          </UFormGroup>
          <UFormGroup class="my-2 capitalize" label="Permissions" name="permissions">
            <div class="my-4"  v-for="group, index1 in Object.keys(allPermissions)" :key="index1">
              <h4 >{{ group }}</h4>
              <div class="grid grid-cols-2 my-2">
                <UCheckbox :value="permission"  v-for="permission in allPermissions[group]" 
                :key="permission"  v-model="resource.permissions" 
                :label="permission" :name="permission"/>
              </div>
            </div>
          </UFormGroup>
        </UForm>
      </div>
    </USlideover>
  </div>
</template>



<script setup>
import options from "./options";
import { any,object, string, tuple } from 'valibot';

const schema = object({
  name: string('Name is required'),
  permissions: tuple([any()], 'Permissions is required')
});

definePageMeta({
  auth: {
    permission: "view roles",
  },
});
</script>

<script>
import useApiFetch from '~/composables/UseApiFetch';

export default {
  data() {
    return {
      openSide: false,
      resource: {
        permissions: [],
      },
      options: options,
      allPermissions: [],
    }
  },
  methods: {
    createResource() {
      useApiFetch(`/roles`, { method: "POST", body: this.resource })
        .then(() => {
          this.openSide = false;
          this.$refs.table.refresh()
          this.resource = {
            permissions:[]
          }

        });
    },
   async openSideWithRes(){
      this.openSide= true
      await this.$refs.table?.response
      this.allPermissions = this.groupPermission(this.$refs.table?.response?.permissions )
    },
    groupPermission(permissions){
      const groups = {}
      permissions.forEach(i=>{
        if(groups.hasOwnProperty(i.group)){
          groups[i.group]?.push(i.name)
        }else{
          groups[i.group] = [i.name]
        }
      })
      console.log(groups)
      return groups
    }
  },
}
</script>


