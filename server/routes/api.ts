import * as RequestPromise from 'request-promise';
import * as express from 'express';
import { api } from '../constants';
import { BREWERIES, QUERIES } from '../types';
import { getAndParse, transformQueriesToRequests } from './helpers.routes';
import { breweriesHandler } from './handlers.routes';

const router = express.Router()

  .get('/breweries/:page/:sort', breweriesHandler)
  
  .get('/breweries/name/:page/:sort', async (req : express.Request, res : express.Response) : Promise<void> => {
    try {
      console.log('req.query', req.query)
      res.send()
    } catch (error) {
      
    }
  })

export default router;