import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import { UiContext } from "../../context";
import { useRouter } from "next/router";

// TODO: crear obj para mapear todas con prop de si tiene q ser responsive o no para opt men wom kids. y crear array para las opt de adm
const ListTitlesText = [
  "Profile",
  "My Orders",
  "Men",
  "Women",
  "Kids",
  "Sign In",
  "Sign Out",
];

export const Sidemenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const onSearchTerm = () => {
    if (!searchQuery.trim()) return;
    navigateTo(`/search/${searchQuery}`);
  };

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
              type="text"
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={"My Orders"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/men")}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Men"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/women")}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Women"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/kid")}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={"Kids"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={"Sign In"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={"Sign Out"} />
          </ListItem>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem button>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={"Products"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={"Orders"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary={"Users"} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
