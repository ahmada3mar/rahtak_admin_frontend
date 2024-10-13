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
            key: "id",
            label: "Merchant ID",
            sortable: true,
        },
        {
            key: "created_at",
            label: "Created At",
            sortable: true,
        },
    ],

    resolveColor: (status) => {
        if (status == 1) return "emerald";
        if (status == 0) return "orange";

        return "blue";
    },

}