import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AppLayout() {
  const { state } = useNavigation();

  return (
    <div className="min-h-screen w-full flex flex-col bg-black/10 font-sans">
      <Navbar />

      {state === "loading" && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/10">
          <div className="w-25 h-25 border-5 border-[hsl(200,100%,10%)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <main
        className={`container mx-auto px-8 md:px-6 lg:px-12 pt-10 md:pt-12 lg:pt-15 grow ${state === "loading" ? "blur-sm" : ""}`}
      >
        <Outlet />
      </main>

      <Footer />

      <ScrollRestoration />
    </div>
  );
}

export default AppLayout;
