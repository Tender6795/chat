import * as React from "react";
import { useState } from "react";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { google, register } from "@/api";
import { signIn } from "next-auth/react";
import { IAuth } from "@/interfaces/auth.interface";
import { useAppDispatch } from "@/store/hooks";
import { fetchLogin, fetchRegistration } from "@/store/slices/userSlice";

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

const validationSchema: Yup.Schema<IAuth> = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const AuthModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGoogleLogin = () => {
    // google()
    signIn("google");
  };

  const handleFormSubmit = async (
    values: IAuth,
    _: any,
    actionType: string
  ) => {
    let res = null;
    if (actionType === "login") {
      res = await dispatch(fetchLogin(values));
    } else {
      res = await dispatch(fetchRegistration(values));
    }
    // @ts-ignore
    if (res?.error) {
      // @ts-ignore
      setError(res.error.message);
      return;
    }
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} color="inherit">
        Auth
      </Button>
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
            onSubmit={(values, _) => handleFormSubmit(values, _, actionType)}
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
                {error && (
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                )}
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

                {/* <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleGoogleLogin}
                  fullWidth
                  style={{ marginTop: "1rem" }}
                >
                  Login with Google
                </Button> */}
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
