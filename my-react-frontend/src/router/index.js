import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home";
import Signup from "../Login/Signup";
import PersonalPage from "../components/Page/Personal/PersonalPage";
import MyCourse from "../components/Page/MyCourse/MyCourse";
import CourseLessons from "../components/Page/CourseLesson/CourseLesson";
import CoursesList from "../components/Page/CourseList/CourseList";
import CourseDetail from "../components/Page/CourseDetail/CourseDetail";
import LessonDetail from "../components/Page/LessonDetail/LessonDetail";
import LessonQuestion from "../components/Page/LessonQuestion/LessonQuestion";
import AdminDashboard from "../components/Admin/AdminDashboard/AdminDashboard";
import AdminLogin from "../components/Admin/Login/Adminlogin";
import AdminHome from "../components/Admin/Home/AdminHomePage";
import CartPage from "../components/Page/CartPage/CartList";
import { CartProvider } from "../components/Cart/CartContext";

const AuthLayout = () => {
  return <Outlet />;
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <Signup />,
        path: "/signup",
      },
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <PersonalPage />,
        path: "/personal-page",
      },
      {
        element: <MyCourse />,
        path: "/my-course",
      },
      {
        element: <CoursesList />,
        path: "/course",
      },
      {
        element: <CourseDetail />,
        path: "/course/:id",
      },
      {
        element: <CourseLessons />,
        path: "/course/:id/learn",
      },
      {
        element: <LessonDetail />,
        path: "/course/:id/learn/:lessonId",
      },
      {
        element: <LessonQuestion />,
        path: "/course/:id/learn/question",
      },
      {
        element: <CartPage />,
        path: "/cart",
      },
      {
        element: <AdminDashboard />,
        path: "/admin",
      },
      {
        element: <AdminLogin />,
        path: "/admin/login",
      },
      {
        element: <AdminHome />,
        path: "/admin/home",
      },
    ],
  },
]);
