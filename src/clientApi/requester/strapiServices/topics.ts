import httpStrapi from '@/clientApi/httpStrapi';

class StrapiTopicsService {
    private apis = {
        topics: 'topics',
        topicProperties: 'topic-properties',
        topicHighlights: 'topic-highlights',
        topicHosts: 'topic-hosts',

    };

    getTopics = async (slug?: string, locale?: string) => {
        return await httpStrapi({
            url: `/${this.apis.topics}?populate=deep${slug ? `&filters[activity][slug][$eq]=${slug.toString()}` : ''}${locale ? `&locale=${locale}` : ''}`,
            method: 'GET',
        });
    };
    getTopicProperties = async (slug?: string, locale?: string) => {
        return await httpStrapi({
            url: `/${this.apis.topicProperties}?populate=deep&sort[0]=id${slug ? `&filters[topic][activity][slug][$eq]=${slug.toString()}` : ''}${locale ? `&locale=${locale}` : ''}`,
            method: 'GET',
        });
    };
    getTopicHighlights = async (slug?: string, hotelId?: string, locale?: string) => {
        return await httpStrapi({
            url: `/${this.apis.topicHighlights}?populate=deep${hotelId ? `&filters[property][code][$eq]=${hotelId.toString()}` : ''}${slug ? `&filters[topic][activity][slug][$eq]=${slug.toString()}` : ''}${locale ? `&locale=${locale}` : ''}`,
            method: 'GET',
        });
    };
    getTopicHosts = async (slug?: string, hotelId?: string, locale?: string) => {
        return await httpStrapi({
            url: `/${this.apis.topicHosts}?populate=deep${hotelId ? `&filters[property][code][$eq]=${hotelId.toString()}` : ''}${slug ? `&filters[topic][activity][slug][$eq]=${slug.toString()}` : ''}${locale ? `&locale=${locale}` : ''}`,
            method: 'GET',
        });
    };
}

const strapiTopicsService = new StrapiTopicsService();
export default strapiTopicsService;
