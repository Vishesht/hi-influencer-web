import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    // Add the service worker message event listener
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener(
        "message",
        handleServiceWorkerMessage
      );
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
  }, []);

  return (
    <>
      {/* Toast Container to display the toasts */}
      <ToastContainer />
    </>
  );
};

export default ServiceWorkerToast;
