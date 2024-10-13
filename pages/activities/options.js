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
            key: "causer",
            label: "Action By",
            sortable: true,
        },
        {
            key: "event",
            label: "Action",
            sortable: true,
        },
        {
            key: "subject",
            label: "Affected",
            sortable:true
        },
        {
            key: "description",
            label: "description",
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
            key: "causers[]",
            label: "User",
            multiple: true,
            searchable: this.searchAsync,
            options: [],
        },
            {
            key: "events[]",
            label: "Action",
            multiple: true,
            options: [
                {
                    label:"Updated",
                    value:"updated",
                },
                {
                    label:"Created",
                    value:"created",
                },
                {
                    label:"Deleted",
                    value:"deleted",
                },
            ],
        },

        ]
    },


    resolveColor(model)
    {
        let colors = {
            user:'orange',
            merchant:'yellow',
            channel:'primary',
            rule:'green',
        }

        return colors[model] || "blue"
    },
    resolveEventColor(event)
    {
        switch (event) {
            case "updated":
                return "orange"
            case "created":
                return "emerald"
            case "deleted":
                return "red"        
            default:
                return "blue"
        }
    },

    searchAsync: async (search) => {
        const router = useRouter();
        const causer = router.currentRoute.value?.query?.causer;
        const { data } = await useApiFetch(`/users`, {
            query: { search, causer},
        });

        return data.map(causer => {
            return {
                label: causer.name,
                value: causer.id,
            }
        })
    },


}