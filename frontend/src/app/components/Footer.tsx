import React from "react";
import { Github, Linkedin, Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative z-10 w-full bg-black border-t border-white/10 mt-20 py-14">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-white">
            Alumni <span className="text-blue-500">Connect</span>
          </h3>
          <p className="text-white/60 mt-2 text-sm">
            Bringing alumni and students together to learn, grow, and inspire.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Links</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>
              <Link href="/about" className="hover:text-blue-400 transition">
                About
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Notable Alumni
              </a>
            </li>
            {/* <li>
              <a href="#" className="hover:text-blue-400 transition">
                Support
              </a>
            </li> */}
          </ul>
        </div>

        <div>
          <Link href="/creators"  className="text-white font-semibold mb-4">Creators</Link>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>

          <p className="flex items-center gap-2 text-white/70 text-sm mb-2">
            <Mail size={16} /> alumni@iiitdwd.ac.in
          </p>

          <p className="flex items-center gap-2 text-white/70 text-sm">
            <Phone size={16} /> +91 98765 43210
          </p>

          <div className="flex gap-4 mt-5">
            <a
              href="#"
              className="text-white/70 hover:text-blue-400 transition"
            >
              <Github size={22} />
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-blue-400 transition"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-blue-400 transition"
            >
              <Instagram size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center text-white/40 text-sm mt-10">
        © {new Date().getFullYear()} IIIT Dharwad Alumni Network. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
