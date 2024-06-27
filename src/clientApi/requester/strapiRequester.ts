import { strapiPath } from '@/constants';
import httpStrapi from '../httpStrapi';
import serverStrapi from '../serverStrappi';

class StrapiRequester {
  fetchMainMenu = async (locale?: string) => {
    return await serverStrapi({
      url: `${strapiPath.FETCH_FRONT_PAGE}&locale=${locale || 'de'}`,
      method: 'GET',
    });
  };

  fetchFrontPage = async (locale?: string) => {
    return await httpStrapi({
      url: `${strapiPath.FETCH_FRONT_PAGE}&locale=${locale || 'de'}`,
      method: 'GET',
    });
  };
  fetchAboutPage = async (locale?: string) => {
    return await httpStrapi({
      url: `${strapiPath.FETCH_ABOUT_PAGE}&locale=${locale || 'de'}`,
      method: 'GET',
    });
  };

  fetchLocales = async () => {
    return await httpStrapi({
      url: strapiPath.FETCH_LOCALES,
      method: 'GET',
    });
  };

  fetchVoucherPage = async (locale?: string) => {
    return await serverStrapi({
      url: `${strapiPath.FETCH_VOUCHER_PAGE}&locale=${locale || 'de'}`,
    });
  };

  fetchPages = async (locale?: string) => {
    return await serverStrapi({
      url: `${strapiPath.FETCH_PAGES}&locale=${locale || 'de'}`
    })
  };

  fetchTopicProperty = async (locale?: string) => {
    return await serverStrapi({
      url: `${strapiPath.FETCH_TOPIC_PROPERTIES}&locale=${locale || 'de'}&sort[0]=id`
    })
  }
}

const strapiRequester = new StrapiRequester();
export default strapiRequester;
