export default defineAppConfig({
  nuxtIcon: {
    // Default size
    size: "20px",
  },
  ui: {
    primary: "hyperpay",
    strategy: "override",
    button: {
      color: {
        primary: {
          solid: "bg-primary dark:bg-hyperpay text-white",
        },
        white: {
          soft: "text-primary dark:text-gray-400",
        },
      },
    },
    table: {
      td: { base: "" },
      th: { base: "" },
    },
    notifications: {
      // Show toasts at the top right of the screen
      position: "top-0 right-0 bottom-auto",
    },
  },
});
