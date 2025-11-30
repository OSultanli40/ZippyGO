import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/language";
import { UserProvider } from "@/lib/userContext"; // Import UserProvider
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import Home from "@/pages/Home";
import RoutesPage from "@/pages/RoutesPage";
import MapPage from "@/pages/MapPage";
import ProfilePage from "@/pages/ProfilePage";
import SafetyPage from "@/pages/SafetyPage";
import RouteDetailPage from "@/pages/RouteDetailPage";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import CommunityPage from "@/pages/CommunityPage";
import CommunityHikeDetailPage from "@/pages/CommunityHikeDetailPage";
import LoginPage from "@/pages/LoginPage";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/routes" component={RoutesPage} />
          <Route path="/map" component={MapPage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/service/:id" component={ServiceDetailPage} />
          <Route path="/community" component={CommunityPage} />
          <Route path="/community-hike/:id" component={CommunityHikeDetailPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/safety" component={SafetyPage} />
          <Route path="/route/:id" component={RouteDetailPage} />
          <Route path="/login" component={LoginPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <UserProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </UserProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
