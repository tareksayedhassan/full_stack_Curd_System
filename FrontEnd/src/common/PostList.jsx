import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const PostList = ({ data, loading, error, deleteRecord, isLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Data loading, please wait...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="4">{error}</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>#{index + 1}</td>
                <td>
                  <Link to={`post/${item.id}`}>{item.title}</Link>
                </td>
                <td>{item.description}</td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      variant="success"
                      onClick={() => navigate(`post/edit/${item.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteRecord(item.id)}
                      disabled={!isLoggedIn}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
