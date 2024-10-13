export default {
    '': [{
            name: "الرئيسية",
            icon: "carbon:home",
            path: "/",
            items: []
        },
        {
            name: "الخدمات",
            icon: "carbon:carbon-for-aem",
            path: "",
            items: [
                {
                    name: "سداد",
                    icon: "hugeicons:invoice-03",
                    path: "/services/sadad",
                },
                {
                    name: "كليك",
                    icon: "solar:hand-money-outline",
                    path: "/services/cliq",
                },
                {
                    name: "تكسي اف",
                    icon: "emojione-monotone:taxi",
                    path: "/services/taxiF",
                }
            ]
        },
        {
            name: "الحركات",
            icon: "ph:currency-circle-dollar",
            path: "/transactions",
        },

        {
            name: "المستخدمون",
            icon: "ci:users",
            path: "/users",
            items: []
        }

    ],
    Settings: [{
            name: "الادوار",
            icon: "tabler:user-shield",
            path: "/roles",
            items: []
        },
        {
            name: "الصلاحيات",
            icon: "material-symbols:shield-locked-outline-sharp",
            path: "/permissions",
            items: []
        },
        {
            name: "سجل النشاط",
            icon: "heroicons:clock",
            path: "/activities",
            items: []
        },
    ]
}