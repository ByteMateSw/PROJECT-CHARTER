import Script from "next/script";

type Props = {
    pId: string;
};

const GoogleAdsense: React.FC<Props> = ({ pId }) => {
    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
        />
    );
};

export default GoogleAdsense;