<template>
    <ContentBase>
        <div class="row">
            <div class="col-3">
                <UserInfo @follow="follow" @unfollow="unfollow" :user="user" />
                <UserWrite v-if="is_me" @post_a_post="post_a_post" />
            </div>
            <div class="col-9">
                <UserPosts :user="user" :posts="posts" @delete_a_post="delete_a_post" />
            </div>
        </div>
    </ContentBase>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import ContentBase from "@/components/ContentBase.vue";
import UserInfo from "@/components/UserInfo.vue";
import UserPosts from "@/components/UserPosts.vue";
import UserWrite from "@/components/UserWrite.vue";
import { LocalUser } from "@/interfaces/User";
import PostInterface from "@/interfaces/PostInterface";
import { useRoute } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
    name: "UserListView",
    components: {
        ContentBase,
        UserInfo,
        UserPosts,
        UserWrite,
    },
    setup() {
        const store = useStore(key);
        const route = useRoute();
        const userId = route.params.userId;
        const user: LocalUser = reactive({} as LocalUser);
        const posts: PostInterface = reactive({} as PostInterface);

        axios.get("https://app165.acapp.acwing.com.cn/myspace/getinfo/", {
            params: {
                user_id: userId,
            },
            headers: {
                Authorization: "Bearer " + store.state.user.access,
            },
        }).then(resp => {
            user.id = resp.data.id;
            user.username = resp.data.username;
            user.photo = resp.data.photo;
            user.followerCount = resp.data.followerCount;
        });

        axios.get("https://app165.acapp.acwing.com.cn/myspace/post/", {
            params: {
                user_id: userId,
            },
            headers: {
                Authorization: "Bearer " + store.state.user.access,
            },
        }).then(resp => {
            posts.posts = resp.data;
            posts.count = resp.data.length;
        });

        const follow = () => {
            if (user.is_followed) return;
            user.is_followed = true;
            user.followerCount++;
        };

        const unfollow = () => {
            if (!user.is_followed) return;
            user.is_followed = false;
            user.followerCount--;
        };

        const post_a_post = (content: string) => {
            posts.count++;
            posts.posts.unshift({
                id: posts.count,
                author: store.state.user.username,
                content: content,
            });
        };

        const delete_a_post = (post_id: number) => {
            posts.posts = posts.posts.filter(post => post.id !== post_id);
            posts.count = posts.posts.length;
        }

        const is_me = computed(() => userId == store.state.user.id);

        return {
            user,
            posts,
            follow,
            unfollow,
            post_a_post,
            is_me,
            delete_a_post,
        };
    },
});
</script>

<style scoped></style>
