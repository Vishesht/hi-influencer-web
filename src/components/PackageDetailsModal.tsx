import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import AlertDialog from "./Alert";
import { showAlert } from "@/lib/features/alert/alertSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BaseUrl } from "@/common/utils";

const PackageDetailsModal = ({
  open,
  onClose,
  pkg,
  influencerId,
  rework = false,
}) => {
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const data = useAppSelector((state) => state.login.userData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setImages(imagePreviews);
  };

  const handleSubmit = async () => {
    const id = pkg.id;

    const item = {
      ...formData,
      images,
      pkgName: pkg.name,
      loggedUserId: data?.id,
      influencerId: influencerId,
    };
    try {
      const cred = {
        id: Date.now(),
        orderDetails: item,
        status: "In Review",
        loggedUserId: data?.id,
        influencerId: influencerId,
      };
      rework
        ? await axios
            .put(`${BaseUrl}/api/orders/update`, {
              id,
              ...cred,
            })
            .then((res) => {
              if (res.status === 201 || res.status === 200) {
                alert("Your request is submitted for approval");
                onClose();
              }
            })
            .catch((err) => console.log("firsterr", err))
        : await axios
            .post(`${BaseUrl}/api/saveneworder`, cred)
            .then((res) => {
              if (res.status === 201 || res.status === 200) {
                dispatch(
                  showAlert({
                    message: "Your request is submitted for approval",
                    confirmText: "Ok",
                  })
                );
                setTimeout(() => {
                  router.push("/orders");
                }, 0);
              } else {
                console.log("firsterr", res);
              }
            })
            .catch((err) => console.log("first-err", err));
    } catch (error) {
      console.error("first", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <AlertDialog />
      <DialogTitle>{pkg.name}</DialogTitle>
      <DialogContent>
        {pkg.name === "Promotions" && (
          <>
            <TextField
              select
              label="Select Media"
              name="selectedMedia"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="photos">Photos</MenuItem>
              <MenuItem value="videos">Videos</MenuItem>
              <MenuItem value="stories">Stories</MenuItem>
            </TextField>
            <TextField
              label="Title"
              name="title"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Selected Images:
            </Typography>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Preview ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
            <TextField
              label="Negotiable Price"
              name="negotiablePrice"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </>
        )}

        {pkg.name === "Free Promotion" && (
          <>
            <TextField
              label="Title"
              name="title"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Selected Images:
            </Typography>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Preview ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
          </>
        )}

        {pkg.name === "Join the Trip with Influencer" && (
          <>
            <TextField
              label="Name"
              name="name"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Phone Number"
              name="phone"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Instagram Link"
              name="instagram"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Profession"
              name="profession"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              select
              label="Gender"
              name="gender"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField
              label="Age"
              name="age"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </>
        )}

        {pkg.name === "Ask for Follow" && (
          <>
            <TextField
              label="Social Media Account"
              name="socialMediaAccount"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </>
        )}

        {pkg.name === "Chat" && (
          <>
            <TextField
              label="Reason for Chatting"
              name="chatReason"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </>
        )}

        {pkg.name === "Book Appointment" && (
          <>
            <TextField
              label="Phone Number"
              name="phone"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Preferred Timing"
              name="timing"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </>
        )}

        {pkg.name === "Invitation" && (
          <>
            <TextField
              label="Location"
              name="location"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Reason for Invitation"
              name="invitationReason"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {rework ? "Send for review" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PackageDetailsModal;
