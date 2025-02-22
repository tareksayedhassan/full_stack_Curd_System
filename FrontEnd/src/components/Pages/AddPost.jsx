import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { insertPosts } from "../../Store/PostsSlice";
import { useNavigate } from "react-router-dom";
import WithGuard from "../../Util/WithGuard";
import { useFormik } from "formik";
import formikYup from "../../Util/validationScima";

const AddPost = () => {
  const { Loading, error } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: formikYup,
    onSubmit: (values) => {
      const id = Math.floor(Math.random() * 500);
      dispatch(
        insertPosts({
          id,
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

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please Enter Your Title"
            onChange={formik.handleChange}
            value={formik.values.title}
            name="title"
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
            onChange={formik.handleChange}
            value={formik.values.description}
            name="description"
            onBlur={formik.handleBlur}
            isInvalid={formik.errors.description && formik.touched.description}
          />
          {formik.errors.description && formik.touched.description && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {!Loading && !error ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : error ? (
          <>
            <p style={{ fontSize: "17px", color: "red", margin: "-5px" }}>
              {error}
            </p>
            <p style={{ fontSize: "17px", color: "red", margin: "-5px" }}>
              Oh !! Server Error
            </p>
          </>
        ) : (
          <p>...Loading</p>
        )}
      </Form>
    </>
  );
};

export default WithGuard(AddPost);
