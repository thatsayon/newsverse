"use client";
import * as React from "react";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GContact from "./General_Contact";
import CContact from "./ContactInfo";
import SContact from "./SocialInfo";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Contact() {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="mt-20">
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            bgcolor: "background.paper",
            width: "100%",
            height: "70vh",
            maxWidth: 800,
            margin: "auto",
          }}
        >
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#d7f64e",
                },
              }}
            >
              <Tab label="Send message" {...a11yProps(0)} />
              <Tab label="Contact Info" {...a11yProps(1)} />
              <Tab label="Social media" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <div>
            <TabPanel value={value} index={0}>
              <GContact />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <CContact />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <SContact />
            </TabPanel>
          </div>
        </Box>
      </ThemeProvider>
    </div>
  );
}
