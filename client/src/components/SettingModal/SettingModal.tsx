import * as React from "react";
import { useState } from "react";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IUpdateUser, IUser } from "@/interfaces/auth.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { fetchUpdate, selectCurrentUser } from "@/store/slices/userSlice";

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

const validationSchema: Yup.Schema<IUpdateUser> = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  avatar: Yup.string().required("Required"),
});

const SettingsModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const { avatar, lastName, firstName } = currentUser as IUser;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = async (values: IUpdateUser) => {
    const formData = new FormData();
    formData.append('avatar', values.avatar);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    dispatch(fetchUpdate(formData))
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} color="inherit">
        Settings
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Settings
          </Typography>
          <Formik
            initialValues={{
              firstName: firstName || "",
              lastName: lastName || "",
              avatar: avatar || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <div style={{ textAlign: "center" }}>
                  <label htmlFor="avatar">
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        margin: "0 auto",
                        cursor: "pointer",
                      }}
                    >
                      {values.avatar ? (
                        <Image
                          src={values.avatar}
                          alt="Avatar"
                          width={100}
                          height={100}
                        />
                      ) : (
                        <div
                          style={{
                            backgroundColor: "#ccc",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          Select Image
                        </div>
                      )}
                    </div>
                    <input
                      id="avatar"
                      name="avatar"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        if (
                          event.currentTarget.files &&
                          event.currentTarget.files.length > 0
                        ) {
                          setFieldValue(
                            "avatar",
                            URL.createObjectURL(event.currentTarget.files[0])
                          );
                        }
                      }}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>

                <Field
                  as={TextField}
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  margin="normal"
                />
                <ErrorMessage name="firstName" component="div" />

                <Field
                  as={TextField}
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  margin="normal"
                />
                <ErrorMessage name="lastName" component="div" />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  style={{ marginTop: "1rem" }}
                >
                  Update
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                  fullWidth
                  style={{ marginTop: "1rem" }}
                >
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default SettingsModal;
