import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import PostList from "./PostList";

const ListItem = () => {
  return (
    <div>
      <Row>
        <Col xs={{ span: 8, offset: 2 }}>
          <Table striped bordered hover>
            <PostList />
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default ListItem;
