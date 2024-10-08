import { useEffect, useState } from "react";

const useBrowser = () => {
  const [browser, setBrowser] = useState("");

  useEffect(() => {
    const detectBrowser = () => {
      const userAgent = navigator.userAgent;

      if (userAgent.includes("Chrome")) {
        return "Chrome";
      } else if (userAgent.includes("Firefox")) {
        return "Firefox";
      } else if (userAgent.includes("Safari")) {
        return "Safari";
      } else if (userAgent.includes("Edge")) {
        return "Edge";
      } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
        return "Internet Explorer";
      } else {
        return "Unknown Browser";
      }
    };

    const detectedBrowser = detectBrowser();
    setBrowser(detectedBrowser);

    // Optionally, handle unknown browsers
    if (detectedBrowser === "Unknown Browser") {
      window.open("https://www.hiinfluencer.in", "_blank");
    }

    console.log(`User is using: ${detectedBrowser}`);
    alert(detectedBrowser);
  }, []);

  return browser;
};

export default useBrowser;
