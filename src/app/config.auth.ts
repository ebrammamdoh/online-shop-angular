// import { AuthModule, LogLevel, OidcConfigService } from 'angular-auth-oidc-client';

// export function configureAuth(oidcConfigService: OidcConfigService) {
//     return () =>
//       oidcConfigService.withConfig({
//         stsServer: 'http://localhost:53132',
//         redirectUrl: window.location.origin,
//         postLogoutRedirectUri: window.location.origin,
//         clientId: 'onlineshop_angular',
//         scope: 'openid profile email openid api1',
//         responseType: 'code id_token token',
//         silentRenew: true,
//         silentRenewUrl: `${window.location.origin}/silent-renew.html`,
//         logLevel: LogLevel.Debug,
//       });
//   }