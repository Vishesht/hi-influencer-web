"use client";
import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { menPlaceholderImg } from "@/common/utils";

const GridComponent = ({ data }) => {
  return (
    <Box
      sx={{
        alignSelf: "center",
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)", // 2 items per row on mobile
          sm: "repeat(3, 1fr)", // 3 items per row on tablets
          md: "repeat(4, 1fr)", // 4 items per row on web
        },
        gap: 2,
        justifyContent: "center",
        padding: 2,
        mt: 4,
      }}
    >
      {data.map((item, index) => (
        <Card
          key={index}
          sx={{
            width: "100%",
            maxWidth: 230,
            borderRadius: 2,
            boxShadow: 3,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: 6,
            },
            cursor: "pointer",
          }}
        >
          <CardMedia
            component="img"
            image={item.photoURL || menPlaceholderImg}
            alt={item.name}
            sx={{
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              height: 180,
            }}
          />
          <CardContent
            sx={{
              height: 120,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: "Arial, sans-serif", // Replace with your custom font family
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Typography>
            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
              {/* Uncomment and use if needed
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Arial, sans-serif", // Replace with your custom font family
                  mr: 0.5,
                }}
              >
                {item.star || "0.0"}
              </Typography>
              <StarIcon sx={{ height: 16, color: "primary.main" }} />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Arial, sans-serif", // Replace with your custom font family
                  ml: 0.5,
                }}
              >
                ({item.ratings || "0"})
              </Typography> */}
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: "sans-serif",
              }}
            >
              {item.category}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: "sans-serif",
                mb: 0.5,
              }}
            >
              {item.state}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default GridComponent;
