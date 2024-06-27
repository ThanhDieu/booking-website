import httpStrapi from '@/clientApi/httpStrapi';

class StrapiPropertiesService {
    private apis = {
        propertyPages: 'property-pages',
        properties: 'properties'
    };

    getPropertyPages = async (hotelId?: string, locale?: string, populate?: string) => {
        return await httpStrapi({
            url: `/${this.apis.propertyPages}?${hotelId ? `filters[property][code][$eq]=${hotelId.toString()}` : ''}${!populate ? `&populate=deep` : ''}${locale ? `&locale=${locale}` : ''}`,
            method: 'GET',
        });
    };
    getProperties = async () => {
        return await httpStrapi({
            url: `/${this.apis.properties}`,
            method: 'GET',
        });
    };
}

const strapiPropertiesService = new StrapiPropertiesService();
export default strapiPropertiesService;
