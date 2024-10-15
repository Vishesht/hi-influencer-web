import axios from "axios";
import { BaseUrl } from "@/common/utils";

export const sendNotification = async (toEmail, title, body, html = "") => {
  const notificationData = {
    email: toEmail,
    title: title,
    body: body,
    html: html,
  };

  try {
    const response = await axios.post(
      `${BaseUrl}/service/send-notification`,
      notificationData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Notification sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
