"use client";

import React, { useEffect, useRef } from "react";

type AdBannerTypes = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
};

const AdBanner = () => {
  // useEffect(() => {
  //   try {
  //     ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
  //       {}
  //     );
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // }, []);

  const banner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
    const conf = document.createElement('script')
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = "//pl26016389.effectiveratecpm.com/488d3100fddbe57811e8fa6e0875087a/invoke.js"
    
    banner.current.append(conf)
    banner.current.append(script)
    }
    }, [banner])

  return (
    // <ins
    //   className="adsbygoogle"
    //   style={{ display: "block" }}
    //   data-ad-client={process.env.NEXT_PUBLIC_GOOGLEADS}
    //   data-ad-slot={dataAdSlot}
    //   data-ad-format={dataAdFormat}
    //   data-full-width-responsive={dataFullWidthResponsive.toString()}
    // ></ins>
    <div id="container-488d3100fddbe57811e8fa6e0875087a"
      className="mt-4"
      ref={banner}
    ></div>
  );
};

export default AdBanner;
