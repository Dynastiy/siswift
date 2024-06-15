/* src/config.js */

const config = {
    appEnv: import.meta.env.NODE_ENV,
  
    appName: import.meta.env.VITE_APP_TITLE,
  
    appUrl: import.meta.env.VITE_APP_APP_URL,
    landingUrl: import.meta.env.VITE_APP_LANDING_URL,
  
    apiKey: import.meta.env.VITE_APP_API_KEY,
  
    apiUrl: import.meta.env.VITE_APP_API_URL,
    imgUrl: import.meta.env.VITE_APP_IMG_URL,
    paystackUrl: import.meta.env.VITE_APP_PAYSTACK,
  
    websocket: import.meta.env.VITE_APP_WEBSOCKETS_SERVER,
    pusherKey: import.meta.env.VITE_APP_PUSHER_APP_KEY,
  
    companyName: import.meta.env.VITE_APP_COMPANY_NAME,
    supportEmail: import.meta.env.VITE_APP_SUPPORT_EMAIL,
    supportPhone: import.meta.env.VITE_APP_SUPPORT_PHONE,
  
    accessTokenStorageKey: "warehauze_session",
    accessTokenExpiresInStorageKey: "warehauze_session_expires_in",
    accessTokenExpiresAtStorageKey: "warehauze_session_expires_at",
    accessTokenExpiryTimeLeftForFrontendAutoRefresh: 18000, // in seconds, 18000secs = 5 hours
    referralCodeStorageKey: "warehauze_referral_code",
    appDomain: "https://warehauze.com/",

    getSubdomain: () => {
      let host = window.location.host;
      let parts = host.split(".");
      let subdomain = parts[0];
      return subdomain;
    },
  };
//   "eslint-plugin-prettier": "^3.1.3",
  export default config;
  