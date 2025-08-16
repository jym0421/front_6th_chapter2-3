import { usersRequests } from "../../../shared/api/endpoints/users";
import { postsRequests } from "../../../shared/api/endpoints/posts";
import { mapDTOToPostsEntitiy, mapEntityToGetPostsRequestDTO } from "./mappers";

export interface GetPostsParams {
  limit: number;
  skip: number;
  select: string;
}

// 게시물 목록 조회
export const getPosts = async (params: GetPostsParams) => {
  const posts = await postsRequests.getPosts(mapEntityToGetPostsRequestDTO(params).posts);
  const users = await usersRequests.getUsers(mapEntityToGetPostsRequestDTO(params).users);

  const postsWithAuthor = mapDTOToPostsEntitiy(posts, users);

  return postsWithAuthor;
};
