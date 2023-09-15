import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";


import Layout from "scenes/Layout";
import Dashboard from "scenes/Dashboard";
import Login from "scenes/Login";
import Landing from "scenes/Landing";
import Register from "scenes/Register";
import Error404 from "scenes/Error404";
import ForgotPassword from "scenes/ForgotPassword";
import VerifyEmail from "scenes/VerifyEmail";
import ResetPassword from "scenes/ResetPassword";
import NotesDashboard from "scenes/NotesDashboard";
import NotesDisplay from "scenes/NotesDisplay";
import PapersDashboard from "scenes/PapersDashboard";
import PapersDisplay from "scenes/PapersDisplay";
import ResourcesDashboard from "scenes/ResourcesDashboard";
import ResourcesDisplay from "scenes/ResourcesDisplay";
import SeniorTalksDashboard from "scenes/SeniorTalksDashboard";
import SeniorPost from "components/SeniorPost";
import SemInsightsDashboard from "scenes/SemInsightsDashboard";
import SemInsightsDisplay from "components/SemInsightsDisplay";
import MyProfile from "scenes/MyProfile";
import UserProfile from "scenes/UserProfile";
import TermsOfUse from "components/TermsOfUse";
import PrivacyPolicy from "components/PrivacyPolicy";
import About from "components/Landing/About";
import Contact from "components/Landing/Contact"; 

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email/:userRole/:userId/:tokenId" element={<VerifyEmail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes-dashboard" element={<NotesDashboard />} />
          <Route path="/notes/sem/:semester/:subject" element={<NotesDisplay />} />
          <Route path="/practice-papers" element={<PapersDashboard />} />
          <Route path="/papers/sem/:semester/:subject" element={<PapersDisplay />} />
          <Route path="/important-resources" element={<ResourcesDashboard />} />
          <Route path="/important-links/:semester" element={<ResourcesDisplay />} />
          <Route path="/senior-talks" element={<SeniorTalksDashboard />} />
          <Route path="/senior-post/:postId" element={<SeniorPost />} />
          <Route path="/sem-insights" element={<SemInsightsDashboard />} />
          <Route path="/sem-insight/:semester" element={<SemInsightsDisplay />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
        </Route>
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Toaster />

    </BrowserRouter>
  );
}

export default App;
