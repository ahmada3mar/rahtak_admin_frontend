import useApiFetch from "~/composables/UseApiFetch";

export default {
    response: {},
    columns: [
        {
            key: "name",
            label: "Name",
            sortable: true,
        },
        {
            key: "merchant",
            label: "Merchant",
            sortable: true,
        },
        {
            key: "id",
            label: "Channel ID",
            sortable: true,
        },
        {
            key: "created_at",
            label: "Created At",
            sortable: true,
        },
    ],


}