import * as Icons from "react-icons/fa";

export const navItems = [
  {
    id: 1,
    title: "Home",
    path: "./",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaHome />,
  },
  // {
  //   id: 2,
  //   title: "+Parcel",
  //   path: "./admin",
  //   nName: "nav-item",
  //   sName: "sidebar-item",
  //   icon: <Icons.FaCartArrowDown />,
    
  // },
  {
    id: 3,
    title: "Channels",
    path: "./addchannel",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaBriefcase />,
  },
  {
    id: 4,
    title: "Admin",
    path: "./admin",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaPhone />,
  },
];