type Post = {
    id: number;
    author: number,
    content: string,
}

export default interface PostInterface {
    count: number;
    posts: Post[];
}