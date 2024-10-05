"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Divider,
  Toolbar,
  styled,
  AppBar,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  CheckCircle,
} from "@mui/icons-material";
import { registerUser } from "@/api/registerUser";
import { useRouter } from "next/navigation";
import { add } from "@/lib/features/login/loginSlice";
import { useAppDispatch } from "@/lib/hooks";
import SocialMediaLinks from "@/components/SocialMediaLinks";
import { BaseUrl, imgPlaceholderImg } from "@/common/utils";
import axios from "axios";
import ReusableDialog from "@/components/LoginTypePopup";
import { isValidEmail } from "@/common/validations";
import Loading from "@/components/LoadingSpinner";

const HeaderWrapper = styled(AppBar)({
  top: 0,
  left: 0,
  right: 0,
  position: "absolute",
  backgroundColor: "transparent",
  boxShadow: "none",
});

const IconWrapper = styled(IconButton)({
  position: "absolute",
  top: 16,
  left: 16,
});

export default function SignUpPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openSocialMediaDialog, setOpenSocialMediaDialog] = useState(false);
  const [response, setResponse] = useState<any>();
  const [loader, setLoader] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    if (isOtpSent || isOtpVerified) {
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setOtp("");
    }
  }, [email]);

  // Send OTP to email
  const sendOtp = async () => {
    setLoader(true);
    try {
      const res = await axios.post(`${BaseUrl}/api/send-new-user-otp`, {
        email,
      });
      if (res.status === 200) {
        setLoader(false);
        setIsOtpSent(true);
        alert(res?.data?.message || "OTP sent to your email.");
      } else {
        alert(res?.data?.message || "Something went wrong. Please try again");
      }
    } catch (error) {
      console.log("Error sending OTP:", error);
      setLoader(false);
      alert(
        error?.response?.data?.message ||
          "Something went wrong. Please try again"
      );
      if (
        error?.response?.data?.message == "User already exists. Please log in."
      ) {
        router.push("/login");
      }
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    setLoader(true);
    try {
      const res = await axios.post(`${BaseUrl}/api/verify-otp`, { email, otp });
      if (res.status === 200) {
        setLoader(false);
        setIsOtpVerified(true);
        setOtp("");
        // alert("OTP verified successfully.");
      } else {
        alert("Invalid or expired OTP.");
      }
    } catch (error) {
      setLoader(false);
      console.log("Error verifying OTP:", error);
      alert("Failed to verify OTP.");
    }
  };

  const handleSignUp = async (event) => {
    if (password !== confirmPassword) {
      alert("The password and confirmation do not match.");
      return;
    }
    if (!isOtpVerified) {
      alert("Please verify the OTP first.");
      return;
    }

    event.preventDefault();
    try {
      const res = await registerUser(name, email, password);
      setResponse(res);
      dispatch(add(res.user));
      setOpenDialog(true);
    } catch (error) {
      console.log("Error during signup:", error);
    }
  };

  const handleRoleSelection = (role) => {
    if (role === "brand") {
      handleSubmit();
    } else {
      setOpenSocialMediaDialog(true);
    }
    setOpenDialog(false);
  };

  const handleSubmit = async () => {
    const updatedData = {
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
      isClient: true,
      photoURL: imgPlaceholderImg,
    };
    try {
      await axios.post(`${BaseUrl}/api/users`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(add(response.user));
      router.push("/");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <HeaderWrapper>
        <Toolbar>
          <IconWrapper>
            <img
              src="/assets/images/logo.png"
              alt="Icon"
              style={{ height: "30px" }}
            />
          </IconWrapper>
        </Toolbar>
      </HeaderWrapper>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 8,
        }}
      >
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" component="div" gutterBottom>
            Create Your Account
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Join us and connect with top influencers!
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={handleSignUp}
          sx={{ width: "100%", pt: 1, pb: 4 }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
              endAdornment: isOtpVerified ? (
                <InputAdornment position="end">
                  <CheckCircle color="success" />
                </InputAdornment>
              ) : null,
            }}
          />
          {!isOtpSent && isValidEmail(email) && (
            <Button
              onClick={sendOtp}
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#1D4ED8",
                "&:hover": { backgroundColor: "#1A3A8E" },
              }}
            >
              Send OTP
            </Button>
          )}
          {isOtpSent && !isOtpVerified && (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="otp"
                label="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                disabled={otp?.length !== 6}
                onClick={verifyOtp}
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#1D4ED8",
                  "&:hover": { backgroundColor: "#1A3A8E" },
                }}
              >
                Verify OTP
              </Button>
            </>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Visibility />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={!isOtpVerified}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Visibility />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={!isOtpVerified}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#1D4ED8",
              "&:hover": { backgroundColor: "#1A3A8E" },
            }}
            disabled={!isOtpVerified}
          >
            Sign Up
          </Button>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="/login" underline="hover">
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
      <ReusableDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Select Your Role"
        content="Please choose your role:"
        actions={
          <>
            <Button onClick={() => handleRoleSelection("creator")}>
              Join as Creator/Influencer
            </Button>
            <Button onClick={() => handleRoleSelection("brand")}>
              Join as Brand/Client
            </Button>
          </>
        }
      />
      <Loading loading={loader} />
      <ReusableDialog
        open={openSocialMediaDialog}
        onClose={() => setOpenSocialMediaDialog(false)}
        title="Enter Your Social Media Details"
        content={<SocialMediaLinks />}
      />
    </>
  );
}
