<template>
    <ContentBase>
      <div class="row">
          <div class="col-3">
              <UserInfo @follow="follow" @unfollow="unfollow" :user="user" />
              <UserWrite @post="post" />
          </div>
          <div class="col-9">
              <UserPosts :posts="posts" />
          </div>
      </div>
    </ContentBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContentBase from "@/components/ContentBase.vue";
import UserInfo from "@/components/UserInfo.vue";
import UserPosts from "@/components/UserPosts.vue";
import UserWrite from "@/components/UserWrite.vue";
import { reactive } from "vue";
import UserInterface from "@/interfaces/UserInterface";
import PostInterface from "@/interfaces/PostInterface";

export default defineComponent({
    name: "UserListView",
    components: {
        ContentBase,
        UserInfo,
        UserPosts,
        UserWrite,
    },
    setup() {
        const user: UserInterface = reactive({
            username: "ZyXianzi",
            lastName: "Zheng",
            firstName: "Feifan",
            follower: 0,
            is_followed: false,
        });

        const posts: PostInterface = reactive({
            count: 3,
            posts: [
                {
                    id: 1,
                    author: 1,
                    content: "Vue真好用啊",
                },
                {
                    id: 2,
                    author: 1,
                    content: "React真好用啊",
                },
                {
                    id: 3,
                    author: 1,
                    content: "Angular真好用啊",
                },
            ]
        });

        const follow = () => {
            if (user.is_followed) return;
            user.is_followed = true;
            user.follower ++;
        }

        const unfollow = () => {
            if (!user.is_followed) return;
            user.is_followed = false;
            user.follower --;
        }

        const post = (content: string) => {
            posts.count ++;
            posts.posts.unshift({
                id: posts.count,
                author: 1,
                content: content,
            });
        }

        return {
            user,
            posts,
            follow,
            unfollow,
            post,
        }
    }
});
</script>

<style scoped>
</style>