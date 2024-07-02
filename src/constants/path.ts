export const paths = {
  FETCH_BUNDLE: '/bundles/search',
  FETCH_ALL_BUNDLE: '/bundles',
  GET_INVENTORY_ACTIVITES: '/inventory/activities',
  GET_RATEPLANS_CALENDAR: '/rateplans/rates/calendar',
  GET_ADDONS_SERVICES: '/rateplans/services',
  FETCH_OFFERS: '/offers',
};

export const pathsTag = {
  GET_SPECIAL_BUNDLE: 'inventory/special-bundles',
  GET_LANDSCAPE: '/inventory/landscapes',
  GET_ACTIVITY: '/inventory/activities',
  GET_HOTEL_ID: '/inventory/properties',
  FETCH_BUNDLE_BY_PROPERTY_ID: `bundles/search?`,
};

export const pathSocket = {
  SOCKET_GET_PAYMENT: `wss://${process.env.NEXT_PUBLIC_SOCKET}/booking/v1/admin/hook/payment-socket/`,
};

export const pathsBooking = {
  CREATE_BOOKING: '/booking/information',
  BUNDLE_DETAIL: '/booking/bundle/[bundleId]',
  OFFER_DETAIL: '/booking/offer/[offerId]',
  ADDONS: '/booking/addons/[propertyId]',
  SUMMARY: '/booking/summary',
  THANKYOU: '/booking/thankyou'
};

export const strapiPath = {
  FETCH_FRONT_PAGE: '/landing-page?populate=deep',
  FETCH_ABOUT_PAGE: '/about-page?populate=deep',
  FETCH_LOCALES: '/i18n/locales',
  FETCH_VOUCHER_PAGE: '/coupon?populate=deep',
  FETCH_PAGES: '/pages?populate=deep',
  FETCH_TOPIC_PROPERTIES: '/topic-properties?populate=deep'
};

export const pathsLocation = {
  GET_LOCATION: '/bookings/payments/locations',
};

export const pathsPayment = {
  GET_POLIOS_ID: '/finance/v1/folios',
};

export const pathsUser = {
  POST_REGISTER: '/auth/register',
  POST_SIGN_IN: '/oauth/v2/token',
  UPDATE_PROFILE: '/auth/users/profile',
  GET_HISTORY: '/bookings/history',
  USER_LOGIN: '/auth/callback',
  USER_ADD_ACTIVITES_HISTORY: '/bookings/activities',
};

export const pathsService = {
  GET_ALL_TAG: '/inventory/tags',
};

/** calendar raplan */
export const pathCalendar = {
  GET_CALENDAR_DATE: '/rateplans/rates/calendar',
};
/** location search  */
export const locationSearch = {
  GET_HOTEL_NAME: '/inventory/properties/locations/search',
};

export const pathPage = {
  home: '/',
  result: 'booking/bundle',
  offer: 'offer',
  hotel: 'hotel',
  hotelId: '[hotelId]',
  propertyId: '[propertyId]',
  bundleId: '[bundleId]',
  addons: 'booking/addons',
  booking: 'booking',
  topic: 'topic',
  contact: 'contact',
  summary: 'booking/summary',
  viewHotels: 'viewHotels',
  about: 'about',
  account: 'account',
  errors: 'errors',
  slug: '[slug]',
  notFound: '404',

}