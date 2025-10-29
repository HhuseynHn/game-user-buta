// "use client";
// import React, { useEffect, useState } from "react";
// import Logo from "../ui/logo";
// import Link from "next/link";
// import { contactService } from "@/services/contact-service";
// import { useTranslation } from "@/hooks/use-translations";


// const Footer = () => {
//   const [contacts, setContacts] = useState();
//   const { t } = useTranslation();
//   useEffect(() => {
//     let isMounted = true;

//     async function fetchData() {
//       try {
//         const response = await contactService.get();

//         if (isMounted) {
//           setContacts(response);
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//       }
//     }

//     fetchData();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return (
//     <>
//       <footer className="bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
//             {/* Logo and Description */}
//             <div className="text-left flex flex-col max-w-md">
//               <Logo />
//               <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 leading-relaxed transition-colors duration-300 hover:text-gray-200">
//                 {t("Welcome to Game Store, your trusted destination for the latest and most exciting games. We bring you top-quality titles, exclusive deals, and a smooth shopping experience. Stay connected for updates, offers, and endless fun.")}
//               </p>
//             </div>

//             {/* Legal and Support Section */}
//             <div className="text-left min-w-0">
//               <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl text-white">
//                 {t('Legal')}
//               </h4>
//               <div className="flex flex-col gap-3 sm:gap-4 text-gray-300 mb-6 sm:mb-8">
//                 <Link
//                   href={"/"}
//                   className="text-sm sm:text-base  hover:text-white hover:no- transition-all duration-300 transform hover:translate-x-1 inline-block"
//                 >
//                   {t("Terms and Conditions")}
//                 </Link>
//                 <Link
//                   href={"/"}
//                   className="text-sm sm:text-base  hover:text-white hover:no- transition-all duration-300 transform hover:translate-x-1 inline-block"
//                 >
//                   {t("Privacy Policy")}
//                 </Link>
//               </div>

//               <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl text-white">
//                 {t("Support Center")}
//               </h4>
//               <div className="space-y-2 text-gray-300 flex flex-col">
//                 <span className="text-sm sm:text-base transition-colors duration-300 hover:text-gray-200 cursor-default">
//                   {t("Help")}
//                 </span>
//                 <span className="text-sm sm:text-base transition-colors duration-300 hover:text-gray-200 cursor-default">
//                   {t("Human support 24/7")}
//                 </span>
//               </div>
//             </div>

//             {/* Connect Section */}
//             <div className="text-left min-w-0">
//               <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl text-white">
//                 {t("Connect")}
//               </h4>
//               <div className="space-y-2 sm:space-y-3 text-gray-300">
//                 {contacts?.map((contact) => (
//                   <div
//                     key={contact.id}
//                     className="text-sm sm:text-base group transition-all duration-300 hover:transform hover:translate-x-1"
//                   >
//                     <span className="mr-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
//                       {contact.key}:
//                     </span>
//                     <Link
//                       href={"#"}
//                       className=" hover:text-white hover:no- transition-all duration-300"
//                     >
//                       {contact.value}
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Copyright */}
//           <div className="mt-8 sm:mt-10 lg:mt-12 border-t border-gray-700 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300">
//             © {new Date().getFullYear()} {t("Buta Games. All rights reserved.")}
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Footer;

"use client";
import React, { useEffect, useState } from "react";
import Logo from "../ui/logo";
import Link from "next/link";
import { contactService } from "@/services/contact-service";
import { useTranslation } from "@/hooks/use-translations";

const Footer = () => {
  const [contacts, setContacts] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await contactService.get();
        if (isMounted) {
          setContacts(response);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <footer className="bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Logo and Description */}
            <div className="text-left flex flex-col max-w-md">
              <Logo />
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 leading-relaxed transition-colors duration-300 hover:text-gray-200">
                {t("welcomeMessage")} {/* ✅ CHANGE HERE: Use correct key */}
              </p>
            </div>

            {/* Legal and Support Section */}
            <div className="text-left min-w-0">
              <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl text-white">
                {t('legal')} {/* ✅ CHANGE HERE: Use lowercase key */}
              </h4>
              <div className="flex flex-col gap-3 sm:gap-4 text-gray-300 mb-6 sm:mb-8">
                <Link
                  href={"/"}
                  className="text-sm sm:text-base hover:text-white hover:no-underline transition-all duration-300 transform hover:translate-x-1 inline-block"
                >
                  {t("termsAndConditions")} {/* ✅ CHANGE HERE: Use correct key */}
                </Link>
                <Link
                  href={"/"}
                  className="text-sm sm:text-base hover:text-white hover:no-underline transition-all duration-300 transform hover:translate-x-1 inline-block"
                >
                  {t("privacyPolicy")} {/* ✅ CHANGE HERE: Use correct key */}
                </Link>
              </div>

              <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl text-white">
                {t("supportCenter")}
              </h4>
              <div className="space-y-2 text-gray-300 flex flex-col">
                <span className="text-sm sm:text-base transition-colors duration-300 hover:text-gray-200 cursor-default">
                  {t("help")}
                </span>
                <span className="text-sm sm:text-base transition-colors duration-300 hover:text-gray-200 cursor-default">
                  {t("humanSupport247")}
                </span>
              </div>
            </div>

            {/* Connect Section */}
            <div className="text-left min-w-0">
              <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl text-white">
                {t("connect")} {/* ✅ CHANGE HERE: Use lowercase key */}
              </h4>
              <div className="space-y-2 sm:space-y-3 text-gray-300">
                {contacts?.map((contact) => (
                  <div
                    key={contact.id}
                    className="text-sm sm:text-base group transition-all duration-300 hover:transform hover:translate-x-1"
                  >
                    <span className="mr-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {contact.key}:
                    </span>
                    <Link
                      href={"#"}
                      className="hover:text-white hover:no-underline transition-all duration-300"
                    >
                      {contact.value}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 sm:mt-10 lg:mt-12 border-t border-gray-700 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300">
            © {new Date().getFullYear()} {t("allRightsReserved")}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;