/* eslint-disable @typescript-eslint/no-unused-vars */
interface FormCardProps {
  header: string;
  subheader: string;
  title: string;
  isSignUp: boolean;
  message: string;
}

import { useState, type FormEvent } from "react";
import ButtonCard from "./Button.tsx";
import api from "../api/api.tsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const FormCard = ({
  header,
  subheader,
  title,
  isSignUp,
  message,
}: FormCardProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox, setCheckbox] = useState(!isSignUp);

  const navigateTo = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (email.trim() === "") {
      handleError("Email cannot be empty");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      handleError("Please enter a syntactically valid email address");
      return;
    }
    if (password.length <= 7) {
      handleError("Password length cannot be less than 8");
      return;
    }

    if (isSignUp) {
      if (name === "") {
        handleError("Name cannot be empty");
        return;
      }

      if (name.length <= 4) {
        handleError("Name length cannot be less than 5");
        return;
      }

      if (confirmPassword !== password) {
        handleError("Password are not identical");
        return;
      }
      if (!/[A-Z]/.test(password)) {
        handleError("Password must contain at least one uppercase letter");
        return;
      }

      if (!/[a-z]/.test(password)) {
        handleError("Password must contain at least one lowercase letter");
        return;
      }
      if (!/[0-9]/.test(password)) {
        handleError("Password must contain at least one number");
        return;
      }
      handleSignUp();
    } else {
      setCheckbox(true);
      handleSignin();
    }
  }
  async function handleSignUp() {
    console.log("Sign Up Mode");

    try {
      const signUpData = {
        name,
        email,
        password,
      };

      const response = await api.post("/auth/sign-up", signUpData);

      console.log("Sign up success", response.data);

      handleSuccess("Account Created Successfully.");

      setTimeout(() => {
        navigateTo("/");
      }, 2000);
    } catch (error) {
      console.error("Sign Up error", error);
    }
    return;
  }

  async function handleSignin() {
    console.log("Sign in Mode");
    try {
      const signInData = { email, password };
      const response = await api.post("/auth/sign-in", signInData);

      const token = response.data.data.token;
      console.log("Token gotten", token);

      console.log(response);
      console.log(
        "Sign In Success:",
        response.data,
        "User id",
        response.data.data.user._id,
      );

      if (token) {
        localStorage.setItem("token", token);

        localStorage.setItem("userId", response.data.data.user._id);

        console.log("Login successful! Token saved.");
      }

      handleSuccess("Welcome Back!");
      navigateTo("/home");
    } catch (error) {
      console.error("Sign in error", error);
    }
  }

  function handleError(text: string) {
    Swal.fire({
      icon: "error",
      title: `${title} Error`,
      text: text,
      timer: 1000,
      showConfirmButton: false,
    });
  }

  function handleSuccess(text: string) {
    Swal.fire({
      icon: "success",
      title: `Success`,
      text: text,
      timer: 1000,
      showConfirmButton: false,
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center min-h-screen bg-[hsl(0,0%,95%)]">
          <div className="max-w-210 w-full">
            <div className="text-center pb-10">
              <h1 className="font-bold text-3xl">{header}</h1>
              <h3>{subheader}</h3>
            </div>

            <div className="bg-white p-8 rounded-xl">
              <h2 className="font-semibold text-center text-2xl">{title}</h2>
              {isSignUp && (
                <>
                  <div>
                    <label htmlFor="fullName">Full Name</label>
                    <br />
                    <input
                      className="input"
                      type="text"
                      required
                      placeholder="John Doe"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="mt-3">
                <label htmlFor="email">Email</label>
                <input
                  className="input"
                  type="email"
                  required
                  placeholder="john123example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-3">
                <label htmlFor="password">Password:</label>
                <input
                  className="input"
                  type="password"
                  required
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {isSignUp && (
                <>
                  {" "}
                  <div className="mt-3">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                      className="input"
                      type="password"
                      required
                      placeholder="********"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="mt-3 flex justify-center items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      required
                      checked={checkbox}
                      onChange={(e) => setCheckbox(e.target.checked)}
                    />
                    <label htmlFor="checkbox">
                      I agree to the Terms of Service and Privacy Policy.
                    </label>
                  </div>
                </>
              )}
              <div>
                <ButtonCard message={message} disabled={!checkbox}></ButtonCard>
              </div>
              {isSignUp ? (
                <div className="text-center mt-5">
                  <p>
                    Already have an account?{" "}
                    <a
                      onClick={() => navigateTo("/")}
                      className="cursor-pointer text-blue-700"
                    >
                      Log in instead
                    </a>
                  </p>
                </div>
              ) : (
                <div className="text-center mt-5">
                  <p>
                    Don't have an account?{" "}
                    <a
                      onClick={() => navigateTo("/sign-up")}
                      className="cursor-pointer text-blue-700"
                    >
                      Create an account
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormCard;
