import Prismic from 'prismic-javascript';

const apiEndpoint = 'https://machealth.prismic.io/api/v2';
const apiToken =
  'MC5Xd0RUVnlJQUFIaEJwZDVr.C--_ve-_vRokUu-_vQtBau-_vTTvv70q77-977-977-9CB5dYO-_ve-_vQZ7aO-_vVUL77-977-977-9';

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
