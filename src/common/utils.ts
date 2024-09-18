// export const BaseUrl = "http://localhost:5001";
export const BaseUrl = "https://hi-influencer-nodejs.onrender.com";
export const ProfileCheckRegex = /^\/user\/[^\/]+$/;

export const imgPlaceholderImg = "https://i.pravatar.cc/300";
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

export const cleanImageUrl = (url) => {
  if (url?.includes("googleusercontent.com")) {
    return url.split("=")[0];
  }

  const uniqueId = Math.floor(Math.random() * 100000);
  return url ? url : `https://i.pravatar.cc/150?u=${uniqueId}`;
};
