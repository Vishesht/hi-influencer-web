export const BaseUrl = "http://localhost:5001";
// export const BaseUrl = "https://hi-influencer-nodejs.vercel.app";
export const ProfileCheckRegex = /^\/user\/[^\/]+$/;

export const imgPlaceholderImg =
  "https://firebasestorage.googleapis.com/v0/b/hiinfluencer-1c689.appspot.com/o/avatar.avif?alt=media&token=668ca47c-867b-4716-9086-8df3aca7b66c";
// "https://i.pravatar.cc/300";
export const womenPlaceholderImg =
  "https://randomuser.me/api/portraits/women/41.jpg";

export const indianStates = [
  "Andhra Pradesh",
  "Bihar",
  "Delhi",
  "Goa",
  "Gujarat",
  "Jammu and Kashmir",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Uttar Pradesh",
  "Karnataka",
];

export const socialMediaPlatforms = [
  "Instagram",
  "Youtube",
  "Facebook",
  "Twitter",
  "LinkedIn",
  "Telegram",
];

export const categories = [
  "Influencer",
  "Blogger",
  "Content Creator",
  "Photographer",
];

export const genderList = ["Male", "Female", "Others"];

export const cleanImageUrl = (url, fix?) => {
  if (url?.includes("googleusercontent.com")) {
    return url.split("=")[0];
  }
  return url ? url : "";
};

export const truncateText = (text, charLimit) => {
  return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
};

export const checkUserDetails = (userDetails) => {
  // Required fields to check
  const requiredFields = ["name", "phoneNumber", "username"];

  // Check if platform array is empty
  const platformMissing =
    !userDetails.platform || userDetails.platform.length === 0;

  // Initialize array to hold missing fields
  const missingFields = [];

  // Check for missing required fields
  requiredFields.forEach((field) => {
    if (!userDetails[field] || userDetails[field].trim() === "") {
      missingFields.push(field);
    }
  });

  // Add platform to missing fields if it's empty
  if (platformMissing) {
    missingFields.push("platform");
  }

  // Construct the response based on missing fields
  if (missingFields.length > 0) {
    const missingItems = missingFields.map((field) => {
      switch (field) {
        case "name":
          return "Name";
        case "phoneNumber":
          return "Phone Number";
        case "platform":
          return "Social Media Accounts";
        case "username":
          return "Username";
        default:
          return "";
      }
    });

    const message = `Please complete the following required fields: ${missingItems.join(
      ", "
    )} to make this button enable`;
    return {
      userDetailsMissing: true,
      message,
    };
  }

  return {
    userDetailsMissing: false,
    message: "Verify your account to get listed in the influencer screen",
  };
};
