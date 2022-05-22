<template>
    <div class="card">
        <div class="card-body">
            <div v-for="post in posts.posts" :key="post.id">
                <div class="card single-post">
                    <div class="card-body">
                        {{ post.content }}
                        <button
                            @click="delete_a_post(post.id)"
                            v-if="is_me"
                            type="button"
                            class="btn btn-danger btn-sm"
                        >
                            删除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import PostInterface from "@/interfaces/PostInterface";
import { useStore } from "vuex";
import { key } from "@/store";
import { LocalUser } from "@/interfaces/User";
import axios from "axios";

export default defineComponent({
    name: "UserPosts",
    props: {
        posts: {
            type: Object as PropType<PostInterface>,
            required: true,
        },
        user: {
            type: Object as PropType<LocalUser>,
            required: true,
        },
    },
    setup(props, context) {
        const store = useStore(key);
        let is_me = computed(() => props.user.id == store.state.user.id);

        const delete_a_post = (post_id: string | number) => {
            axios
                .delete("https://app165.acapp.acwing.com.cn/myspace/post/", {
                    headers: {
                        Authorization: "Bearer " + store.state.user.access,
                    },
                    data: {
                        post_id,
                    },
                })
                .then(() => {
                    context.emit("delete_a_post", post_id);
                });
        };

        return {
            is_me,
            delete_a_post,
        };
    },
});
</script>

<style scoped>
.single-post {
    margin-bottom: 10px;
}

button {
    float: right;
}
</style>
