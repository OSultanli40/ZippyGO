import { Link, useLocation } from "wouter";
import { Map, Mountain, User, Shield, Menu, X, ShoppingBag, Users, Home } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t("nav.home"), path: "/", icon: Home },
    { name: t("nav.routes"), path: "/routes", icon: Mountain },
    { name: t("nav.map"), path: "/map", icon: Map },
    { name: t("nav.services"), path: "/services", icon: ShoppingBag },
    { name: t("nav.community"), path: "/community", icon: Users },
    { name: t("nav.profile"), path: "/profile", icon: User },
    { name: t("nav.safety"), path: "/safety", icon: Shield },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'az' : 'en');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <Mountain className="h-6 w-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            HikeAZ
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <a className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors hover:bg-secondary hover:text-primary",
                  isActive ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground"
                )}>
                  <Icon className="h-4 w-4" />
                  {item.name}
                </a>
              </Link>
            );
          })}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="ml-2 font-bold text-xs w-8 h-8 rounded-full border border-border"
          >
            {language.toUpperCase()}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="font-bold text-xs w-8 h-8 rounded-full border border-border"
          >
            {language.toUpperCase()}
          </Button>
          <button 
            className="p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-background border-b border-border shadow-lg animate-in slide-in-from-top-5">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <a 
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors hover:bg-secondary",
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
