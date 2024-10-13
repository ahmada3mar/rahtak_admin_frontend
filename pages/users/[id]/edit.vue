<template>
  <UCard class="w-full" >
    <div class="py-4 mb-8 rounded-md" v-if="resource">
      <div v-if="$can('update users')" class="flex justify-end">
        <UButton @click="save" color="primary" variant="outline">
          <Icon name="iconoir:save-floppy-disk" />
          Save
        </UButton>
      </div>

      <resource :resource="resource">
        <template #roles>
          <USelectMenu v-model="resource.roles" multiple placeholder="select the roles ...."
           by="value"
           option-attribute="label"
           :searchable="searchAsync" searchable-placeholder="Search..." class="w-2/4  py-2">

            <template #label>
              <span v-if="resource?.roles?.length">
                <UBadge v-for="(role, index) in resource.roles" class="mr-2 capitalize justify-center" size="xs"
                  :label="role.label || 'N/A'" color="primary"
                  :key="index" />
              </span>
              <span v-else>No roles attached</span>
            </template>

          </USelectMenu>
        </template>

        <template #groups>
          <USelectMenu v-model="resource.groups" multiple placeholder="select the groups ...."
           by="value"
           option-attribute="label"
           :searchable="searchGroupsAsync" searchable-placeholder="Search..." class="w-2/4  py-2">

            <template #label>
              <span v-if="resource?.groups?.length">
                <UBadge v-for="(group, index) in resource.groups" class="mr-2 capitalize justify-center" size="xs"
                  :label="group.label || 'N/A'" color="primary"
                  :key="index" />
              </span>
              <span v-else>No groups attached</span>
            </template>

          </USelectMenu>
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
      groups: [],
      options: options,
    };
  },
  mounted() {
    useApiFetch(`/users/${this.$route.params.id}`).then((response) => {
      this.resource = {
        name: response.name,
        email: response.email,
        roles: response.roles.map((i) => ({ label: i.name, value: i.id })),
        groups: response.groups.map((i) => ({ label: i.name, value: i.id })),
      };
      // this.groups = response.groups.map((i) => ({ label: i.name, value: i.id }))
    });
  },
  methods: {
    searchAsync: async (search) => {
      const { data } = await useApiFetch(`/roles`, {
        query: { search },
      });
      return data.map((role) => ({ label: role.name, value: role.id }));
    },
    searchGroupsAsync: async (search) => {
      const { data } = await useApiFetch(`/groups`, {
        query: { search },
      });
      return data.map((group) => ({ label: group.name, value: group.id }));
    },
    save() {
      useApiFetch(`/users/${this.$route.params.id}`, {
        method: "PUT",
        body: this.resource,
      }).then(() => {
        const toast = useToast();
        toast.add({
          title: "User updated success",
          icon: "i-heroicons-check-circle-20-solid",
        });
        useRouter().replace({
          name: "users-id",
          params: { id: this.$route.params.id },
        });
      });
    },
  },
};
</script>