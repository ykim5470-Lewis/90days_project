import _isoFetcher from "./fetcher";

export async function fetchKROSS(sql: string) {
  const isoData: RequestInit = {
    body: JSON.stringify({
      sql
    }),
    method: "POST"
  };

  ////임시 deploy
  const url = `${process.env.BASE_URL}/api/kross`;
  ////임시 yarn build & start
  // const url = `http://localhost:3000${process.env.BASE_URL}/api/kross`;
  ////임시 yarn dev
  // const url = `http://localhost:3000/api/kross`;
  return _isoFetcher(url, isoData);
}
