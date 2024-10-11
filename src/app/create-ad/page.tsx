"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Grid,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import { BaseUrl, indianStates } from "@/common/utils";
import { useRouter } from "next/navigation";
import { storage } from "../firebase";

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const ImageGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const UploadPreview = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 100,
  height: 100,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  boxShadow: theme.shadows[2],
  cursor: "pointer",
}));

const RemoveButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const CreateAds: React.FC = ({ searchParams }) => {
  const router = useRouter();
  const data = useAppSelector((state) => state.login.userData);
  const editAds = useAppSelector((state) => state.ads);
  const [title, setTitle] = useState(
    searchParams?.edit ? editAds?.ads?.title : ""
  );
  const [description, setDescription] = useState(
    searchParams?.edit ? editAds?.ads?.desc : ""
  );
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    searchParams?.edit ? editAds?.ads?.adsImages : []
  );
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams?.edit ? editAds?.ads?.category : ""
  );
  const [budget, setBudget] = useState(
    searchParams?.edit ? editAds?.ads?.budget : ""
  );
  const [selectedState, setSelectedState] = useState(
    searchParams?.edit ? editAds?.ads?.state : ""
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const categories = [
    "Promotion",
    "Skill",
    "Invitation",
    "Events",
    "Meetup",
    "Job",
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleRemoveExistingImage = (index: number) => {
    const newExistingImages = [...existingImages];
    newExistingImages.splice(index, 1);
    setExistingImages(newExistingImages);
  };

  const handleImageClick = (url: string) => {
    const imgWindow = window.open(url, "_blank");
    imgWindow?.focus();
  };

  const uploadImages = async () => {
    const imageUrls: string[] = [];
    for (const file of files) {
      const storageRef = ref(storage, `ads/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      imageUrls.push(downloadURL);
    }
    return imageUrls;
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    if (!title) {
      setErrorMessage("Please add the title");
      return;
    } else if (!description) {
      setErrorMessage("Please add the description");
      return;
    } else if (!selectedCategories) {
      setErrorMessage("Please select the category");
      return;
    } else if (!selectedState) {
      setErrorMessage("Please select the state");
      return;
    } else if (!budget) {
      setErrorMessage("Please select the price");
      return;
    }
    setLoading(true); // Start loader
    try {
      const uploadedImageUrls = await uploadImages();
      const creds = {
        id: data?.id,
        name: data?.name,
        email: data?.email,
        isInfluencer: false,
        photoURL: data?.photoURL,
        state: selectedState,
        title,
        desc: description,
        category: selectedCategories,
        budget,
        adsImages: [...existingImages, ...uploadedImageUrls],
      };

      if (!searchParams?.edit) {
        await axios.post(`${BaseUrl}/api/postads`, creds);
      } else {
        await axios.put(
          `${BaseUrl}/api/edituserads/${editAds?.ads?._id}`,
          creds
        );
      }
      setSuccessMessage(
        searchParams?.edit
          ? "Ad edited successfully!"
          : "Ad created successfully!"
      );
      setErrorMessage("");
      router.push("/ads");
    } catch (error) {
      setErrorMessage(
        `Failed to ${
          searchParams?.edit ? "edit" : "create"
        } ad. Please try again.`
      );
      setSuccessMessage("");
      console.error(error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const handleDeleteAd = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ad?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${BaseUrl}/api/deleteuserads/${editAds?.ads?._id}`);
        setSuccessMessage("Ad deleted successfully!");
        setErrorMessage("");
        router.push("/ads");
      } catch (error) {
        setErrorMessage("Failed to delete ad. Please try again.");
        console.error(error);
      }
    }
  };

  return (
    <StyledContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom>
          {searchParams?.edit ? "Edit Ad" : "Create a New Ad"}
        </Typography>
        {searchParams?.edit && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteAd}
          >
            Delete
          </Button>
        )}
      </Box>
      <Card>
        <CardContent>
          <TextField
            fullWidth
            label="Ad Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />

          <Box margin="normal">
            <InputLabel>Upload Images/Videos</InputLabel>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
              style={{ marginTop: 8 }}
            />
            <ImageGrid>
              {/* Display existing images */}
              {existingImages?.map((url, index) => (
                <UploadPreview
                  key={index}
                  onClick={() => handleImageClick(url)}
                >
                  <img
                    src={url}
                    alt="Existing"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <RemoveButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveExistingImage(index);
                    }}
                    size="small"
                  >
                    <RemoveCircleIcon color="error" />
                  </RemoveButton>
                </UploadPreview>
              ))}
              {/* Display new image uploads */}
              {files.map((file, index) => (
                <UploadPreview
                  key={index}
                  onClick={() => handleImageClick(URL.createObjectURL(file))}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <RemoveButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(index);
                    }}
                    size="small"
                  >
                    <RemoveCircleIcon color="error" />
                  </RemoveButton>
                </UploadPreview>
              ))}
            </ImageGrid>
          </Box>

          <FormControl fullWidth margin="normal">
            <Select
              value={selectedCategories}
              onChange={(e) => setSelectedCategories(e.target.value)}
              renderValue={(value) => value || "Select Category"}
              displayEmpty
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              renderValue={(value) => value || "Select State"}
              displayEmpty
            >
              {indianStates.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Budget"
            variant="outlined"
            value={budget}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setBudget(value);
              }
            }}
            margin="normal"
            placeholder="Add your amount"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rs</InputAdornment>
              ),
              sx: {
                "& input::placeholder": {
                  fontSize: "0.8rem",
                },
              },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: 16 }}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>

          {successMessage && (
            <Typography color="green" style={{ marginTop: 16 }}>
              {successMessage}
            </Typography>
          )}
          {errorMessage && (
            <Typography color="red" style={{ marginTop: 16 }}>
              {errorMessage}
            </Typography>
          )}
        </CardContent>
      </Card>
    </StyledContainer>
  );
};

export default CreateAds;
