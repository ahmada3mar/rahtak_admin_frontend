<template>
  <UCard class="w-full" >
  <div v-if="response">
    <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
      <!--  
      <UAlert
        :ui="{title:'truncate'}"
        :description="response.status"
        title="Status"
        :color="options.resolveColor(response.status)"
        variant="outline"
      />
      -->
    </div>

    <resource disabled :resource="resource">
      <template #Amount={value}>
        <UInput
          size="md"
          color="gray"
          variant="outline"
          disabled
          :value="value"
        >
          <template #trailing>
            <span class="text-gray-400 dark:text-gray-400 text-md">{{ response.currency }}</span>
          </template>
        </UInput>
      </template>
      <template #Merchant={value}>
        <UInput
          size="md"
          disabled
          :value="value?.name ? `${value?.name} - ${value.id}` : 'N/A'"
          color="gray"
          variant="outline"
        />
      </template>
    </resource>


  </div>
  <div class="px-5" v-else>
    <skeleton :count="8" />
  </div>
</UCard>

</template>


<script >
import useApiFetch from "~/composables/UseApiFetch";
import { JsonViewer } from "vue3-json-viewer";
import "vue3-json-viewer/dist/index.css";
import options from "../options";

export default {
  components: { JsonViewer },
  data() {
    return {
      response: null,
      resource: null,
      options: options,
    };
  },

  mounted() {
    useApiFetch(`/transactions/${this.$route.params.id}`).then((response) => {
      this.response = response;
      this.resource = {
        id: response.id,
        Amount: response.amount,
        Merchant: response.merchant,
        paymentType: response.paymentType,
        paymentBrand: response.paymentBrand,
        code: response.code,
        source: response.source,
        "Created at": response.created_at,

      };
    });
  },
};
</script>