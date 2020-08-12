import * as express from 'express';
import ReqProm from 'request-promise';

import { api } from '../constants';
import { BREWERIES, QUERIES } from '../types';
import { arrangeMultipleQueries, getAndParse, transformQueriesToRequests } from './helpers.routes';

/**
 * @description handler for the '/breweries' end point.
 * @description accepts queries: by_city, by_postal, by_name, by_state, by_type, sort
 * @param req express.Request
 * @param res express.Response
 */
export const breweriesHandler = async (req : express.Request, res : express.Response) : Promise<void> => {
  try {
    if (Object.keys(req.query).length !== 0) {
      console.log('req.query', req.query)
      const queries : QUERIES = req.query;
      const requests : string[] = transformQueriesToRequests(queries);
      const resp : BREWERIES[] = await Promise.all(requests.map((request : string) => getAndParse(`${request}`)));
      console.log('resp', resp)
      console.log('resp.length', resp[0].length)
      console.log('resp.length', resp[1].length)
      //change to reducer function
      const ret : BREWERIES = arrangeMultipleQueries(resp)
      res.json({})
    } else {
      const breweries : BREWERIES = await getAndParse(`${api}/breweries`)
      res.json({breweries})
    }
  } catch (error) {
    console.log('error in /breweries', error);
    res.status(500).send();
  }
}