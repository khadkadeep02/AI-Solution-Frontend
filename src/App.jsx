import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Company from "./pages/Company";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Testimonials from "./pages/Testimonials";
import AdminCrudPage from "./components/admin/AdminCrudPage";
import AiChatWidget from "./components/common/AiChatWidget";
import AdminPage from "./pages/AdminPage";
import AdminTestimonialsView from "./pages/AdminTestimonialsView";
import AdminInquiriesView from "./pages/AdminInquiriesView";
import AdminLogin from "./pages/AdminLogin";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";

function protectedAdmin(element) {
  return <ProtectedAdminRoute>{element}</ProtectedAdminRoute>;
}

function App() {
  return (
    <>
      <Routes>
        {/* Main website routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events/>}/>
          <Route path="/testimonials" element={<Testimonials />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={protectedAdmin(<AdminPage />)} />
        <Route
          path="/admin/dashboard/services"
          element={protectedAdmin(<AdminCrudPage endpoint="services" title="Manage Services" />)}
        />
        <Route
          path="/admin/dashboard/projects"
          element={protectedAdmin(<AdminCrudPage endpoint="projects" title="Manage Projects" />)}
        />
        <Route
          path="/admin/dashboard/events"
          element={protectedAdmin(<AdminCrudPage endpoint="events" title="Manage Events" />)}
        />
        <Route
          path="/admin/dashboard/testimonials"
          element={protectedAdmin(<AdminCrudPage endpoint="testimonials" title="Manage Testimonials" />)}
        />
        <Route
          path="/admin/dashboard/team-members"
          element={protectedAdmin(<AdminCrudPage endpoint="team-members" title="Manage Team Members" />)}
        />
        <Route
          path="/admin/dashboard/gallery"
          element={protectedAdmin(<AdminCrudPage endpoint="gallery" title="Manage Gallery" />)}
        />
        <Route
          path="/admin/dashboard/inquiries"
          element={protectedAdmin(<AdminCrudPage endpoint="inquiries" title="Manage Inquiries" />)}
        />
        <Route
          path="/admin/dashboard/timeline"
          element={protectedAdmin(<AdminCrudPage endpoint="timeline" title="Manage Company Timeline" />)}
        />


        {/* Admin view-only pages */}
        <Route path="/admin/testimonials-view" element={protectedAdmin(<AdminTestimonialsView />)} />
        <Route path="/admin/inquiries-view" element={protectedAdmin(<AdminInquiriesView />)} />
      </Routes>
      <AiChatWidget />
    </>
  );
}

export default App;
