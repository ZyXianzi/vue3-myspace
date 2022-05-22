import axios from "axios";
import jwt_decode from "jwt-decode";
import { StateUser } from "@/interfaces/User";

const ModuleUser = {
    state: {
        id: "",
        username: "",
        photo: "",
        followerCount: 0,
        access: "",
        refresh: "",
        is_login: false,
    } as StateUser,
    getters: {},
    mutations: {
        updateUser(state: StateUser, user: StateUser) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.followerCount = user.followerCount;
            state.access = user.access;
            state.refresh = user.refresh;
            state.is_login = user.is_login;
        },
        updateAccess(state: StateUser, access: string) {
            state.access = access;
        },
        logout(state: StateUser) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.followerCount = 0;
            state.access = "";
            state.refresh = "";
            state.is_login = false;
        },
    },
    actions: {
        login(context: any, data: any) {
            axios
                .post("https://app165.acapp.acwing.com.cn/api/token/", {
                    username: data.username,
                    password: data.password,
                })
                .then((resp) => {
                    const { access, refresh } = resp.data;
                    const access_obj: any = jwt_decode(access);

                    setInterval(() => {
                        axios
                            .post(
                                "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                                {
                                    refresh,
                                }
                            )
                            .then((resp) => {
                                context.commit(
                                    "updateAccess",
                                    resp.data.access
                                );
                            });
                    }, 4.5 * 60 * 1000);

                    axios
                        .get(
                            "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                            {
                                params: {
                                    user_id: access_obj.user_id,
                                },
                                headers: {
                                    Authorization: "Bearer " + access,
                                },
                            }
                        )
                        .then((resp) => {
                            const resp_data = resp.data;
                            context.commit("updateUser", {
                                ...resp_data,
                                access: access,
                                refresh: refresh,
                                is_login: true,
                            });
                            data.success();
                        })
                        .catch(() => {
                            data.error();
                        });
                });
        },
    },
    modules: {},
};

export default ModuleUser;
