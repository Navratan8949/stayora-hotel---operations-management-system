import "./globals.css";
import { StayoraProvider } from "../context/StayoraContext";
import GlobalUI from "../components/common/GlobalUI";

export const metadata = {
  title: "Stayora — Luxury Boutique Hotel & Management System (PMS)",
  description: "Experience royal luxury at Stayora Grand Jaipur. Discover heritage rooms, bespoke dining, and our integrated modern hospitality operations platform by Code Pe Charcha.",
  openGraph: {
    title: "Stayora — Luxury Boutique Hotel & Management System (PMS)",
    description: "Experience royal luxury at Stayora Grand Jaipur. Real-time availability, direct booking, and complete front office PMS.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stayora — Luxury Boutique Hotel & Management System",
    description: "Experience royal luxury at Stayora Grand Jaipur.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased text-stone-800 bg-[#faf8f5] min-h-screen selection:bg-[#c5a059]/20 selection:text-[#0d2b24]">
        <StayoraProvider>
          {children}
          <GlobalUI />
        </StayoraProvider>
      </body>
    </html>
  );
}
