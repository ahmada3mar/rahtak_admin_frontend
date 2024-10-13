<template>
  <UCard class="w-full">

    <div v-if="resource">
      <div class="py-4 mb-8 rounded-md">
        <div v-if="$can('update roles')" class="flex justify-end">
          <History v-if="response?.activities?.length" :response="response" />
          <NuxtLink :to="{ name: 'roles-id-edit', params: { id: resource.id } }">
            <UButton icon="i-heroicons-pencil-square" color="primary" label="Edit" variant="outline" />
          </NuxtLink>
        </div>
        <resource disabled :resource="resource">
          <template #permissions>
            <div class="grid grid-cols-2 xl:grid-cols-4">
              <UFormGroup class="my-2" v-for="group in Object.keys(response.available_permissions)" :label="group">
                <UCheckbox disabled v-for="(permission, index) in response.available_permissions[group]"
                  :label="permission.name" :key="index" :id="permission.name" :value="permission.name"
                  v-model="resource.permissions" />
              </UFormGroup>
            </div>
          </template>
        </resource>
      </div>
    </div>
    <div class="p-4" v-else>
      <skeleton :count="8" />
    </div>
  </UCard>

</template>


<script>
import useApiFetch from "~/composables/UseApiFetch";
import options from "../options";

export default {
  data() {
    return {
      resource: null,
      response: null,
      options: options,

    };
  },

  mounted() {
    useApiFetch(`/roles/${this.$route.params.id}`).then((response) => {
      const { email_verified_at, activities, available_permissions, ...resource } = response;
      this.resource = {
        name: response.name,
        permissions: response.permissions.map((i) => i.name),
      };
      this.response = response;
    });
  },
  methods: {

  },
};
</script>