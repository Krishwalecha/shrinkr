import { Navigate, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import { Signin } from "./pages/Signin.jsx";
import { SignUp } from "./pages/Signup.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";

import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import Overview from "./pages/dashboard/Overview.jsx";
import History from "./pages/dashboard/History.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";
import CreateNew from "./pages/dashboard/CreateNew.jsx";
import Analytics from "./pages/dashboard/Analytics.jsx";
import LinkAnalytics from "./pages/dashboard/LinkAnalytics.jsx";
import Settings from "./pages/dashboard/Settings.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="create" element={<CreateNew />} />
          <Route path="history" element={<History />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="analytics/:id" element={<LinkAnalytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
