
import { Github, Twitter, Linkedin, Instagram, Heart } from "lucide-react";
import {MotionDiv} from "./motionDiv";

const Footer = () => {
  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="py-10 px-4 border-t border-white/10">
      <div className="container mx-auto text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <p className="text-white text-md font-medium flex items-center justify-center gap-1">
            Made with <Heart className="h-5 w-5 text-red-500 fill-current" /> by Pradeep
          </p>
        </MotionDiv>
        
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center space-x-5"
        >
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              aria-label={link.label}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              {link.icon}
            </a>
          ))}
        </MotionDiv>
      </div>
    </footer>
  );
};

export default Footer;
