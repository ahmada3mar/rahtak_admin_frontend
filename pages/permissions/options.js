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
            label: "description",
        },
        {
            key: "created_at",
            label: "Created At",
            sortable: true,
        },

    ],
}