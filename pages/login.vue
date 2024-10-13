<template>
  <section class="bg-gray-50  dark:bg-gray-900">
    <div class="flex items-center px-6 py-8 md:h-screen lg:py-0">

      <div class="w-full flex justify-center">
        <div
          class="w-full bg-white-bk rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              تسجيل الدخول
            </h1>
            <form class="space-y-4 md:space-y-6" @submit.prevent="login">
              <div>
                <label
                  for="mobile"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >رقم الهاتف</label
                >
                <input
                  type="text"
                  v-model="user.mobile"
                  name="mobile"
                  id="mobile"
                  class="bg-gray-50 dark:bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >كلمة المرور</label
                >
                <input
                  autocomplete
                  v-model="user.password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 dark:bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <UButton
                size="md"
                type="submit"
                block
                label="تسجيل الدخول"
                color="primary"
              />

            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: false,
});
</script>

<script>
import { useAuthStore } from "../stores/useAuthStore";
export default {
  data() {
    return {
      user: {
        mobile: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const store = useAuthStore();
        store.login(this.user);

    },
  },
};
</script>
