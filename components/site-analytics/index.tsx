/* eslint-disable @typescript-eslint/no-explicit-any */
import GA from './GoogleAnalytics';
import Plausible from './Plausible';
import SimpleAnalytics from './SimpleAnalytics';
import Umami from './Umami';
import siteConfig from 'configs/site-config';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (...args: any[]) => void;
    sa_event?: (...args: any[]) => void;
  }
}

const isProduction = process.env.NODE_ENV === 'production';

const Analytics = () => {
  return (
    <>
      {isProduction && siteConfig.analytics.plausibleDataDomain && (
        <Plausible />
      )}
      {isProduction && siteConfig.analytics.simpleAnalytics && (
        <SimpleAnalytics />
      )}
      {isProduction && siteConfig.analytics.umamiWebsiteId && <Umami />}
      {isProduction && siteConfig.analytics.googleAnalyticsId && <GA />}
    </>
  );
};

export default Analytics;
