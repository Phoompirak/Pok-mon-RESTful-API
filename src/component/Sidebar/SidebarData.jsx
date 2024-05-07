import React from "react";
import { AiFillHome, AiFillHeart  } from "react-icons/ai";
import { IoIosLink } from "react-icons/io";
import { FiAlertCircle } from "react-icons/fi";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
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
        path: 'https://pokeapi.co/',
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