import useApiFetch from "~/composables/UseApiFetch";

export default {
    response: {},
    columns: [
        {
            key: "id",
            label: "المعرف",
            sortable: true,
        },
        {
            key: "branch",
            label: "الفرع",
            sortable: true,
        },
        {
            key: "service",
            label: "الخدمة",
            sortable: false,
        },
        {
            key: "customer",
            label: "اسم العميل",
            sortable: false,
        },
        {
            key: "amount",
            label: "القيمة",
            sortable: false,
        },
        {
            key: "fees",
            label: "العمولة",
            sortable: true,
        },
        {
            key: "additional_amount",
            label: "القيمة المضافة",
            sortable: true,
        },
        {
            key: "rahtak_fees",
            label: "عمولة راحتك",
            sortable: true,
        },
        {
            key: "created_at",
            label: "التاريخ",
            sortable: true,
        },
    ],
    get filters() {
        return [
            {
                key: "status",
                label: "الحالة",
                options: [
                    {
                        label: "Paid",
                        value: "2",
                    },
                    {
                        label: "Pending",
                        value: "1",
                    },
                    {
                        label: "Failed",
                        value: "4",
                    },
                    {
                        label: "Cancelled",
                        value: "5",
                    },
                    {
                        label: "Inactive",
                        value: "3",
                    },
                ],
            },
            {
                key: "branch_id",
                label: "الفرع",
                searchable: this.searchAsync,
                searchable_label: "الفرع...",
                options: [],
            },
        ]
    },
    resolveColor: (status) => {
        if (status == "Paid") return "emerald";
        if (status == "Pending") return "orange";
        if (status == "Failed") return "red";
        if (status == "Cancelled") return "red";
        if (status == "Inactive") return "gray";

        return "blue";
    },

    searchAsync: async (search) => {
        const router = useRouter();
        const branch_id = router.currentRoute.value?.query?.branch_id;
        const { data } = await useApiFetch(`/branches`, {
            query: { search, id: branch_id },
        });

        return data.map(branch => {
            return {
                label: branch.name,
                value: branch.id,
            }
        })
    },

}