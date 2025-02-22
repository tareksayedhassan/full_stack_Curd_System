import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { editPost } from "../../Store/PostsSlice";
import { useNavigate } from "react-router-dom";
import WithGuard from "../../Util/WithGuard";
import formikYup from "../../Util/validationScima";
import UsePostsDetiles from "../../Hooks/UsePostsDetiles";

const EditPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { record } = UsePostsDetiles();

  const formik = useFormik({
    initialValues: {
      title: record ? record.title : "",
      description: record ? record.description : "",
    },
    validationSchema: formikYup,
    onSubmit: (values) => {
      dispatch(
        editPost({
          id: record.id,
          title: values.title,
          description: values.description,
        })
      )
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  useEffect(() => {
    if (record) {
      formik.setValues({
        title: record?.title || "",
        description: record?.description || "",
      });
    }
  }, [record]);

  useEffect(() => {
    dispatch({ type: "posts/cleanRecord" });
  }, [dispatch]);

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please Enter Your Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.errors.title && formik.touched.title}
          />
          {formik.errors.title && formik.touched.title && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.title}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.errors.description && formik.touched.description}
          />
          {formik.errors.description && formik.touched.description && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default WithGuard(EditPost);
