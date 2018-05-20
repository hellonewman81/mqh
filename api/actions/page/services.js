import Prismic from 'prismic-javascript';
import qs from 'qs';

const apiEndpoint = 'https://machealth.prismic.io/api/v2';
const apiToken =
  'MC5Xd0RUVnlJQUFIaEJwZDVr.C--_ve-_vRokUu-_vQtBau-_vTTvv70q77-977-977-9CB5dYO-_ve-_vQZ7aO-_vVUL77-977-977-9';

const getData = async req => {
  console.log(req);

  const { pathname } = req;
  // const res = pathname.replace(/^\/|\/$/g, '').split('/');
  // const [path, id] = res;
  // console.log(path + ' ' + id);
  // /services/biomechanical-assessment

  console.log(pathname);

  let results = [];
  await Prismic.getApi(apiEndpoint, { accessToken: apiToken })
    .then(api =>
      // api.query(Prismic.Predicates.at('document.type', path || 'page_home'), {})).then(response => {
      api.query(Prismic.Predicates.at('document.type', pathname.replace('/', '')), {
        orderings: `[my.${pathname.replace('/', '')}.sort_order] asc`
      }))
    .then(
      response => {
        // An empty query will return all the documents
        // console.log('Documents: ', JSON.stringify(response.results));
        results = response.results;
      },
      err => {
        console.log('Something went wrong: ', err);
      }
    );
  //  console.log(req);
  return results;
};

// Export it to make it available outside
module.exports.getData = getData;

export default function services(req) {
  return getData(req.body);
}

/*

Address: Shop 1044B, level 1 upper, Macquarie Shopping Centre, Macquarie Park NSW 2113
Hours: Closed ⋅ Opens 8:30AM Mon.
Phone: (02) 9887 2270
  api.query(
    Prismic.Predicates.at('document.type', 'blog_post'),
    { orderings : '[my.blog_post.date desc]' }
  ).then(response => {
    // response is the response object, response.results holds the documents
  });

  services/sadasdssadd

*/
