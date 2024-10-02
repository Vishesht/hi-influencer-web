// export const BaseUrl = "http://localhost:5001";
export const BaseUrl = "https://hi-influencer-nodejs.vercel.app";
export const ProfileCheckRegex = /^\/user\/[^\/]+$/;

export const WebUrl = "https://hi-influencer-web-qd5q.vercel.app";
export const imgPlaceholderImg =
  "https://firebasestorage.googleapis.com/v0/b/hiinfluencer-1c689.appspot.com/o/avatar.avif?alt=media&token=668ca47c-867b-4716-9086-8df3aca7b66c";
// "https://i.pravatar.cc/300";
export const womenPlaceholderImg =
  "https://randomuser.me/api/portraits/women/41.jpg";

export const indianStates = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
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
  "Social Media Influencer",
  "Lifestyle Blogger",
  "Digital Content Creator",
  "Professional Photographer",
  "Singer & Vocal Artist",
  "Makeup & Beauty Artist",
  "Professional Dancer",
  "Food Enthusiast",
  "Actor",
  "Musician",
  "Gamer",
  "Fitness Trainer",
  "Chef",
  "Fashion Designer",
  "Entrepreneur",
  "Public Speaker",
  "Comedian",
  "Visual Artist",
  "Fashion Model",
  "Podcaster",
  "Author & Writer",
  "Tech Enthusiast",
  "Travel Blogger",
  "Health & Wellness Expert",
  "Sports Enthusiast",
  "Vlogger",
  "Film Maker",
  "Illustrator",
  "Lifestyle Influencer",
  "Beauty Expert",
  "Fitness Influencer",
  "Business Consultant",
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

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate.replace(",", "");
};

export const adminUserId = "ac8000bd-62ac-4fa5-b76b-9340951113e1";
