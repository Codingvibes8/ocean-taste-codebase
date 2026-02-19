import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg" style={{ background: '#006994' }}>
                <span className="text-lg sm:text-xl font-bold" style={{ color: '#ffffff' }}>SF</span>
              </div>
              <span className="text-base sm:text-lg font-bold">OceanFlex</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fresh fish & chips delivered to your door. Quality ingredients, great taste.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 md:mb-6 text-base">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors py-1 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#menu" className="text-sm text-muted-foreground hover:text-primary transition-colors py-1 inline-block">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors py-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-sm text-muted-foreground hover:text-primary transition-colors py-1 inline-block">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 md:mb-6 text-base">Contact Us</h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>hello@OceanFlex.com</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>123 Main Street<br className="hidden sm:inline" />London, UK</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4 md:mb-6 text-base">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-muted"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-muted"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-muted"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="px-4">&copy; {new Date().getFullYear()} OceanFlex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
