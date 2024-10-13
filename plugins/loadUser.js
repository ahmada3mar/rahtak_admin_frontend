import {
    useAuthStore
} from "~/stores/useAuthStore"

export default defineNuxtPlugin(async (r) => {

    let token = useCookie('token')
    const auth = useAuthStore()
    const router = useRouter()
    const list = auth.list


    if (!auth.user && router.name != "login" && token.value) {
        let res = await auth.fetchUser()
        auth.user = res?.data
    }

    if(!list.length){
        auth.loadList()
    }

    const can = (permission = null) => {
        if (!auth?.user) {
            return false
        }


        return !!auth.user.permissions.filter(i => {
            return !permission || i.name == permission
        }).length
    }



    const toast = () => {
        return useToast()
    }

    return {
        provide: {
            can
        }
    }



})