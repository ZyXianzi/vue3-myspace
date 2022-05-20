<template>
    <ContentBase>
      好友列表
    </ContentBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContentBase from "@/components/ContentBase.vue";

export default defineComponent({
    name: "UserListView",
    components: {
        ContentBase,
    },
});
</script>

<style scoped>
</style>