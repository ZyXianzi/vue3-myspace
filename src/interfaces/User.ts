interface ResponseUser {
    id: string;
    username: string;
    photo: string;
    followerCount: number;
}

interface StateUser extends ResponseUser {
    access: string;
    refresh: string;
    is_login: boolean;
}

interface LocalUser extends ResponseUser {
    is_followed: boolean;
}

export {
    LocalUser,
    StateUser,
    ResponseUser,
}