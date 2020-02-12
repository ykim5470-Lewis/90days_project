import fetch from "isomorphic-fetch";
import cookies from "next-cookies";

export default function MyApp({ Component, pageProps }) {
  return [
    <>
      <Component {...pageProps} />
    </>,
  ];
}

MyApp.getInitialProps = async appContext => {
  let ctxObj = appContext.ctx;
  const { SESSION } = cookies(ctxObj);
  let pageProps = {};
  const res = await fetch("http://dev5.kross.kr/login/v2/api/session/exists", {
    method: "post",
    headers: {
      Authorization: process.env.AUTHORIZATION,
      Cookie: `SESSION=${SESSION}`,
    },
  });
  let json = await res.json();
  console.log(json);
  pageProps = json;
  return { pageProps };
};
