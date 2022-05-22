<template>
    <div class="card edit-field">
        <div class="card-body">
            <div class="mb-3">
                <textarea
                    v-model="content"
                    class="form-control"
                    id="edit-post"
                    rows="3"
                    placeholder="...在想什么呢"
                ></textarea>
                <button
                    @click="post_a_post"
                    type="button"
                    class="btn btn-primary btn-small"
                >
                    发帖
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
    name: "UserWrite",
    setup(props, context) {
        const store = useStore(key);
        let content = ref("");

        const post_a_post = () => {
            axios
                .post(
                    "https://app165.acapp.acwing.com.cn/myspace/post/",
                    {
                        content: content.value,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + store.state.user.access,
                        },
                    }
                )
                .then((resp) => {
                    if (resp.data.result === "success") {
                        context.emit("post_a_post", content.value);
                        content.value = "";
                    }
                });
        };

        return {
            content,
            post_a_post,
        };
    },
});
</script>

<style scoped>
.edit-field {
    margin-top: 20px;
}

button {
    margin-top: 10px;
}
</style>
