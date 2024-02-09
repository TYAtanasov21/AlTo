import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import MainMenu from './MainMenu';
import SignIn from './signIn';
import Register from './register';
import AppLayout from './UI Files/mainApp';

const router = createBrowserRouter([
  {path: '/', element : <MainMenu/>},
  {path: "/SignIn", element: <SignIn /> },
  {path: "/register", element: <Register />},
  {path: "/UI Files/mainApp", element : <AppLayout children/>}
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;

//map, filter, reduce