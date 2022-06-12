import Script from 'next/script';

import siteConfig from 'configs/site-config';

const GAScript = () => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.googleAnalyticsId}`}
      />

      <Script strategy="lazyOnload" id="ga-script">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.analytics.googleAnalyticsId}', {
              page_path: window.location.pathname,
            });
        `}
      </Script>
    </>
  );
};

export default GAScript;

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const logEvent = (action, category, label, value) => {
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
