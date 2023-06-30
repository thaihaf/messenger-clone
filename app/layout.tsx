import "./globals.css";
import { Inter } from "next/font/google";
import logoImage from "public/image/logo.png";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Messenger Clone",
  description: "Messenger Clone",
  icon: logoImage,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
