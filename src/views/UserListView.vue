<template>
    <ContentBase>
        <div v-for="user in users" :key="user.id" class="card" @click="open_user_profile(user.id)">
            <div class="card-body">
                <div class="row">
                    <div class="col-1 img-field">
                        <img class="img-fluid" :src="user.photo" alt="" />
                    </div>
                    <div class="col-11">
                        <div class="username">{{ user.username }}</div>
                        <div class="follow-count">粉丝: {{ user.followerCount }}</div>
                    </div>
                </div>
            </div>
        </div>
    </ContentBase>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ContentBase from "@/components/ContentBase.vue";
import { ResponseUser } from "@/interfaces/User";
import axios from "axios";
import router from "@/router";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
    name: "UserListView",
    components: {
        ContentBase,
    },
    setup() {
        const store = useStore(key);
        let users = ref<ResponseUser[]>([]);

        axios({
            method: "get",
            url: "/myspace/userlist/",
        }).then((resp) => {
            users.value = resp.data;
        });

        const open_user_profile = (userId: string) => {
            if (store.state.user.is_login) {
                router.push({
                    name: "userprofile",
                    params: {
                        userId,
                    }
                });
            } else {
                router.push({
                    name: "login",
                });
            }
        }

        return {
            users,
            open_user_profile
        };
    },
});
</script>

<style scoped>
img {
    border-radius: 50%;
}

.username {
    font-weight: bold;
    height: 50%;
}

.follower-count {
    font-size: 12px;
    color: gray;
    height: 50%;
}

.card {
    margin-bottom: 20px;
    cursor: pointer;
}

.card:hover {
    box-shadow: 2px 2px 10px lightgray;
    transition: 300ms;
}

.img-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
