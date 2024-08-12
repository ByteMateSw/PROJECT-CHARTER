import Script from "next/script";

type Props = {
    pId: string;
};

const GoogleAdsense: React.FC<Props> = ({ pId }) => {
    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2868851941806861`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
};

export default GoogleAdsense;