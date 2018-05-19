import Prismic from 'prismic-javascript';

const apiEndpoint = 'https://mqchiro.prismic.io/api/v2';
const apiToken = 'MC5Xdi1xekNBQUFPM1ZoTktv.X2UI77-9Hzjvv70nNu-_ve-_vXnvv71sfe-_vWgbL07vv71X77-9Tu-_ve-_vRDvv70J77-977-9Ug';

const getData = async req => {
  console.log(req);
  let x = [];
  await Prismic.getApi(apiEndpoint, { accessToken: apiToken })
    .then(api => api.query(Prismic.Predicates.at('document.type', 'page_home'), {}))
    .then(
      response => {
        // An empty query will return all the documents
        console.log('Documents: ', JSON.stringify(response.results[0].data));
        x = response.results[0];
      },
      err => {
        console.log('Something went wrong: ', err);
      }
    );
  //  console.log(req);
  return x;
};

// Export it to make it available outside
module.exports.getData = getData;

export default function loadNavigation(req) {
  return getData(req.body);
}

/*
api.query(
    Prismic.Predicates.at('document.type', 'blog_post'),
    { orderings : '[my.blog_post.date desc]' }
  ).then(response => {
    // response is the response object, response.results holds the documents
  });
 */
