const { data } = require('autoprefixer');

module.exports = function() {
  return {
    '/_app': [
      {
        key: 'layoutMenu',
        data: async () => {
          let dataMainMenu;

          try {
            dataMainMenu = await fetch(
              process.env.NEXT_PUBLIC_STRAPI_API + '/api/landing-page?populate=deep'
            );
          } catch (error) {
            console.error(error);
          }
          const data = await dataMainMenu?.json();

          return data?.data.attributes;
        },
      },
    ],
  };
};
