import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { messaging } from "@/app/firebase";

const ServiceWorkerToast = () => {
  const handleServiceWorkerMessage = (event: MessageEvent) => {
    const msg = event.data?.firebaseMessaging;

    if (msg?.payload?.notification) {
      const { title, body } = msg.payload.notification;
      console.log("Notification received:", title, body);

      // Show toast notification
      toast.info(`${title}: ${body}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    // Only register the service worker if messaging is supported
    if (typeof window !== "undefined" && messaging) {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((registration) => {
            console.log(
              "Service Worker registered successfully:",
              registration
            );
            navigator.serviceWorker.addEventListener(
              "message",
              handleServiceWorkerMessage
            );
          })
          .catch((err) => {
            console.error("Service Worker registration failed:", err);
          });
      }
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.removeEventListener(
          "message",
          handleServiceWorkerMessage
        );
      }
    };
  }, [messaging]);

  return (
    <>
      {/* Toast Container to display the toasts */}
      <ToastContainer />
    </>
  );
};

export default ServiceWorkerToast;
