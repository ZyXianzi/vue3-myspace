<template>
<div class="card">
    <div class="card-body">
        <div v-for="post in posts.posts" :key="post.id">
            <div class="card single-post">
                <div class="card-body">
                    {{ post.content }}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import PostInterface from "@/interfaces/PostInterface";

export default defineComponent({
    name: "UserPosts",
    props: {
        posts: {
            type: Object as PropType<PostInterface>,
            required: true,
        },
    }
});
</script>

<style scoped>
.single-post {
    margin-bottom: 10px;
}
</style>