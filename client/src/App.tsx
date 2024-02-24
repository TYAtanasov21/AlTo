import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import MainMenu from './pages/mainMenu';
import SignIn from './pages/signIn';
import Register from './pages/register';
import AppLayout from './pages/mainApp';
import TermsOfUse from './pages/termsOfUse';


const router = createBrowserRouter([
  {path: '/', element : <MainMenu/>},
  {path: "/signIn", element: <SignIn /> },
  {path: "/register", element: <Register />},
  {path: "/UI Files/mainApp", element : <AppLayout/>},
  {path: "/termsOfUse", element : <TermsOfUse/>}
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;