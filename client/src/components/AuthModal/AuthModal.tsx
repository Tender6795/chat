import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const validationSchema: Yup.Schema<FormValues> = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const LoginModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGoogleLogin = () => {
    // Handle Google login logic
  };

  const handleFormSubmit = (values: FormValues, _: any, actionType: string) => {
    if ((actionType = "login")) {
      alert("login");
    } else {
      alert("registration");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Auth
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={
              (values, _) => handleFormSubmit(values, _, actionType) 
            }
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                />
                <ErrorMessage name="email" component="div" />

                <Field
                  as={TextField}
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                />
                <ErrorMessage name="password" component="div" />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  style={{ marginTop: "1rem" }}
                  onClick={() => setActionType("login")}
                >
                  Login
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  style={{ marginTop: "1rem" }}
                  onClick={() => setActionType("registration")}
                >
                  Registration
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleGoogleLogin}
                  fullWidth
                  style={{ marginTop: "1rem" }}
                >
                  Login with Google
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginModal;
