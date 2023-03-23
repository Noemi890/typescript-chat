import { FC } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

interface Props {
  handleLogOut: () => void;
}

export const NavBar: FC<Props> = ({ handleLogOut }) => {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "45px" }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Logout" onClick={handleLogOut} />
      </BottomNavigation>
    </Paper>
  );
};
