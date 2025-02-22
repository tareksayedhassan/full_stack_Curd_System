import React from "react";
import UsePostsDetiles from "../../Hooks/UsePostsDetiles";
import { useDispatch } from "react-redux";

const Details = () => {
  const dispatch = useDispatch();
  const { record, loading, error } = UsePostsDetiles();

  return !loading ? (
    error ? (
      <p>{error}</p>
    ) : (
      <div>
        <h1>Title: {record?.title}</h1>
        <h1>Description: {record?.description}</h1>
      </div>
    )
  ) : (
    <p>...data loading</p>
  );
};

export default Details;
