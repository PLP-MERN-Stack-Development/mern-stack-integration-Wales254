import Navbar from "../Navbar";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-provider";

export default function NavbarExample() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </ThemeProvider>
  );
}
