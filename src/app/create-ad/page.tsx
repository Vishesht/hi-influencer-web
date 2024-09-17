"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Chip,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

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
}));

const RemoveButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const CreateAds: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [platforms] = useState(["Instagram", "YouTube", "Facebook", "Twitter"]);
  const [categories] = useState(["Travel", "Lifestyle", "Tech", "Food"]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      title,
      description,
      files,
      platforms: selectedPlatforms,
      categories: selectedCategories,
      budget,
    });
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Create a New Ad
      </Typography>
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
              {files.map((file, index) => (
                <UploadPreview key={index}>
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
                    onClick={() => handleRemoveFile(index)}
                    size="small"
                  >
                    <RemoveCircleIcon color="error" />
                  </RemoveButton>
                </UploadPreview>
              ))}
            </ImageGrid>
          </Box>

          <FormControl fullWidth margin="normal">
            <InputLabel>Platforms</InputLabel>
            <Select
              multiple
              value={selectedPlatforms}
              onChange={(e) => setSelectedPlatforms(e.target.value as string[])}
              renderValue={(selected) => (
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {platforms.map((platform) => (
                <MenuItem key={platform} value={platform}>
                  <FormControlLabel control={<Checkbox />} label={platform} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={selectedCategories}
              onChange={(e) =>
                setSelectedCategories(e.target.value as string[])
              }
              renderValue={(selected) => (
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  <FormControlLabel control={<Checkbox />} label={category} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Budget"
            variant="outlined"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: 16 }}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </StyledContainer>
  );
};

export default CreateAds;
