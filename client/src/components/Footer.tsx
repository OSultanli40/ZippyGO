import { useLanguage } from "@/lib/language";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-secondary py-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                HikeAZ
              </span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Azerbaijan's premier hiking companion. Discover hidden trails, track your progress, and connect with nature.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-foreground">Explore</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Popular Routes</a></li>
              <li><a href="#" className="hover:text-primary">Map View</a></li>
              <li><a href="#" className="hover:text-primary">Safety Tips</a></li>
              <li><a href="#" className="hover:text-primary">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>{t("footer.rights")}</p>
          <p>{t("footer.made_with")}</p>
        </div>
      </div>
    </footer>
  );
}
