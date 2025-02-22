import * as Yup from "yup";

const formikYup = Yup.object().shape({
  title: Yup.string()
    .min(2, "⚠️ Hello user, the title is too short!")
    .max(50, "⚠️ The title is too long! Maximum 50 characters.")
    .required("⚠️ The title field is required."),
  description: Yup.string()
    .min(2, "⚠️ The description is too short! Please add more details.")
    .max(50, "⚠️ The description is too long! Keep it under 50 characters.")
    .required("⚠️ The description field is required."),
});
export default formikYup;
