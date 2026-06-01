import React from "react";
import { Footer, FooterTitle, FooterLinkGroup, FooterLink, FooterDivider, FooterCopyright, FooterIcon } from "flowbite-react";
import {Link} from "react-router-dom"
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default function FooterComp() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          {/* logo section */}
          <div className="mt-5">
            <Link
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
              to="/">
              <span className="bg-gradient-to-r from-green-700 to-blue-500 px-2 py-1 rounded-lg text-white">
                MERN
              </span>
              Blog
            </Link>
          </div>

          {/* links sections grid form */}
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">

            <div>
              <FooterTitle title="about" />
              <FooterLinkGroup col>
                <FooterLink href="#">Project</FooterLink>
                <FooterLink href="/about" target="_blank">MERN Blog</FooterLink>
              </FooterLinkGroup>
            </div>

            <div>
              <FooterTitle title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink href="https://github.com/Syed-Hanzalah-Ali" target="_blank">Github</FooterLink>
                <FooterLink href="https://www.linkedin.com" target="_blank">LinkedIn</FooterLink>
              </FooterLinkGroup>
            </div>

            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>

          </div>

        </div>

        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="MERNblog™" year={new Date().getFullYear()} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="https://www.instagram.com/computingdevotion/" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="https://github.com/Syed-Hanzalah-Ali" icon={BsGithub} />
            <FooterIcon href="#" icon={BsDribbble} />
            
          </div>
        </div>

      </div>
    </Footer>
  );
}
