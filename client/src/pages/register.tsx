// import React, { useState, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import Footer from "../components/footer";

// function Register() {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState<string>('');
//   const [errorMessage, setErrorMessage] = useState<string>('');
//   const [greeting, setGreeting] = useState<string>('');
//   const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
//   const emailInput = useRef();
//   const navigate = useNavigate();

//   const sendData = async () => {
//     if(acceptTerms)
//     {
//     try {
//       const user = { name: username, mail: email, pass: password };
//       const response = await axios.post("https://alto-server.vercel.app/auth/register", user);
  
//       const { code, data } = response.data;
  

//       switch (code) {
//         case 1:
//           setGreeting("Registration successful!");
  
//           const request_user = {
//             email: email,
//             password: password
//           };
  
//           const { data: registeredUserData } = await axios.post("https://alto-server.vercel.app/user/postUser", request_user);
  
//           const userState = {
//             email: registeredUserData.email,
//           };
  
//           navigate('/', { state: { user: userState } });
//           break;
//         case 2:
//           setErrorMessage("This username already exists");
//           console.log(1);
//           break;
//         case 3:
//           setErrorMessage("This email is already taken");
//           console.log(2);
//           break;
//         default:
//           setErrorMessage("Unhandled response code");
//           console.log(3);
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       setErrorMessage("Error during registration:");
//     }
//   }
//     else
//     {
//       setErrorMessage("Please accept the Terms of Use.");
//     }
//   };
  

//   return (
//     <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-r from-neutral-800 to-neutral-900 text-white">
//       <div className="flex flex-col items-center justify-center h-screen">
//         <h2 className="text-3xl font-semibold mb-6">Register</h2>
//         <form className="bg-neutral-700 p-8 rounded-lg shadow-md w-96">
//         {errorMessage && <h2 className = "text-rose-700 font-semibold text-center">{'*'+ errorMessage}</h2>}
//         <div className="mb-4">
//           <label htmlFor="exampleInputUsername" className="text-gray-300 block mb-2">
//             Username
//           </label>
//           <input
//             type="username"
//             name="username"
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-neutral-600 bg-neutral-800 text-white"
//             ref={emailInput}
//             id="exampleInputUsername"
//             placeholder="Your Username"
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="exampleInputEmail" className="text-gray-300 block mb-2">
//             Email address
//           </label>
//           <input
//             type="email"
//             name="email"
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-neutral-600 bg-neutral-800 text-white"
//             ref={emailInput}
//             id="exampleInputEmail"
//             placeholder="Your Email"
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="exampleInputPassword" className="text-gray-300 block mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-neutral-600 bg-neutral-800 text-white"
//             id="exampleInputPassword"
//             placeholder="Your Password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//           />
//             <label className="flex items-center mt-2">
//               <input
//                 type="checkbox"
//                 checked={acceptTerms}
//                 onChange={() => setAcceptTerms(!acceptTerms)}
//                 className="form-checkbox h-4 w-4 text-neutral-600 border-neutral-600 focus:ring-neutral-500"
//               />
//               <span className="ml-2 text-gray-300">
//                 I accept the <Link to="/termsOfUse" className="text-sky-500 hover:text-sky-700 hover:underline">Terms of Use</Link>
//               </span>
//             </label>

//         </div>
//         <div className="flex flex-row">
//           <button
//             onClick={sendData}
//             type="button"
//             className="bg-neutral-900 text-white py-2 px-4 rounded-md hover:bg-neutral-800 focus:outline-none transition-colors"
//           >
//             Register
//           </button>
//           <button
//           onClick = {() => {navigate('/')}}
//           type = "button"
//           className="btn btn-link hover:text-zinc-500 hover:underline underline-offset-1 text-white transition-colors ml-3"
//           >Back</button>
//         </div>
//       </form>
//     </div>
//     {greeting && <h1 className = "text-green-500">{greeting}</h1>}
//     <div className = "footer">
//         <Footer/>
//       </div>
//       <section>
//         <div className="wave wave1"></div>
//         <div className="wave wave2"></div>
//         <div className="wave wave3"></div>
//         <div className="wave wave4"></div>
//       </section>
//   </div>
//   );
// }

// export default Register;


import React from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="max-w-md w-full rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-900 dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-200 dark:text-neutral-200">
        Register
      </h2>
      <p className="text-neutral-300 text-sm max-w-sm mt-2 dark:text-neutral-300">
        If you already have an account go back and Sign In!
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname" className = "text-neutral-200 ">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" className = "bg-zinc-800 text-white"/>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className = "text-neutral-200">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" className = "bg-zinc-800 text-white"/>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className = "text-neutral-200">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" className = "bg-zinc-800 text-white"/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className = "text-neutral-200">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" className = "bg-zinc-800 text-white"/>
        </LabelInputContainer>
        <div className="flex items-center mb-4 justify-center hover:bg-none">
          <Input
            type="checkbox"
            id="termsAndConditions"
            className="mr-1"
          />
          <Label htmlFor="termsAndConditions" className="text-neutral-200">
            I agree to the Terms and Conditions
          </Label>
        </div>
        <button
          className="bg-gradient-to-br relative group/btn block bg-zinc-900 w-full text-white rounded-md h-10 font-medium "
          type="submit"
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
