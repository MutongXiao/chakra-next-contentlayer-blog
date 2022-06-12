import Script from 'next/script';

import siteConfig from 'configs/site-config';

const UmamiScript = () => {
  return (
    <>
      <Script
        async
        defer
        data-website-id={siteConfig.analytics.umamiWebsiteId}
        src="https://umami.example.com/umami.js" // Replace with your umami instance
      />
    </>
  );
};

export default UmamiScript;
