import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import YoutubeThumbnail from './Components/YoutubeThumbnail.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';

const Shorts = lazy(() => import('./Components/Shorts.jsx'));
const Subscriptions = lazy(() => import('./Components/Subscriptions.jsx'));
const History = lazy(() => import('./Components/History.jsx'));
const Profile = lazy(() => import('./Components/Profile.jsx'));
const Signup = lazy(() => import('./Components/Signup.jsx'));
const Login = lazy(() => import('./Components/Login.jsx'));
const Channel = lazy(() => import('./Components/Channel.jsx'));
const Watch = lazy(() => import('./Components/Watch.jsx'));
const InvalidPage = lazy(() => import('./Components/InvalidPage.jsx'));
const ChannelForm = lazy(() => import('./Components/ChannelForm.jsx'));
const Error = lazy(() => import('./Components/Error.jsx'));

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: (
      <Suspense fallback={<div>Loading...</div>}>
        <Error/>
      </Suspense>
    ),
    children: [
      { path: '/', element: <YoutubeThumbnail /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      // Wrap protected routes inside PrivateRoute
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/watch/:id',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Watch />
              </Suspense>
            ),
          },
          {
            path: '/shorts',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Shorts />
              </Suspense>
            ),
          },
          {
            path: '/subscriptions',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Subscriptions />
              </Suspense>
            ),
          },
          {
            path: '/history',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <History />
              </Suspense>
            ),
          },
          {
            path: '/profile',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: '/channel',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Channel />
              </Suspense>
            ),
          },
          {
            path: '/create-channel',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <ChannelForm/>
              </Suspense>
            )
          }
        ],
      },
      {
        path: '/invalid_page',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <InvalidPage />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
