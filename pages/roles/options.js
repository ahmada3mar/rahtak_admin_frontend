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
            key: "permissions",
            label: "Permissions",
        },
        {
            key: "created_at",
            label: "Created At",
            sortable: true,
        },

    ],
    
}