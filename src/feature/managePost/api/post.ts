import { usersRequests } from "../../../shared/api/endpoints/users";
import {
  postsRequests,
  CreatePostRequestDTO,
  UpdatePostRequestDTO,
  DeletePostRequestDTO,
} from "../../../shared/api/endpoints/posts";
import { mapDTOToPostsEntitiy } from "./mappers";

export interface GetPostsParams {
  limit: number;
  skip: number;
  select: string;
}

// 게시물 목록 조회
export const getPosts = async (params: GetPostsParams) => {
  const posts = await postsRequests.getPosts({
    query: {
      limit: params.limit,
      skip: params.skip,
    },
  });

  const users = await usersRequests.getUsers({
    query: {
      limit: params.limit,
      select: params.select,
    },
  });

  const postsWithAuthor = mapDTOToPostsEntitiy(posts, users);

  return postsWithAuthor;
};

// 게시물 생성
export const createPost = async (params: CreatePostRequestDTO) => {
  const response = await postsRequests.createPost(params);

  return response;
};

// 게시물 수정
export const updatePost = async (params: UpdatePostRequestDTO) => {
  const response = await postsRequests.updatePost(params);

  return response;
};

// 게시물 삭제
export const deletePost = async (params: DeletePostRequestDTO) => {
  const response = await postsRequests.deletePost(params);

  return response;
};
