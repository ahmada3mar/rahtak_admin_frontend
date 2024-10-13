<template>
  <div>
    <hyper-table ref="table" :columns="options.columns" :filters="options.filters" url="/merchants"
      :ui="{ th: { base: 'text-left' } }">
      <template #id-data="{ row }">
          <NuxtLink class="text-primary dark:text-gray-400 font-bold underline"
            :to="{ name: 'merchants-id', params: { id: row.id } }">
            {{ row.id }}
          </NuxtLink>
      </template>

      <template #name-data="{ row }">
        <div class="grid grid-cols-12 gap-1">

          <UBadge v-if="!row.reviewed" class="w-10 col-span-2 rounded-full h-5" size="xs" label="New" color="red" />
          <NuxtLink class="text-primary dark:text-gray-400 col-span-10 font-bold underline"
          :to="{ name: 'merchants-id', params: { id: row.id } }">
          {{ row.name }}
          </NuxtLink>
        </div>
      </template>


      <template #extra-header>
        <UButton size="xs" @click="openSide = true" v-if="$can('create merchants')" label="Add Merchant" />
      </template>
    </hyper-table>

    <USlideover v-model="openSide">
      <div class="p-4 flex-1">
        <UForm :schema="schema" :state="resource" @submit="createResource">
          <div class="flex justify-end">
            <UButton type="submit" color="primary" variant="outline">
              <Icon name="mdi:storefront-plus-outline" />
              Create Merchant
            </UButton>
          </div>

          <UFormGroup class="my-2 capitalize" label="Name" name="name">
            <UInput icon="i-heroicons-shield-exclamation" size="md" v-model="resource.name" variant="outline" />
          </UFormGroup>

          <UFormGroup class="my-2 capitalize" label="E-mail" name="email">
            <UInput icon="i-heroicons-shield-exclamation" size="md" v-model="resource.email" variant="outline" />
          </UFormGroup>

          <UFormGroup class="my-2 capitalize" label="Authentication EntityId" name="authentication_entityId">
            <UInput icon="i-heroicons-shield-exclamation" size="md" v-model="resource.authentication_entityId"
              variant="outline" />
          </UFormGroup>

          <UFormGroup class="my-2 capitalize" label="Access Token" name="access_token">
            <UInput icon="i-heroicons-shield-exclamation" size="md" v-model="resource.access_token" variant="outline" />
          </UFormGroup>

          <UFormGroup class="my-2 capitalize" label="Tamara Access Token" name="tamara_access_token">
            <UInput icon="i-heroicons-shield-exclamation" size="md" v-model="resource.tamara_access_token"
              variant="outline" />
          </UFormGroup>

          <UFormGroup class="my-2 capitalize" label="Tamara Notification Token" name="tamara_notification_token">
            <UInput icon="i-heroicons-shield-exclamation" size="md" v-model="resource.tamara_notification_token"
              variant="outline" />
          </UFormGroup>

          <UFormGroup class="my-2 capitalize" label="Authentication UserId" name="authentication_userId">
            <UInput icon="i-heroicons-shield-exclamation" size="md" v-model="resource.authentication_userId"
              variant="outline" />
          </UFormGroup>

          <UFormGroup class="my-2 capitalize" label="Authentication Password" name="authentication_password">
            <UInput icon="i-heroicons-shield-exclamation" size="md" v-model="resource.authentication_password"
              variant="outline" />
          </UFormGroup>

          <UFormGroup class="my-2 capitalize" label="ACI Secret" name="aci_secret">
            <UInput icon="i-heroicons-shield-exclamation" size="md" v-model="resource.aci_secret" variant="outline" />
          </UFormGroup>
        </UForm>
      </div>
    </USlideover>
  </div>
</template>

<script setup>
import options from "./options";
import { object, string } from "valibot";

const schema = object({
  name: string("Name is required"),
  email: string("E-mail is required"),
  authentication_entityId: string(" is required"),
  access_token: string("Access Token is required"),
  tamara_access_token: string("Tamara Access Token is required"),
  tamara_notification_token: string("Tamara Notification Token is required"),
  authentication_userId: string("User id is required"),
  authentication_password: string("Password is required"),
  aci_secret: string("ACI secret is required"),
});

definePageMeta({
  auth: {
    permission: "view merchants",
  },
});
</script>

<script>
import useApiFetch from "~/composables/UseApiFetch";
export default {
  data() {
    return {
      openSide: false,
      resource: {},
    };
  },
  methods: {
    createResource() {
      useApiFetch(`/merchants`, { method: "POST", body: this.resource }).then(
        () => {
          this.openSide = false;
          this.$refs.table.refresh();
          this.resource = {};
        }
      );
    },
  },
};
</script>
