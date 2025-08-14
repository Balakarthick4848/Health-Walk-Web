import React from 'react';
import { useLocation } from 'react-router-dom';

const pathToTitle = {
  "/": "Dashboard",
  "/registerusers": "Register Users",
  "/certificate": "Certificate",
  "/schedule": "Schedule"
};

export default function DashboardHeader({ title}) {
  const location = useLocation();
    const selectedTitle = pathToTitle[location.pathname] || "Dashboard";
      const userName = localStorage.getItem('resetEmail') || "User"; // Get from localStorage

  return (
    // <AppBar position="static" sx={{ bgcolor: "#2563eb", boxShadow: "none" }}>
    //   <Toolbar sx={{ justifyContent: "space-between" }}>
    //     <Box>
    //       <Typography variant="h6" sx={{ fontWeight: "bold" }}>
    //         DASHBOARD
    //       </Typography>
    //     </Box>
    //     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    //       <Avatar sx={{ bgcolor: "#1e40af", width: 36, height: 36 }}>JN</Avatar>
    //       <Box>
    //         <Typography variant="subtitle2" sx={{ color: "#fff" }}>Jhony Soda</Typography>
    //         <Typography variant="caption" sx={{ color: "#cbd5e1" }}>Administrator</Typography>
    //       </Box>
    //     </Box>
    //   </Toolbar>
    // </AppBar>
    <header class="dashboard-header">
  <div class="dashboard-title">{selectedTitle}</div>
  <div class="dashboard-user">
    <div class="avatar">{userName ? userName[0] : ''}</div>
    <div>
      <div class="user-name">{userName}</div>
      <div class="user-role">Administrator</div>
    </div>
  </div>
</header>
  );
}