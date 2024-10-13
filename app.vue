<template>
  <div>
    <NuxtLayout :name="$route.query.iframe  ? false : undefined" >
      <NuxtPage />
      <UNotifications />
    </NuxtLayout>
  </div>
</template>
