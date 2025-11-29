import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/language";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import RoutesPage from "@/pages/RoutesPage";
import MapPage from "@/pages/MapPage";
import ProfilePage from "@/pages/ProfilePage";
import SafetyPage from "@/pages/SafetyPage";
import RouteDetailPage from "@/pages/RouteDetailPage";
import ServicesPage from "@/pages/ServicesPage";
import CommunityPage from "@/pages/CommunityPage";

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
          <Route path="/community" component={CommunityPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/safety" component={SafetyPage} />
          <Route path="/route/:id" component={RouteDetailPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
