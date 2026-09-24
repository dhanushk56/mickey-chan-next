import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PetalField from "@/components/PetalField";

export const metadata = {
  title: "Mickey Chan — Official Channel",
  description:
    "Welcome to the official channel of Mickey Chan — gamer, streamer, and storyteller. Watch the latest videos, explore open positions, and join the community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-grid-pattern">
        <PetalField />
        <Navbar />
        <main className="relative z-10 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
