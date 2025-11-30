import { useLanguage } from "@/lib/language";
import { Link } from "wouter";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-secondary py-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link href="/">
              <div className="flex items-center gap-2 mb-4 cursor-pointer">
                <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-foreground">
                  ZippyGO
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-md">
              {t("footer.desc")}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-foreground">{t("footer.explore")}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/routes" className="hover:text-primary transition-colors">
                  {t("footer.popular_routes")}
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-primary transition-colors">
                  {t("footer.map_view")}
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-primary transition-colors">
                  {t("footer.safety_tips")}
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-primary transition-colors">
                  {t("footer.community")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-foreground">{t("footer.legal")}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#privacy" className="hover:text-primary transition-colors" onClick={(e) => { e.preventDefault(); }}>
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-primary transition-colors" onClick={(e) => { e.preventDefault(); }}>
                  {t("footer.terms")}
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-primary transition-colors" onClick={(e) => { e.preventDefault(); }}>
                  {t("footer.cookies")}
                </a>
              </li>
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
