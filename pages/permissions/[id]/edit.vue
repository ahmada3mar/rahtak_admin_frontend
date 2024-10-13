<template>
  <UCard class="w-full">
    <div class="py-4 mb-8 rounded-md" v-if="resource">
      <div v-if="$can('update permissions')" class="flex justify-end">
        <UButton @click="save" color="primary" variant="outline">
          <Icon name="iconoir:save-floppy-disk" />
          Save
        </UButton>
      </div>

      <resource :resource="resource">
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
    };
  },
  mounted() {
    useApiFetch(`/permissions/${this.$route.params.id}`).then((response) => {
      this.resource = {
        name: response.name,
        description: response.description,
      };
      this.response = response
    });
  },
  methods: {
    save() {
      useApiFetch(`/permissions/${this.$route.params.id}`, {
        method: "PUT",
        body: this.resource,
      }).then(() => {
        const toast = useToast();
        toast.add({
          title: "User updated success",
          icon: "i-heroicons-check-circle-20-solid",
        });
        useRouter().replace({
          name: "permissions-id",
          params: { id: this.$route.params.id },
        });
      });
    },
  },
};
</script>