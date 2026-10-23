import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import Index from "./pages/HOME/Index";
import Admin from "./pages/ADMIN/Admin";
import EditIntro from "./pages/ADMIN/EditIntro";
import ProjectEdit from "./pages/ADMIN/ProjectInfoEdit";
import ContactEdit from "./pages/ADMIN/ContactEdit";
import ServiceParaEdit from "./pages/ADMIN/ServiceParaEdit";
import ServiceCard from "./pages/ADMIN/serviceCard";
import AddServiceCard from "./pages/ADMIN/AddServiceCard";
import EditServiceCard from "./pages/ADMIN/EditServiceCard";
import AddNewProject from "./pages/ADMIN/AddNewProject";
import EditProjectInfo from "./pages/ADMIN/EditProjectInfo";
import EditAbout from "./pages/ADMIN/EditAbout";
import AdminLogin from "./pages/ADMIN/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomCursor from "./components/CustomCursor";
import { PortfolioProvider } from "./context/PortfolioContext";

function App() {
  return (
    <PortfolioProvider>
      <CustomCursor />
      <Router>
        <Routes>
          {/* Public Portfolio Route */}
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Index />} />
        
        {/* Admin Login */}
        <Route path="/page/admin/login" element={<AdminLogin></AdminLogin>}></Route>

        {/* Protected Admin Routes */}
        <Route
          path="/page/admin"
          element={
            <ProtectedRoute>
              <Admin></Admin>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/page/admin/edit/:id"
          element={
            <ProtectedRoute>
              <EditIntro></EditIntro>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/page/admin/projectEdit/:id"
          element={
            <ProtectedRoute>
              <ProjectEdit></ProjectEdit>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/page/admin/contactEdit/:id"
          element={
            <ProtectedRoute>
              <ContactEdit></ContactEdit>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/page/admin/serviceParagraph/:id"
          element={
            <ProtectedRoute>
              <ServiceParaEdit></ServiceParaEdit>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/page/admin/serviceCard/:id"
          element={
            <ProtectedRoute>
              <ServiceCard></ServiceCard>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/page/admin/addServiceCard"
          element={
            <ProtectedRoute>
              <AddServiceCard></AddServiceCard>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/page/admin/editServiceCard/:id"
          element={
            <ProtectedRoute>
              <EditServiceCard></EditServiceCard>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/page/admin/addNewProject"
          element={
            <ProtectedRoute>
              <AddNewProject></AddNewProject>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/page/admin/editProjectInfo/:id"
          element={
            <ProtectedRoute>
              <EditProjectInfo></EditProjectInfo>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/page/admin/about/:id"
          element={
            <ProtectedRoute>
              <EditAbout></EditAbout>
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/*" element={<Error></Error>}></Route>
      </Routes>
    </Router>
  </PortfolioProvider>
);
}

export default App;
