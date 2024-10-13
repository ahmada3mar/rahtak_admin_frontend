import useApiFetch from "~/composables/UseApiFetch";

export default {
    response: {},
    columns: [
        {
            key: "id",
            label: "ID",
            sortable: true,
        },
        {
            key: "name",
            label: "Name",
            sortable: true,
        },
        {
            key: "roles",
            label: "Roles",
        },
        {
            key: "email",
            label: "E-mail",
            sortable: true,
        },
        {
            key: "created_at",
            label: "Created At",
            sortable: true,
        },

    ],
    get filters() {

        return [
            {
            key: "role_name[]",
            label: "Role",
            multiple:true,
            searchable:this.searchAsync,
            options: [],
        },

        ]
    },
    searchAsync: async (search) => {
        const router = useRouter();
        const role_id = router.currentRoute.value?.query?.role_id;
        const { data } = await useApiFetch(`/roles`, {
            query: { search, role_id},
        });

        return data.map(role => {
            return {
                label: role.name,
                value: role.name,
            }
        })
    },
    searchGroupAsync: async (search) => {
        const { data } = await useApiFetch(`/groups`, {
            query: { search},
        });

        return data.map(group => {
            return {
                label: group.name,
                value: group.id,
            }
        })
    },


}