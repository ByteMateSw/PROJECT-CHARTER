import React from "react";

function Footer() {
  return (
    <footer>
      <div className="w-full h-[150px] px-4 py-2 bg-neutral-900 flex-col justify-end items-center gap-4 flex mx-auto">
        <div className="flex justify-between items-center w-full">
          <div className="text-slate-50 text-[32px] font-bold">
            PROJECT CHARTER
          </div>
          <div className="flex items-center gap-8">
            <img src="/TwitterX-Icon.svg" alt="" className="w-8 h-[29px]" />
            <img src="/Instagram-Icon.svg" alt="" className="w-[33px] h-8" />
            <img src="/LinkedIn-Icon.svg" alt="" className="w-8 h-8" />
            <img src="/Facebook-Icon.svg" alt="" className="w-8 h-8" />
          </div>
        </div>
        <div className="w-full justify-start items-start gap-8 inline-flex">
          <div className="text-center text-slate-50 text-xs font-medium">
            Desarrollado por ByteMate
          </div>
          <div className="text-center text-slate-50 text-xs font-medium">
            © 2024 All rights reserved.
          </div>
          <div className="text-center text-slate-50 text-xs font-medium">
            Términos y condiciones
          </div>
          <div className="text-center text-slate-50 text-xs font-medium">
            Privacidad
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
