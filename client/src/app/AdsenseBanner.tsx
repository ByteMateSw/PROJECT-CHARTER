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

  const atOptions = {
		'key' : 'c2966c28682c8c93dd8577b3912cdff3',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};

  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
    const conf = document.createElement('script')
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = "//www.highperformanceformat.com/c2966c28682c8c93dd8577b3912cdff3/invoke.js"
    conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

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
      className="flex justify-center mt-28 w-full"
      ref={banner}
    ></div>
  );
};

export default AdBanner;
