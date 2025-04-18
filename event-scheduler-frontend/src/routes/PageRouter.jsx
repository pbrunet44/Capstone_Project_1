// Created by Philip Brunet

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "../pages/NavBar";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Event from "../pages/Event";
import EventList from "../pages/EventList";
import CreateEvent from "../pages/CreateEvent";
import MyProfile from "../pages/MyProfile";

export default function PageRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="events" element={<EventList />} />
        <Route path="event" element={<Event />}>
          <Route path=":id" element={<Event />} />
        </Route>
        <Route path="create" element={<CreateEvent />} />
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
