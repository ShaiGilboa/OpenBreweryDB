import * as express from 'express';
import { api } from '../constants';
import { BREWERIES, QUERIES } from '../types';
import { getAndParse, transformQueriesToRequests } from './helpers.routes';

export const breweriesHandler = async (req : express.Request, res : express.Response) : Promise<void> => {
  try {
    if (req.query) {
      console.log('req.query', req.query)
      const queries : QUERIES = req.query;
      const requests : string[] = transformQueriesToRequests(queries);
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