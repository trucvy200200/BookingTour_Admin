import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import { useState } from "react"
import ManageTour from './scenes/manageTour';
import ManageTransactions from './scenes/manageTransactions';
import Contacts from './scenes/contacts';
import Login from "./scenes/auth/login"
import { Routes, Route } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            <Route element={<SidebarLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/manage-tour" element={<ManageTour />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/manage-transaction" element={<ManageTransactions />} />
            </Route>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
