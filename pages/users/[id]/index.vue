<template>
  <UCard class="w-full">
    <div v-if="resource">
      <div class="py-4 mb-8 rounded-md">
        <div v-if="$can('update users')" class="flex justify-end">
          <History v-if="response?.activities?.length" :response="response" />
          <NuxtLink :to="{ name: 'users-id-edit', params: { id: resource.id } }">
            <UButton icon="i-heroicons-pencil-square" color="primary" label="Edit" variant="outline" />
          </NuxtLink>
        </div>
        <div class="flex gap-5">
          <UBadge v-for="group in response.groups" :key="group.name" :ui="{ rounded: 'rounded-md' }" class="mx-1"
            size="lg" :label="group.name" color="primary" />
        </div>
        <resource disabled :resource="resource">
          <template #roles="{ value }">
            <UBadge v-for="role in value" :key="role.name" :ui="{ rounded: 'rounded-md' }" class="mx-1" size="lg"
              :label="role.name" :color="role.name.toLowerCase().includes('admin') ? 'emerald' : 'orange'" />
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
      options: options,
      response: null

    };
  },

  mounted() {
    useApiFetch(`/users/${this.$route.params.id}`).then((response) => {
      const { email_verified_at, activities, groups, ...resource } = response;
      this.resource = resource;
      this.response = response
    });
  },
  methods: {

  },
};
</script>