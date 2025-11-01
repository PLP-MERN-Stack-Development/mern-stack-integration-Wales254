import { Link } from "wouter";
import { PenSquare, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <PenSquare className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">BlogHub</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              A modern platform for sharing stories and connecting with readers around the world.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-github">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-linkedin">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-sm text-muted-foreground hover:text-foreground">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} BlogHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
