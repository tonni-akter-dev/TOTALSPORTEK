import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LiveNow from "@/components/LiveNow";
import TopSections from "@/components/TopSections";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4">
        <LiveNow />
        <TopSections />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;