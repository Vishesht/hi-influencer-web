export const validatePromotion = (promotion) => {
  const requiredFields = ["videoPrice", "imagePrice", "storyPrice"];
  const errors = [];
  const data = promotion.data || {};
  const platform = promotion.name || "Unknown Platform";

  // Validate for "Promotions"
  if (promotion.name === "Promotions") {
    requiredFields.forEach((field) => {
      if (!(field in data)) {
        errors.push(`Error for ${platform}: Missing ${field}`);
      } else if (Number(data[field]) <= 0) {
        errors.push(`Error for ${platform}: ${field} must be greater than 0`);
      }
    });
  }

  // Validate for "Chat"
  if (promotion.name === "Chat") {
    const chatPrice = data.chatPrice;
    if (chatPrice === undefined || chatPrice === null) {
      errors.push(`Error for ${platform}: Missing chat price`);
    } else if (Number(chatPrice) < 0) {
      errors.push(`Error for ${platform}: Enter the valid price`);
    }
  }

  // Validate for "Book Appointment"
  if (promotion.name === "Book Appointment") {
    const appointmentFields = [
      "appointmentOffer",
      "appointmentPrice",
      "appointmentLocation",
      "appointmentDesc",
    ];
    appointmentFields.forEach((field) => {
      if (!(field in data)) {
        errors.push(`Error for ${platform}: Missing ${field}`);
      }
    });

    if (data.appointmentPrice && Number(data.appointmentPrice) <= 0) {
      errors.push(
        `Error for ${platform}: appointmentPrice must be greater than 0`
      );
    }
  }

  return errors.length > 0 ? errors : [];
};

export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
  return passwordRegex.test(password);
};

export const validateUsername = (username: string) =>
  /^[a-z0-9_]+$/.test(username.trim());

export const validatePhoneNumber = (number) => {
  const phoneNumberPattern = /^\d{10}$/;
  return phoneNumberPattern.test(number);
};

export const validatePlatforms = (data) => {
  for (const item of data) {
    if (!item.platform || !item.platformLink || !item.followers) {
      return {
        error: true,
        message:
          "Each platform must have a valid platform, platformLink, and followers.",
      };
    }
  }
  return { error: false, message: "All platforms are valid." };
};
