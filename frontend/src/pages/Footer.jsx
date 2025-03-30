import React from "react";
import { assets } from "../assets/assets";
import { FiMail, FiMapPin, FiPhone, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  const footerLinks = [
    {
      title: "Navigation",
      links: ["Home", "Portfolio", "Services", "Blog", "Contact Us"],
    },
    {
      title: "Company",
      links: [
        "Our Blog",
        "Our Partners",
        "Our Team",
        "Privacy Policy",
        "Terms & Conditions",
      ],
    },
  ];

  const socialMedia = [
    { icon: assets.instagram, alt: "Instagram" },
    { icon: assets.linkdin, alt: "LinkedIn" },
    { icon: assets.twitter, alt: "Twitter" },
    { icon: assets.facebook, alt: "Facebook" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 mb-12 lg:mb-16 shadow-lg"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                Join Our Photography Community
              </h2>
              <p className="text-white/90">
                Subscribe to get exclusive offers and photography tips
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
              <div className="relative flex-1">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="pl-12 pr-4 py-3 rounded-lg w-full bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <button className="btn btn-accent rounded-lg px-6 py-3 whitespace-nowrap flex items-center gap-2">
                Subscribe <FiArrowRight />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Photopia
              </span>
            </a>
            <p className="text-gray-400">
              Capturing life's precious moments with professional photography
              services.
            </p>
            <div className="flex gap-4">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
                >
                  <img src={social.icon} alt={social.alt} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <FiArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-primary" />
                <p className="text-gray-400">
                  123 Shutter Street, Frameville
                  <br />
                  Snapshot City, Imagistan - 456789
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-primary" />
                <a
                  href="tel:+923884789"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +92 388 4789
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-primary" />
                <a
                  href="mailto:info@photopia.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@photopia.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>
              &copy; {new Date().getFullYear()} Photopia. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
