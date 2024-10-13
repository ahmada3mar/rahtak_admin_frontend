<template>
  <div class="p-5 mx-2 flex bg-gray-100 my-5 rounded-lg">
    <UBreadcrumb
      :links="[
        { to: '/', label: 'الرئيسية', icon: 'i-heroicons-home' },
        ...mapToPaths(
          useRoute()
            .path.split('/')
            .filter((r) => isNaN(r))
        ),
      ]"
    />
  </div>
</template>

<script setup>
import Ar from "~/Data/Ar";
import linksRoute from "~/Data/Routes";

function mapToPaths(arr) {
  let path = "/services";
  return arr.map((item, index) => {
    let name = decodeURI(item.split("_")[0]);
    let label = Ar[name] ?? name;
    if (index === 0)
      return {
        label: label,
        to: path,
      }; // First element stays as "/service"
    path += `/${item}`; // Append the next item in the path
    return {
      label: label,
      to: path,
    };
  });
}
</script>
