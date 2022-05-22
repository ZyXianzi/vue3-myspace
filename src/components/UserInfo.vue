<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-4 img-field">
                    <img class="img-fluid" :src="user.photo" alt="" />
                </div>
                <div class="col-8">
                    <div class="username">{{ user.username }}</div>
                    <div class="fans">粉丝：{{ user.followerCount }}</div>
                    <button
                        @click="follow"
                        v-if="!user.is_followed"
                        type="button"
                        class="btn btn-secondary btn-sm"
                    >
                        +关注
                    </button>
                    <button
                        @click="unfollow"
                        v-if="user.is_followed"
                        type="button"
                        class="btn btn-secondary btn-sm"
                    >
                        取消关注
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { LocalUser } from "@/interfaces/User";
import axios from "axios";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
    name: "UserInfo",
    props: {
        user: {
            type: Object as PropType<LocalUser>,
            required: true,
        },
    },
    setup(props, context) {
        const store = useStore(key);
        const follow = () => {
            axios
                .post(
                    "https://app165.acapp.acwing.com.cn/myspace/follow/",
                    {
                        target_id: props.user.id,
                    },
                    {
                        headers: {
                            'Authorization': "Bearer " + store.state.user.access,
                        },
                    }
                )
                .then((resp) => {
                    if (resp.data.result === "success") {
                        context.emit("follow");
                    }
                });
        };

        const unfollow = () => {
            axios
                .post(
                    "/myspace/follow/",
                    {
                        target_id: props.user.id,
                    },
                    {
                        headers: {
                            'Authorization': "Bearer " + store.state.user.access,
                        },
                    }
                )
                .then((resp) => {
                    if (resp.data.result === "success") {
                        context.emit("unfollow");
                    }
                });
        };

        return {
            follow,
            unfollow,
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
}

.fans {
    font-size: 12px;
    color: gray;
}

button {
    padding: 2px 4px;
    font-size: 12px;
}

.img-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
