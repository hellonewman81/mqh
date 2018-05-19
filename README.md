
# Sparesbox category listing pages

## About

This app uses the following technologies:

* [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) rendering
* Both client and server make calls to load data from separate API server
* [React](https://github.com/facebook/react)
* [React Router](https://github.com/reactjs/react-router)
* [Express](http://expressjs.com)
* [Feathers](http://feathersjs.com/)
* [Passport](http://passportjs.org), [feathers-authentication](https://github.com/feathersjs/feathers-authentication) and [redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper) for authentication
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](https://webpack.js.org/) for bundling
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [Redux](https://github.com/reactjs/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation
* [Redux Dev Tools](https://github.com/reactjs/redux-devtools) for next generation DX (developer experience). Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs).
* [React Router Redux](https://github.com/reactjs/react-router-redux) Redux/React Router bindings.
* [ESLint](http://eslint.org) to maintain a consistent code style
* [redux-form](http://redux-form.com/) to manage form state in Redux
* [lru-memoize](https://github.com/erikras/lru-memoize) to speed up form validation
* [multireducer](https://github.com/erikras/multireducer) to combine single reducers into one key-based reducer
* [style-loader](https://github.com/webpack/style-loader), [sass-loader](https://github.com/jtangelder/sass-loader) and [less-loader](https://github.com/webpack/less-loader) to allow import of stylesheets in plain css, sass and less,
* [bootstrap-loader](https://github.com/shakacode/bootstrap-loader) to customize Bootstrap
* [reactstrap](https://github.com/reactstrap/reactstrap) to for Bootstrap Components
* [font-awesome](https://github.com/FortAwesome/Font-Awesome)
* [react-helmet](https://github.com/nfl/react-helmet) to manage title and meta tag information on both server and client
* [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to allow require() work for statics both on client and server
* [Jest](https://facebook.github.io/jest/) and [mocha](https://mochajs.org/) to allow writing unit tests for the project.
* [lodash](https://lodash.com/) 

## Development


## Features

<dl>
  <dt>Hot reload</dt>

  <dt>Next generation JavaScript</dt>
  <dd>Use JSX syntax with all ES6 features, and some of ES7 (see <a href=".babelrc">.babelrc</a>).</dd>

  <dt>CSS in modules</dt>
  <dd>Write composable, modular and maintenable CSS with your components.</dd>

  <dt>Predictable state management</dt>
  <dd>Unidirectional data flow with <a href="http://redux.js.org">Redux</a> helps you write applications that behave consistently and are easy to test. On top of that, it provides a great developer experience.</dd>

  <dt>Backend API oriented services</dt>
  <dd>With <a href="http://feathersjs.com">Feathers</a> it's easy to create scalable real-time applications with services and hooks. 
  <a href="https://en.wikipedia.org/wiki/Cross-cutting_concern">Cross cutting concerns</a> are an extremely powerful part of aspect oriented programming. They are a very good fit for web and mobile applications since the majority are primarily CRUD applications with lots of shared functionality. You can create before and after hooks and chain them together to create very complex processes while still maintaining modularity and flexibility.</dd>

  <dt>Authentication</dt>
  <dd><a href="http://passportjs.org">Passport</a> authentication allows you to use all the desired strategies. The connections in REST and in real time are protected in the same way with the hooks. React-router, redux and <a href="https://github.com/mjrussell/redux-auth-wrapper">redux-auth-wrapper</a> allow you to keep control in your React app.</dd>

  <dt>Progressive wep app & Offline-first</dt>
  <dd>Progressive Web Apps are user experiences that have the reach of the web, and are:<br>
Reliable - Load instantly and never show the downasaur, even in uncertain network conditions.<br>
Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.<br>
Engaging - Feel like a natural app on the device, with an immersive user experience.<br><br>
This new level of quality allows Progressive Web Apps to earn a place on the user's home screen.</dd>

  <dt>Lazy loading & dynamic routing</dt>
  <dd>The code splitting makes the size of your main bundle almost fixed, and with react-router you can load application pieces on demand. You can send bundles to people who are only trained, such as administration.</dd>

  <dt>Universal rendering</dt>
  <dd>With the help of server side rendering the first rendering is never empty and performance is better. This is the time for example to prefetch the data.
<a href="https://github.com/halt-hammerzeit/webpack-isomorphic-tools">Webpack-isomorphic-tools</a> to allow require() work for statics both on client and server.</dd>

  <dt>SEO</dt>
  <dd>This project supports SEO for search engines even without support indexing of JavaScript content, thanks to server-side rendering.</dd>
</dl>

## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```

The first time it may take a little while to generate the first `webpack-assets.json` and complain with a few dozen `[webpack-isomorphic-tools] (waiting for the first Webpack build to finish)` printouts, but be patient. Give it 30 seconds.

## Building and Running Production Server

```bash
npm run build
npm run start
```

## Building and Running UAT Server

```bash
npm run build
npm run uat
```

## Explanation

What initially gets run is `bin/server.js`, which does little more than enable ES6 and ES7 awesomeness in the server-side node code. It then initiates `server.js`. In `server.js` we proxy any requests to `/api/*` to the API server, running at `localhost:3030`. All the data fetching calls from the client go to `/api/*`. Aside from serving the favicon and static content from `/static`, the only thing `server.js` does is initiate delegate rendering to `react-router`. At the bottom of `server.js`, we listen to port `3000` and initiate the API server.

#### Routing and HTML return

The primary section of `server.js` generates an HTML page with the contents returned by `react-router`. First we instantiate an `ApiClient`, a facade that both server and client code use to talk to the API server. On the server side, `ApiClient` is given the request object so that it can pass along the session cookie to the API server to maintain session state. We pass this API client facade to the `redux` middleware so that the action creators have access to it.
You can also use `app` for RESTful calls to api.

Then we perform [server-side data fetching](#server-side-data-fetching), wait for the data to be loaded, and render the page with the now-fully-loaded `redux` state.

The last interesting bit of the main routing section of `server.js` is that we swap in the hashed script and css from the `webpack-assets.json` that the Webpack Dev Server – or the Webpack build process on production – has spit out on its last run. You won't have to deal with `webpack-assets.json` manually because [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) take care of that.

We also spit out the `redux` state into a global `window.__data` variable in the webpage to be loaded by the client-side `redux` code.

#### Server-side Data Fetching

The [redial](https://www.npmjs.com/package/redial) package exposes an API to return promises that need to be fulfilled before a route is rendered. It exposes a `<ReduxAsyncConnect />` container, which wraps our render tree on both [server](https://github.com/bertho-zero/react-redux-universal-hot-example/blob/master/src/server.js) and [client](https://github.com/bertho-zero/react-redux-universal-hot-example/blob/master/src/client.js). More documentation is available on the [redial](https://www.npmjs.com/package/redial) page.

#### Client Side

The client side entry point is reasonably named `client.js`. All it does is load the routes, initiate `react-router`, rehydrate the redux state from the `window.__data` passed in from the server, and render the page over top of the server-rendered DOM. This makes React enable all its event listeners without having to re-render the DOM.

#### Redux Middleware

The middleware, [`clientMiddleware.js`](https://github.com/bertho-zero/react-redux-universal-hot-example/blob/master/src/redux/middleware/clientMiddleware.js), serves two functions:

1. To allow the action creators access to the client API facade. Remember this is the same on both the client and the server, and cannot simply be `import`ed because it holds the cookie needed to maintain session on server-to-server requests.
2. To allow some actions to pass a "promise generator", a function that takes the API client and returns a promise. Such actions require three action types, the `REQUEST` action that initiates the data loading, and a `SUCCESS` and `FAILURE` action that will be fired depending on the result of the promise. There are other ways to accomplish this, some discussed [here](https://github.com/reactjs/redux/issues/99), which you may prefer, but to the author of this example, the middleware way feels cleanest.

#### Redux Modules... *What the Duck*?

The `src/redux/modules` folder contains "modules" to help
isolate concerns within a Redux application (aka [Ducks](https://github.com/erikras/ducks-modular-redux), a Redux Style Proposal that I came up with). I encourage you to read the
[Ducks Docs](https://github.com/erikras/ducks-modular-redux) and provide feedback.

#### Getting data and actions into components

To understand how the data and action bindings get into the components – there's only one, `InfoBar`, in this example – I'm going to refer to you to the [Redux](https://github.com/gaearon/redux) library. The only innovation I've made is to package the component and its wrapper in the same js file. This is to encapsulate the fact that the component is bound to the `redux` actions and state. The component using `InfoBar` needn't know or care if `InfoBar` uses the `redux` data or not.

#### Images

Now it's possible to render the image both on client and server. Please refer to issue [#39](https://github.com/erikras/react-redux-universal-hot-example/issues/39) for more detail discussion, the usage would be like below (super easy):

```javascript
let logoImage = require('./logo.png');
```

#### Styles

This project uses [local styles](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284) using [css-loader](https://github.com/webpack/css-loader). The way it works is that you import your stylesheet at the top of the `render()` function in your React Component, and then you use the classnames returned from that import. Like so:

This project uses reactstrap https://reactstrap.github.io/

```javascript
render() {
const styles = require('./App.scss');
...
```

Then you set the `className` of your element to match one of the CSS classes in your SCSS file, and you're good to go!

```jsx
<div className={styles.mySection}> ... </div>
```

#### Unit Tests

The project uses [Jest](https://facebook.github.io/jest/) with [Mocha](https://mochajs.org/) to run your unit tests.

To run the tests in the project, just simply run `npm test` if you have `Chrome` installed, it will be automatically launched as a test service for you.

### Using Redux DevTools

[Redux Devtools](https://github.com/gaearon/redux-devtools) are enabled by default in development.

- <kbd>CTRL</kbd>+<kbd>H</kbd> Toggle DevTools Dock
- <kbd>CTRL</kbd>+<kbd>Q</kbd> Move DevTools Dock Position
- see [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more detailed information.

If you have the [Redux DevTools chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) installed it will automatically be used on the client-side instead.

If you want to disable the dev tools during development, set `__DEVTOOLS__` to `false` in `/webpack/dev.config.js`.  
DevTools are not enabled during production by default.