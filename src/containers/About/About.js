import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Link, RichText, Date } from 'prismic-reactjs';
import GoogleMapReact from 'google-map-react';
import { Row, Col, Container } from 'reactstrap';
import { isLoaded as isPageLoaded, load as loadPage } from 'redux/modules/page';
import View from 'components/View/View';
import AboutModal from 'components/AboutModal/AboutModal';
// import ModalLink from 'components/ModalLink/ModalLink';

const AnyReactComponent = ({ text, styles }) => (
  <div className={styles.greatPlaceStyle}>{text}</div>
);

const linkResolver = function (doc) {
  // Pretty URLs for known types
  if (doc.type === 'services') return `/services/${doc.uid}`;
  if (doc.type === 'page') return `/${doc.uid}`;
  // Fallback for other types, in case new custom types get created
  return `/blog/${doc.id}`;
};

@provideHooks({
  fetch: async ({ store: { dispatch, getState }, location }) => {
    if (!isPageLoaded(getState())) {
      await dispatch(loadPage(location)).catch(() => null);
    }
  }
})
@connect(
  state => ({
    page: state.page.data.data
  }),
  {}
)
export default class About extends Component {
  static propTypes = {
    page: PropTypes.shape({
      breadcrumbs: PropTypes.any,
      children: PropTypes.array,
      description: PropTypes.objectOf(PropTypes.any),
      id: PropTypes.number,
      urlPath: PropTypes.string,
      name: PropTypes.string
    }).isRequired,
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any
  };

  static defaultProps = {
    changeVid: null,
    center: [-33.7774822, 151.0498696],
    zoom: 12,
    greatPlaceCoords: { lat: -33.7774822, lng: 151.0498696 }
  };

  render() {
    const { page } = this.props;
    const styles = require('./About.scss');
    return (
      <View contaainer={false}>
        {page ? (
          <div>
            <Helmet
              title="About"
              meta={[
                {
                  name: 'About Maquarie Health Professionals',
                  content:
                    'About Chiropractor; North Ryde, Ryde, Maquarie park, top ryde, marsfield, Maquarie Centre'
                }
              ]}
            />
            {/* page.image &&
            North Ryde, Ryde, Maquarie park, top ryde, marsfield, Maquarie Centre
              <img src={page.image.url} alt={page.image.alt} style={{ maxWidth: '100%' }} />
            */}

            <header
              className="masthead"
              style={{
                backgroundImage: `url(${page.hero_image.url})`,
                height: '50vh',
                minHeight: '50vh'
              }}
            >
              <div className="container">
                <div className="intro-text intro-text-alt">
                  <div className="intro-lead-in">About</div>
                  <div className="intro-heading text-uppercase">Maquarie Health Professionals</div>
                </div>
              </div>
            </header>

            <section className="py-7 bg-light body-content">
              <Container className="my-5">{RichText.render(page.body, linkResolver)}</Container>
            </section>

            <section id="about">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h2 className="section-heading text-uppercase mb-4">Meet the team.</h2>
                    <h3 className="section-subheading text-muted"></h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      {page.practitioners &&
                        page.practitioners.map((item, idx) => (
                          <div className={idx % 2 === 0 ? 'col-xs-12 col-sm-4 mb-4' : 'col-xs-12 col-sm-4 mb-4'}>
                            <div className="mb-2">
                              {item.image && item.image.url &&
                                <img className="mw-100" src={item.image.url} />
                              }
                            </div>
                            <div className="timeline-panel">
                              <div className="timeline-heading">
                                <h4>{RichText.render(item.name, linkResolver)}</h4>
                                <div className="subheading">
                                  {RichText.render(item.lead, linkResolver)}
                                </div>
                              </div>

                              {item.blurb[0] && item.blurb[0].text && item.blurb[0].text != '' &&
                                <AboutModal
                                  className="modal-lg"
                                  buttonLabel="View Info"
                                  modalTitle={RichText.render(item.name, linkResolver)}
                                  modalImage={item.image && item.image.url ? <img className="mw-100 mb-5" src={item.image.url} alt={RichText.render(item.name, linkResolver)} /> : null}
                                  bodyContent={<div>
                                    <div className="timeline-body">
                                      <p className="text-muted">
                                        {RichText.render(item.blurb, linkResolver)}
                                      </p>
                                    </div>
                                  </div>}
                                />
                              }
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <Row>Unable to load page</Row>
        )}
      </View>
    );
  }
}
