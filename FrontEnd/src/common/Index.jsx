import React, { useCallback, useEffect } from "react";
import PostList from "./PostList";
import { deletePosts, setPosts } from "../Store/PostsSlice";
import { useDispatch, useSelector } from "react-redux";
const Index = () => {
  const { records, loading, error } = useSelector((state) => state.posts);
  const { isLoggedIn } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPosts());
  }, [dispatch]);
  const deleteRecord = useCallback(
    (id) => {
      dispatch(deletePosts(id));
    },
    [dispatch]
  );
  return (
    <div>
      <PostList
        data={records}
        loading={loading}
        error={error}
        deleteRecord={deleteRecord}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

export default Index;
