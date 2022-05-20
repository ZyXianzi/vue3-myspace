<template>
    <ContentBase>
      首页
    </ContentBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContentBase from "@/components/ContentBase.vue";

export default defineComponent({
    name: "HomeView",
    components: {
        ContentBase,
    },
});
</script>

<style scoped>
</style>