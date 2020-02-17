import fetch from "isomorphic-fetch";
import cookies from "next-cookies";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../redux/reducers/index";
import ErrorPage from "./signIn";

function MyApp({ Component, store, sessionResponseResult, pageProps }) {
  console.log(sessionResponseResult.result);
  if (!sessionResponseResult.result) {
    return <ErrorPage {...sessionResponseResult} />;
  } else
    return [
      <>
        <Provider store={store}>
          <Component {...sessionResponseResult} {...pageProps} />
        </Provider>
      </>,
    ];
}
MyApp.getInitialProps = async appContext => {
  const { ctx, Component } = appContext;
  const { currentSession } = cookies(ctx);
  let sessionResponseResult = {};
  let pageProps = {};
  //page's getInitialProps exist
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const res = await fetch("http://dev5.kross.kr/login/v2/api/session/exists", {
    method: "post",
    headers: {
      Authorization: process.env.AUTHORIZATION,
      Cookie: `SESSION=${currentSession}`,
    },
  });
  sessionResponseResult = await res.json();
  console.log(sessionResponseResult);

  return { sessionResponseResult, pageProps };
};
export default withRedux((initialState, options) => {
  const store = createStore(reducer, initialState, composeWithDevTools());
  return store;
})(MyApp);
