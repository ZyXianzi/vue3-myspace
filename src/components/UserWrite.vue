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
                <button @click="post" type="button" class="btn btn-primary btn-small">发帖</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "UserWrite",
    setup(props, context) {
        let content = ref('');

        const post = () => {
            context.emit('post', content.value);
            content.value = '';
        };

        return {
            content,
            post
        }
    }
});
</script>

<style scoped>
.edit-field {
    margin-top: 20px;
}

button {
    margin-top: 10px
}
</style>
