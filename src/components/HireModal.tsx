import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Upload, Close } from "@mui/icons-material"; // Import Close icon for removal
import { styled } from "@mui/material/styles";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: "80%",
  maxWidth: 800,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
}));

const UploadButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const MediaList = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const FileInput = styled("input")({
  display: "none",
});

const FullSizeModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const FullSizeContent = styled(Box)(({ theme }) => ({
  maxWidth: "90%",
  maxHeight: "90%",
  position: "relative",
  overflow: "auto", // Allow scrolling
  backgroundColor: theme.palette.background.paper,
}));

const HireModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [promotionType, setPromotionType] = useState("");
  const [budget, setBudget] = useState<number>(0);
  const [fullSize, setFullSize] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleFileClick = (file: File) => {
    setFullSize(file);
  };

  const handleRemoveFile = (file: File) => {
    setFiles(files.filter((f) => f !== file));
  };

  const handleSubmit = () => {
    onClose();
    // Handle form submission
    console.log({ title, description, files, promotionType, budget });
    // Reset form or perform further actions
  };

  const handleBudgetChange = (amount: number) => {
    setBudget((prevBudget) => prevBudget + amount);
  };

  return (
    <>
      <StyledModal open={open} onClose={onClose}>
        <StyledBox>
          <Typography variant="h5" sx={{ fontWeight: "600" }} gutterBottom>
            Hire Influencer
          </Typography>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Promotion Type</InputLabel>
            <Select
              value={promotionType}
              onChange={(e) => setPromotionType(e.target.value)}
              label="Promotion Type"
            >
              <MenuItem value="video">Video</MenuItem>
              <MenuItem value="photo">Photo</MenuItem>
              <MenuItem value="story">Story</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Budget"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            margin="normal"
            type="number"
          />
          <label htmlFor="file-upload">
            <FileInput
              id="file-upload"
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
            />
            <UploadButton
              variant="contained"
              color="primary"
              startIcon={<Upload />}
            >
              Upload Images/Videos
            </UploadButton>
          </label>
          <MediaList>
            {files.map((file, index) => (
              <Typography
                key={index}
                onClick={() => handleFileClick(file)}
                sx={{ cursor: "pointer", marginBottom: 1 }}
              >
                {file.name}
              </Typography>
            ))}
          </MediaList>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </StyledBox>
      </StyledModal>
      <FullSizeModal open={Boolean(fullSize)} onClose={() => setFullSize(null)}>
        <FullSizeContent>
          {fullSize?.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(fullSize)}
              alt={fullSize.name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                display: "block",
                margin: "auto",
              }}
            />
          ) : (
            <video
              src={""}
              controls
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                display: "block",
                margin: "auto",
              }}
            />
          )}
          <IconButton
            onClick={() => setFullSize(null)}
            style={{ position: "absolute", top: 8, right: 8, color: "white" }}
          >
            <Close />
          </IconButton>
        </FullSizeContent>
      </FullSizeModal>
    </>
  );
};

export default HireModal;
