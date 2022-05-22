import { StateUser } from '@/interfaces/User';
import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
    // 声明自己的 store state
    interface State {
        user: StateUser;
    }

    // 为 `this.$store` 提供类型声明
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
