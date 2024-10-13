import Routes from "~/Data/Routes"
import miscRoutes from "~/Data/misc-routes"
import {
    useAuthStore
} from "~/stores/useAuthStore"

export default defineNuxtRouteMiddleware((to, from, next) => {

    const token = useCookie('token')
    const auth = useAuthStore()
    const user = auth.user

    if ((!token.value || !user) && to.name != 'login') {
        return navigateTo({name:"login"})
    }

    if ((token.value && user) && to.name == 'login') {
        return navigateTo("/")
    }

    if (
        to.meta.auth &&
        !miscRoutes.includes(to.name) &&
        !auth.can(to.meta.auth.permission)
    ) {
        return navigateTo({
            name: 'not-auth'
        })

    }
})