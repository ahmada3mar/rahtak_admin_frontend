import { useAuthStore } from "./stores/useAuthStore"

 async function defineNuxtPrepareHandler(init) {
  if (typeof init === "function") return await init()

  return init
}


export default defineNuxtPrepareHandler(async () => {
  let store = useAuthStore()
store.fetchUser()

  return {
    // If the fetch failed, we want to halt the build
    ok: 1,

    // Pass your todos data to Nuxt and import it
    // anywhere from `#nuxt-prepare`
    state: {
      user:store.user
    }
  }
})
