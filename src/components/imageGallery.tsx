import React from "react";

const ImageGallery = ({ images }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap", // Allows images to wrap to the next line
      justifyContent: "center", // Centers images horizontally
      gap: "16px", // Adds consistent spacing between images
    }}
  >
    {images.map((image, index) => (
      <div
        key={index}
        style={{
          position: "relative",
          width: "calc(33% - 16px)", // Adjust width for responsive layout, considering gap
          borderRadius: "8px",
          overflow: "hidden", // Ensures the border radius effect
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Adds a subtle shadow
          transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transitions
        }}
      >
        <img
          src={image}
          alt={`Influencer image ${index}`}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover", // Ensures images cover the container
            transition: "transform 0.3s ease", // Smooth zoom effect on hover
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transition: "opacity 0.3s ease", // Fade effect on hover
            opacity: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark overlay on hover
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#fff", fontSize: "18px", fontWeight: "bold" }}>
            View
          </span>
        </div>
      </div>
    ))}
    <style jsx>{`
      div:hover > img {
        transform: scale(1.1); // Zoom effect on hover
      }
      div:hover > div {
        opacity: 1; // Show overlay on hover
      }
    `}</style>
  </div>
);

export default ImageGallery;
