import _isoFetcher from './fetcher';

export async function fetchKROSS(sql: string) {
  const isoData: RequestInit = {
    body: JSON.stringify({
      sql,
    }),
    method: 'POST',
  };
  const url = `${process.env.BASE_URL}/api/kross`;
  return _isoFetcher(url, isoData);
}
