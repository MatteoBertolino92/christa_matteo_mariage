import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="font-heading text-xl mb-4">Contact Us</h3>
            <p className="font-paragraph text-sm opacity-90 mb-2">
              For any questions or special requests, please reach out to us.
            </p>
            <p className="font-paragraph text-sm opacity-90">
              We look forward to celebrating with you!
            </p>
          </div>

          {/* Event Details */}
          <div>
            <h3 className="font-heading text-xl mb-4">Event Location</h3>
            <p className="font-paragraph text-sm opacity-90 mb-2">
              Langhe Region
            </p>
            <p className="font-paragraph text-sm opacity-90">
              Piedmont, Italy
            </p>
          </div>

          {/* Thank You Message */}
          <div>
            <h3 className="font-heading text-xl mb-4">Thank You</h3>
            <p className="font-paragraph text-sm opacity-90">
              Your presence is the greatest gift. We are grateful to share this special day with our loved ones from around the world.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
          <div className="flex items-center justify-center gap-2 font-paragraph text-sm opacity-90">
            <span>Made with</span>
            <Heart size={16} fill="currentColor" />
            <span>for Christa & You</span>
          </div>
          <p className="font-paragraph text-xs opacity-75 mt-2">
            © 2026 - Langhe Wedding
          </p>
        </div>
      </div>
    </footer>
  );
}
