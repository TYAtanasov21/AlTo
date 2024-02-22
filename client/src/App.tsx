import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import MainMenu from './mainMenu';
import SignIn from './signIn';
import Register from './register';
import AppLayout from './mainApp';


const router = createBrowserRouter([
  {path: '/', element : <MainMenu/>},
  {path: "/signIn", element: <SignIn /> },
  {path: "/register", element: <Register />},
  {path: "/UI Files/mainApp", element : <AppLayout children/>}
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;