import { queryOptions } from "@tanstack/react-query";
import { getPosts } from "./post";
import { GetPostsParams } from "./post";

export const postQueries = {
  // 모든 게시물 관련 기본 키
  all: () => ["posts"] as const,
  // 게시물 목록 키
  lists: () => [...postQueries.all(), "list"] as const,

  // 게시물 목록
  list: (params: GetPostsParams) =>
    queryOptions({
      queryKey: [...postQueries.lists(), params],
      queryFn: () => getPosts(params),
    }),
};
