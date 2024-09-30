import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Tooltip,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";

const InfluencerProfileComponent = ({
  influencer = false,
  influencerDetails,
}) => {
  return (
    <Card sx={{ maxWidth: 600, mt: 1, backgroundColor: "transparent" }}>
      <CardContent>
        <Typography sx={{ mb: 1, fontWeight: "700" }}>
          {influencer ? "Influencer" : "Client"}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            alt={influencerDetails?.influencerImg}
            src={influencerDetails?.influencerImg}
            sx={{ width: 42, height: 42 }}
          />
          <Stack direction="row" alignItems="center">
            <Typography variant="h5" component="div">
              {influencerDetails?.name}
            </Typography>
            {influencerDetails?.verified && (
              <Tooltip title="Verified" arrow>
                <VerifiedIcon sx={{ color: "blue", ml: 1 }} />
              </Tooltip>
            )}
          </Stack>
        </Stack>
        {influencerDetails?.phoneNumber ||
          (influencerDetails?.email && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {influencerDetails?.email +
                `${influencerDetails?.phoneNumber ? "-" : ""}` +
                (influencerDetails?.phoneNumber || "")}
            </Typography>
          ))}
        <Typography variant="body2" color="text.secondary" sx={{}}>
          {influencerDetails?.gender}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {(influencerDetails?.address
            ? influencerDetails?.address
            : "" + " " + influencerDetails?.state) || "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfluencerProfileComponent;
