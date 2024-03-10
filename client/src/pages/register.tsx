import React, {useState, useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import Footer from "../components/footer";

import "../css/register.css"

import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";




export default function Register() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const emailInput = useRef();
  const navigate = useNavigate();

  const sendData = async () => {
    if(acceptTerms)
    {
    try {
      const user = { name: username, mail: email, pass: password };
      const response = await axios.post("https://alto-server.vercel.app/auth/register", user);
  
      const { code, data } = response.data;
  

      switch (code) {
        case 1:  
          const request_user = {
            email: email,
            password: password
          };
  
          const { data: registeredUserData } = await axios.post("https://alto-server.vercel.app/user/postUser", request_user);
  
          const userState = {
            email: registeredUserData.email,
          };
  
          navigate('/', { state: { user: userState } });
          break;
        case 2:
          setErrorMessage("This username already exists");
          console.log(1);
          break;
        case 3:
          setErrorMessage("This email is already taken");
          console.log(2);
          break;
        default:
          setErrorMessage("Unhandled response code");
          console.log(3);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Error during registration:");
    }
  }
    else
    {
      setErrorMessage("Please accept the Terms of Use.");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="max-w-md w-full rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-900 dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-200 dark:text-neutral-200">
        Register
      </h2>
      <p className="text-neutral-300 text-sm max-w-sm mt-2 dark:text-neutral-300">
        If you already have an account go back and Sign In!
      </p>
      {errorMessage && <h2 className = "text-rose-600 font-semibold text-center">{'*'+ errorMessage}</h2>}
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="lastname" className = "text-neutral-200">Username</Label>
            <Input 
            id="username" 
            placeholder="Georgi_24" 
            type="text" 
            className = "bg-zinc-800 text-white"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            ref={emailInput}
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className = "text-neutral-200">Email Address</Label>
          <Input 
          id="email" 
          placeholder="ivanpetrov@react.com" 
          type="email" 
          className = "bg-zinc-800 text-white"
          ref={emailInput}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className = "text-neutral-200">Password</Label>
          <Input 
          id="password" 
          placeholder="••••••••" 
          type="password" 
          className = "bg-zinc-800 text-white"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          />
        </LabelInputContainer>

        <div className="flex items-center mb-4 justify-center hover:bg-none">
          <Input
            type="checkbox"
            id="termsAndConditions"
            className="mr-1"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
          />
          <Label htmlFor="termsAndConditions" className="text-neutral-200">
            I agree to the <a href = "./termsOfUse" className = "text-sky-600 hover:underline transition-shadow">Terms and Conditions</a>
          </Label>
        </div>
        <button
          className="bg-gradient-to-br relative group/btn block bg-zinc-900 w-full text-white rounded-md h-10 font-medium "
          type="submit"
          onClick={sendData}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-200 dark:text-neutral-200" />
            <span className="text-neutral-200 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-200 dark:text-neutral-300" />
            <span className="text-neutral-200 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
