import { UsersResponseDTO } from "../../../shared/api/endpoints/users";
import { PostsResponseDTO } from "../../../shared/api/endpoints/posts";
import { Posts } from "../model";

export const mapDTOToPostsEntitiy = (postsDto: PostsResponseDTO, usersDto: UsersResponseDTO): Posts => {
  const posts = postsDto.posts.map((post) => {
    const findUser = usersDto.users.find((user) => user.id === post.userId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId: _userId, ...restPost } = post;

    return { ...restPost, author: findUser };
  });

  return {
    posts: posts,
    total: postsDto.total,
    limit: postsDto.limit,
    skip: postsDto.skip,
  };
};
