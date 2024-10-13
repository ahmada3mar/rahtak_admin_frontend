import {
    navigateTo
} from '#imports';
import {
    callWithNuxt
} from '#app';
import { useAuthStore } from '../stores/useAuthStore';


export default async function useApiFetch(url, options = {}) {

    const config = useRuntimeConfig()

    const defaults = {
        baseURL: config.public.baseUrl ?? "http://127.0.0.1:8000/api",
        // cache request
        key: url,

        // set user token if connected
        headers: {
            accept: 'application/json',
            ...useRequestHeaders(['referer', 'cookie'])
        },
        ...options
    }



    if (process.client) {
        defaults.headers.authorization = `Bearer ${useCookie("token").value}`
    }

    const nuxtApp = useNuxtApp();
    try {
        return await $fetch(url, defaults)
        
    } catch (e) {
        if (e.status === 401 || e.status === 403){
            return await callWithNuxt(nuxtApp, () => useAuthStore().logout())
        } 

        if (e.status == 422 ){
            await callWithNuxt(nuxtApp, () => {
                const toast = useToast()
                toast.add({
                    title: e.response._data.message,
                    icon: "i-heroicons-x-mark",
                    color: "red"
                  });
            })
        } 
        return Promise.reject(e)
    }

}