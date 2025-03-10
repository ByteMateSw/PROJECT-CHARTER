"use client";

import React, { useEffect, useRef } from "react";

type AdBannerTypes = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
};

const AdBanner = () => {

  // const banner = useRef<HTMLDivElement>(null)

  // const atOptions = {
	// 	'key' : 'c2966c28682c8c93dd8577b3912cdff3',
	// 	'format' : 'iframe',
	// 	'height' : 90,
	// 	'width' : 728,
	// 	'params' : {}
	// };

  // useEffect(() => {
  //   if (banner.current && !banner.current.firstChild) {
  //   const conf = document.createElement('script')
  //   const script = document.createElement('script')
  //   script.type = 'text/javascript'
  //   script.src = "//www.highperformanceformat.com/c2966c28682c8c93dd8577b3912cdff3/invoke.js"
  //   conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

  //   banner.current.append(conf)
  //   banner.current.append(script)
  //   }
  //   }, [banner])

  return (
    // <div id="container-488d3100fddbe57811e8fa6e0875087a"
    //   className="flex justify-center mt-28 w-full"
    //   ref={banner}
    // ></div>
    <></>
  );
};

export default AdBanner;
