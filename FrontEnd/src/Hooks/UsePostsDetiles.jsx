import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../Store/PostsSlice";
import { useParams } from "react-router-dom";

const UsePostsDetiles = () => {
  const { id } = useParams();
  const { loading, error, record } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);
  return { loading, error, record };
};

export default UsePostsDetiles;
