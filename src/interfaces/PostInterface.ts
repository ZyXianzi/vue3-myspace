type Post = {
    id: string | number;
    author: string,
    content: string,
}

export default interface PostInterface {
    count: number;
    posts: Post[];
}