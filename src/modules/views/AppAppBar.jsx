import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppAppBar() {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const USER_NAME = localStorage.getItem("USER_NAME");
  let USER_ROLE = localStorage.getItem("USER_ROLE");
  if (USER_ROLE == "ROLE_INDIVIDUAL") {
    USER_ROLE = "개인회원";
  } else if (USER_ROLE == "ROLE_CORP") {
    USER_ROLE = "기업회원";
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/order-list"
          >
            {USER_NAME !== "null"
              ? `${USER_NAME}${USER_ROLE} 님 어서오세요`
              : ""}
          </Link>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {"당신과 함께하는 letmego.app"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href={accessToken === "null" ? "/sign-in/" : "/sign-out"}
              sx={rightLink}
            >
              {accessToken === "null" ? "로그인" : "로그아웃"}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/sign-up/"
              sx={{ ...rightLink, color: "secondary.main" }}
            >
              {accessToken === "null" ? "회원가입" : ""}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
