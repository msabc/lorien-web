import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export default function NavigationLayout({ children }) {
  const pages = ['home', 'about']
  const links = ['/home','/about'];

  return (
    <>
      <div>
        <AppBar position="static">
          <Container maxWidth="l">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page, index) => (
                  <Button
                    key={page}
                    href={links[index]}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
      <main>
        <Container sx={{ mt: 10 }}>{children}</Container>
      </main>
    </>
  );
}
