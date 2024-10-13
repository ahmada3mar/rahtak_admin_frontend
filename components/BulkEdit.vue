<template>
    <UCard :ui="{
        ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
            padding: 'px-0'
        }
    }">
        <template #header>
            <div class="flex items-center justify-between">
                <h3 class="text-base capitalize font-semibold leading-6 text-gray-900 dark:text-white">
                    {{ `${$route.path.replace('/', '')}:` }}
                    <NuxtLink class="text-primary underline mx-2"
                        :to="`${$route.path}/${serializeParam(items[currentIndex]).id}`">
                        {{ serializeParam(items[currentIndex]).name }}
                    </NuxtLink>
                </h3>
                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" />
            </div>
        </template>

        <iframe :src="`${$route.path}/${serializeParam(items[currentIndex]).id}/edit?iframe=true`" class="w-full h-80">
        </iframe>

        <template #footer>
            <div class="flex justify-between">
                <UButton :disabled="!currentIndex" @click="back" class="px-4" color="gray" label="Previous" />
                {{ `${currentIndex + 1} / ${items.length}` }}
                <UButton :disabled="currentIndex == items.length - 1" @click="next" class="px-8" label="Next" />
            </div>
        </template>
    </UCard>
</template>

<script>

export default {
    props: {
        items: {
            type: Array,
            default: []
        },
        columns: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        next() {
            if (this.currentIndex < this.items.length - 1)
                this.currentIndex++
        },
        back() {
            if (this.currentIndex > 0)
                this.currentIndex--
        },
        serializeParam(item) {
            const current = this.$router.currentRoute.value
            let pattern = new RegExp(`(?=${current.name}-)(.*-edit)$` , "gi")
            let exists = this.$router.getRoutes().filter(i => pattern.test(i.name))[0];
            const key = exists.name.replace(`${current.name}-`, '').replace("-edit" ,'')

            console.log(current, current.name , exists , key)
            

            return {
                id: item[key],
                name: item.name || '',
            }
        }
    }
}
</script>
