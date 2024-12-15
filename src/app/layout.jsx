import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Include weights as needed
});

// SEO-friendly metadata
export const metadata = {
  title: "Daily Task Manager",
  description:
    "Stay organized with our powerful task management app. Manage and track your daily tasks effectively and boost your productivity.",
  keywords:
    "task manager, productivity app, daily planner, to-do list, task tracking, manage tasks, organize tasks, productivity tools",
  author: "Amin Chogueur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Header />
        <div className="min-h-[calc(100vh-150px)]">{children}</div>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
