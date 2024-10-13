import {
    defineStore
} from 'pinia';
import useApiFetch from "~/composables/UseApiFetch";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        list:[]
    }),
    getters: {
        isLoggedIn: (state) => {
            return !!state.user
        }
    },
    actions: {
        login(credentials) {
            useApiFetch('/login', {
                    method: "POST",
                    watch: false,
                    body: credentials
                })
                .then(res => {
                    this.user = res.user
                    useCookie('token').value = res.token
                    navigateTo('/')
                }).catch(err=>{
                    const toast = useToast();
                    toast.add({
                        title: err.response._data.error,
                        icon: "i-heroicons-x-mark",
                        color:"red"
                      });

                })
        },
        fetchUser() {
            return  useApiFetch('/user')
        },
        setUser(user) {
            this.user = user
        },
        can(permission) {
            if (!this.user) {
                return false
            }
            return !!this.user.permissions.filter(i => {
                return !permission || i.name == permission
            }).length
        },
        logout(){
            useCookie('token').value = null
            this.user = null
            return navigateTo({name:"login"})

        },
        loadList(){
                $fetch("https://pay.sadad.jo/POS/Payment/GetServiceforSearch?deviceNo=xxx", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNWU3MmUyZS0xNDg1LTQ1MDYtYWQ2Yy1iYmFjNmU1ZTU5NWIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI4UERDcCtUSUZhaXA4aUV1YWRvTFYxSEVnakp1WS9KbU9TRGM4cGpVdXZZPSIsInVuaXF1ZV9uYW1lIjoiUzYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3dpbmRvd3NkZXZpY2VjbGFpbSI6ImIwNjM4MjVlLTk5MmQtNDg5MC1iZWIzLTQzMjJkNmRlNTI2YyIsIm5iZiI6MTcyNzcyMjIwNSwiZXhwIjoxNzI3NzI1ODA1LCJpYXQiOjE3Mjc3MjIyMDUsImlzcyI6IlNhZGFkIiwiYXVkIjoiU2FkYWQifQ.wQZw07r7s3gmwLc5PBpfUvPbTgghJfUPQICg4AFdwSA"
                    },
    
                }).then(res => {
                    this.list = res;
    
                })
        }
    },

})