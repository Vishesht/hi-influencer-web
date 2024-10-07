// export const BaseUrl = "http://localhost:5001";
export const BaseUrl = "https://hi-influencer-nodejs.vercel.app";
export const ProfileCheckRegex = /^\/user\/[^\/]+$/;

export const WebUrl = "https://www.hiinfluencer.in";
export const imgPlaceholderImg =
  "https://firebasestorage.googleapis.com/v0/b/hiinfluencer-1c689.appspot.com/o/avatar.jpg?alt=media&token=a66d6700-97fd-4759-8de5-63ba49d2759f";
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
];

export const categories = [
  "Actor",
  "Author & Writer",
  "Beauty Expert",
  "Business",
  "Business Consultant",
  "Chef",
  "Comedian",
  "Digital Content Creator",
  "Entrepreneur",
  "Fashion Designer",
  "Fashion Model",
  "Film Maker",
  "Fitness Influencer",
  "Fitness Trainer",
  "Food Enthusiast",
  "Freelancer",
  "Gamer",
  "Health & Wellness Expert",
  "Illustrator",
  "Lifestyle Blogger",
  "Lifestyle Influencer",
  "Makeup & Beauty Artist",
  "Musician",
  "Professional Dancer",
  "Professional Photographer",
  "Podcaster",
  "Public Speaker",
  "Singer & Vocal Artist",
  "Social Media Influencer",
  "Software Developer",
  "Sports Enthusiast",
  "Tech Enthusiast",
  "Travel Blogger",
  "Vlogger",
  "Visual Artist",
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
  if (userDetails?.packages?.length === 0) {
    missingFields.push("packages");
  }
  if (!userDetails?.category) {
    missingFields.push("category");
  }
  if (!userDetails?.state) {
    missingFields.push("state");
  }
  if (userDetails?.photoURL === imgPlaceholderImg) {
    missingFields.push("image");
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
        case "packages":
          return "Packages";
        case "category":
          return "Category";
        case "state":
          return "State";
        case "image":
          return "Your Profile Image";
        default:
          return "";
      }
    });

    const message = `Add the following items from the edit profile to enable this button: "${missingItems.join(
      ", "
    )}".`;

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

export const adminUserId = "5fc5f033-df88-49fe-980c-becd3c43e1d3";

export const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
