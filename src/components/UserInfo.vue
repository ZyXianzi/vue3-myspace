<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-4">
                    <img
                        class="img-fluid"
                        src="../../static/images/86-icon.png"
                        alt=""
                    />
                </div>
                <div class="col-8">
                    <div class="username">{{ fullName }}</div>
                    <div class="fans">粉丝：{{ user.follower }}</div>
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
import { computed, defineComponent, PropType } from "vue";
import UserInterface from "@/interfaces/UserInterface";


export default defineComponent({
    name: "UserInfo",
    props: {
        user: {
            type: Object as PropType<UserInterface>,
            required: true,
        },
    },
    setup(props, context) {
        let fullName = computed(
            () => props.user.firstName + " " + props.user.lastName
        );

        const follow = () => {
            context.emit('follow');
        }

        const unfollow = () => {
            context.emit('unfollow');
        }

        return {
            fullName,
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
</style>
