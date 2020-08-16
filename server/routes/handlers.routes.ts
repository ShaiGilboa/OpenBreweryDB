import * as express from 'express';
import ReqProm from 'request-promise';

import { api } from '../constants';
import { BREWERIES, QUERIES, LOCATIONS_TYPES, BREWERY } from '../types';
import { reduceMultipleQueries, getAndParse, transformQueriesToRequests } from './helpers.routes';

/**
 * @description handler for the '/breweries/:page/:sort' end point.
 * @description accepts queries: by_city, by_postal, by_name, by_state, by_type, sort
 * @param req express.Request
 * @param res express.Response
 */
export const breweriesHandler = async (req : express.Request, res : express.Response) : Promise<void> => {
  try {
    const { sort, page } = req.params;
    if (Object.keys(req.query).length !== 0) {
      const queries : QUERIES = req.query;
      const requests : string[] = transformQueriesToRequests(queries, page);
      const resp : BREWERIES[] = await Promise.all(requests.map((request : string) => getAndParse(`${request}`)));
      const filteredBreweries : BREWERIES = [];
      resp.forEach(location => filteredBreweries.push(...location))
      res.status(200).json({breweries: filteredBreweries})
    } else {
      throw new Error("Forgot quereis");
    }
  } catch (error) {
    console.log('error in /breweries', error);
    res.status(500).send();
  }
}