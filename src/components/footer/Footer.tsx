// import React from "react";
// import { QUICK_LINKS, LEGAL_LINKS, SOCIAL_LINKS } from "./";

// export const Footer = () => {
//   return (
//     <footer className="bg-primary text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
//           <div>
//             <a
//               href="#hero"
//               className="text-2xl font-extrabold tracking-tight text-white flex items-center mb-4"
//             >
//               <i className="fas fa-wine-bottle text-golden mr-2"></i> La
//               Bodega&nbsp;
//               <span className="text-golden">Premium</span>
//             </a>
//             <p className="text-gray-400 text-sm">
//               Su fuente de destilados finos y experiencias inolvidables.
//             </p>
//           </div>

//           <div>
//             <h4 className="text-xl font-semibold mb-4 text-golden">Explorar</h4>
//             <ul className="space-y-2 text-gray-400">
//               {QUICK_LINKS.map((link) => (
//                 <li key={link.label}>
//                   <a
//                     href={link.href}
//                     className="hover:text-white transition-colors"
//                   >
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-xl font-semibold mb-4 text-golden">Legal</h4>
//             <ul className="space-y-2 text-gray-400">
//               {LEGAL_LINKS.map((link) => (
//                 <li key={link.label}>
//                   <a
//                     href={link.href}
//                     className="hover:text-white transition-colors"
//                   >
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-xl font-semibold mb-4 text-golden">
//               Contáctenos
//             </h4>
//             <p className="text-gray-400 mb-2">
//               <i className="fas fa-envelope mr-2"></i> info@licorespremium.com
//             </p>
//             <p className="text-gray-400 mb-4">
//               <i className="fas fa-phone mr-2"></i> +57 319 652 9174
//             </p>
//             <div className="flex space-x-4">
//               {SOCIAL_LINKS.map((social) => (
//                 <a
//                   key={social.icon}
//                   href={social.href}
//                   className="text-gray-400 hover:text-white transition-colors"
//                   aria-label={social.aria}
//                 >
//                   <i className={`${social.icon} text-xl`}></i>
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="text-center text-gray-500 text-sm">
//           &copy; 2024 Licores Premium. Todos los derechos reservados.
//         </div>
//       </div>
//     </footer>
//   );
// };
import React from "react";
import { QUICK_LINKS, LEGAL_LINKS, SOCIAL_LINKS } from "./";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8 text-center md:text-left">
          <div>
            <a
              href="#hero"
              className="text-2xl font-extrabold tracking-tight text-white flex justify-center md:justify-start items-center mb-4"
            >
              <i className="fas fa-wine-bottle text-golden mr-2"></i> La
              Bodega&nbsp;
              <span className="text-golden">Premium</span>
            </a>
            <p className="text-white text-sm max-w-xs mx-auto md:mx-0">
              Su fuente de destilados finos y experiencias inolvidables.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-golden">Explorar</h4>
            <ul className="space-y-2 text-gray-400">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-golden">Legal</h4>
            <ul className="space-y-2 text-white">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-golden">
              Contáctenos
            </h4>
            <p className="text-white mb-2">
              <i className="fas fa-envelope mr-2"></i> info@licorespremium.com
            </p>
            <p className="text-white mb-4">
              <i className="fas fa-phone mr-2"></i> +57 319 652 9174
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  className="text-white hover:text-white transition-colors"
                  aria-label={social.aria}
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          &copy; 2024 Licores Premium. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
