import Link from "next/link";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center py-2 text-sm text-gray-500">
      &copy; {year} GitGaze -{" "}
      <Link
        href="https://github.com/atharv-110"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        Atharv Vani
      </Link>
    </footer>
  );
};

export default Footer;
