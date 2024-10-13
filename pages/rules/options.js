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
            key: "description",
            label: "Description",
        },
        {
            key: "is_default",
            label: "Default",
            sortable: true,
        },
        {
            key: "action",
            label: "Action",
            sortable: true,
        },
        {
            key: "interval",
            label: "Interval",
            sortable: true,
        },
        {
            key: "basedOn",
            label: "Result",
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


        ]
    },

    resolveColor: (action) => {
        if (action == "Call") return "emerald";
        if (action == "Email") return "orange";

        return "blue";
    },



}