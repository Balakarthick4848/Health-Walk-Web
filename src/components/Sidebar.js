// const Sidebar = () => (
//   <div className="w-64 bg-white shadow h-screen p-6">
//     <h1 className="text-xl font-bold text-blue-700 mb-6">Health Walk</h1>
//     <ul className="space-y-4">
//       <li className="font-medium text-gray-700">Dashboard</li>
//       <li className="text-sm text-gray-500">New Users</li>
//       <li className="text-sm text-gray-500">Certificate</li>
//       <li className="text-sm text-gray-500">Schedule</li>
//     </ul>
//   </div>
// );
// export default Sidebar;

import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { FaCertificate } from "@react-icons/all-files/fa/FaCertificate";
import { FaCalendarAlt } from "@react-icons/all-files/fa/FaCalendarAlt";
import { FaChartArea } from "@react-icons/all-files/fa/FaChartArea";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";

const menuItems = [
 { key: "dashboard", icon: <FaChartArea />, label: "Dashboard", path: "/dashboard" },
  // { key: "registerusers", icon: <FaUsers/>, label: "New Users", path: "/registerusers" },
  { key: "certificate", icon: <FaCertificate/>, label: "Certificate", path: "/certificate" },
  { key: "schedule", icon: <FaCalendarAlt />, label: "Schedule", path: "/schedule" },
];
export default function Sidebar() {
  return (
<aside class="sidebar">
  <div class="sidebar-title"> <Link to="/dashboard"><img className="logosidebar" src={logo} alt="Logo" /> </Link></div>
  
  <nav>
    <ul>
      {menuItems.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}>
               {item.icon}&nbsp;{item.label}
              </NavLink>
      {/* {menuItems.map(item => (
       <li key={item.key}
              className={selected === item.label ? "active" : ""}
              onClick={() => onSelect(item.label)} >
              {item.label} */}
        {/* <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <span>🏠</span> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/registerusers" className={({ isActive }) => isActive ? 'active' : ''}>
          <span>👤</span> New Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/certificate" className={({ isActive }) => isActive ? 'active' : ''}>
          <span>📄</span> Certificate
        </NavLink>
      </li>
      <li>
        <NavLink to="/schedule" className={({ isActive }) => isActive ? 'active' : ''}>
          <span>🗓️</span> Schedule
        </NavLink> */}
      </li>
      ))}
    </ul>
  </nav>
</aside>
  );
}
