import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import '../styles/DashboardHeader.css';

export default function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#193E9F", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            DASHBOARD
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ bgcolor: "#1bc261ff", width: 36, height: 36 }}>A</Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ color: "#fff" }}>Administrator</Typography>
            {/* <Typography variant="caption" sx={{ color: "#cbd5e1" }}>Administrator</Typography> */}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}