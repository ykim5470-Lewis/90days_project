import { Request, Response } from 'express';

import _isoFetcher from '../../ajax/fetcher';

async function krossFetcher(req: Request, res: Response) {
  const { sql } = JSON.parse(req.body);

  try {
    const isoData: RequestInit = {
      method: 'GET',
    };
    const url = `${process.env.API_URL}${sql}`;
    const json = await _isoFetcher(url, isoData);
    res.send(json);
  } catch (e) {
    throw e;
  }
}

export default krossFetcher;
