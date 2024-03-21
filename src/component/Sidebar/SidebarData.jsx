import React from "react";
import { AiFillHome, AiFillHeart  } from "react-icons/ai";
import { IoIosLink } from "react-icons/io";
import { FiAlertCircle } from "react-icons/fi";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Faviorite',
        path: '/faviorite',
        icon: <AiFillHeart />,
        cName: 'nav-text'
    },
    {
        title: 'Origin',
        path: '/origin',
        icon: <IoIosLink />,
        cName: 'nav-text'
    },
    {
        title: 'About',
        path: '/about',
        icon: <FiAlertCircle />,
        cName: 'nav-text'
    }
]