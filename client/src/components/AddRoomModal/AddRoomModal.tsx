import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import { RoomCreate } from "@/interfaces/room-create.inteface";
import { useAppDispatch } from "@/store/hooks";
// import { createRoom } from "@/store/slices/allRoomsSlice";
import { createRoomApi } from "@/api";

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

const validationSchema: Yup.Schema<RoomCreate> = Yup.object({
  name: Yup.string()
    .min(3, "Nme of room must be at least 6 characters")
    .required("Required"),
});
export const AddRoomModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();

  const hanldeAddRoom = (values: RoomCreate) => {
    // dispatch(createRoom(values));
    createRoomApi(values)
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Create room</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add room
          </Typography>
          <Formik
            initialValues={{ name: "", description: "" }}
            validationSchema={validationSchema}
            onSubmit={hanldeAddRoom}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  id="name"
                  name="name"
                  label="Room name"
                  variant="outlined"
                  margin="normal"
                />
                <ErrorMessage name="name" component="div" />

                <Field
                  as={TextField}
                  fullWidth
                  id="description"
                  name="description"
                  label="description"
                  variant="outlined"
                  margin="normal"
                />
                <ErrorMessage name="description" component="div" />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  style={{ marginTop: "1rem" }}
                >
                  Add Room
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};
