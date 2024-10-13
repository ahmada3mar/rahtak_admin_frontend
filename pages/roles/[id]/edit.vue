<template>
  <UCard class="w-full">
    <div class="py-4 mb-8 rounded-md" v-if="resource">
      <div v-if="$can('update roles')" class="flex justify-end">
        <UButton @click="save" color="primary" variant="outline">
          <Icon name="iconoir:save-floppy-disk" />
          Save
        </UButton>
      </div>

      <resource :resource="resource">
        <template #permissions>
          <div class="grid grid-cols-2 xl:grid-cols-4">
            <UFormGroup class="my-2" v-for="group in Object.keys(response.available_permissions)" :label="group">
              <UCheckbox v-for="(permission, index) in response.available_permissions[group]" 
              :label="permission.name" 
              :key="index"
              :id="permission.name" 
              :value="permission.name" 
              v-model="resource.permissions" 
              />
            </UFormGroup>
          </div>
        </template>
      </resource>
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
      permissions: [],
    };
  },
  mounted() {
    useApiFetch(`/roles/${this.$route.params.id}`).then((response) => {
      this.resource = {
        name: response.name,
        permissions: response.permissions.map((i) => i.name),
      };
      this.response = response
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
      useApiFetch(`/roles/${this.$route.params.id}`, {
        method: "PUT",
        body: this.resource,
      }).then(() => {
        const toast = useToast();
        toast.add({
          title: "User updated success",
          icon: "i-heroicons-check-circle-20-solid",
        });
        useRouter().replace({
          name: "roles-id",
          params: { id: this.$route.params.id },
        });
      });
    },
  },
};
</script>
