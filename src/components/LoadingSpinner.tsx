// components/LoadingSpinner.tsx
const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <style jsx>{`
      .spinner-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #fff;
      }
      .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top: 4px solid #3498db;
        width: 50px;
        height: 50px;
        animation: spin 1s infinite linear;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export default LoadingSpinner;
