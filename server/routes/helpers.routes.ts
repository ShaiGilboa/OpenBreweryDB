import request from 'request-promise';
import { QUERIES } from 'types';
import { QUERIES_INDEX } from '../types';

/**
 * @description returns a JOSN object from a get-url
 * @param url the string of the url to fetch from
 * @return JSON object
 */
export const getAndParse = async (url : string) : Promise<any> => {
  try {
    const stringify : string = await request(url);
    const json : any = await JSON.parse(stringify);
    return json;
  } catch (error) {
    console.log('error in getAndParse', error)
    return ;
  }
}

/**
 * @description returns Object of the breweries after ALL queries 
 * @param queries the objects of queries
 * @return JSON object with desired breweries
 */
export const transformQueriesToRequests = (queries : QUERIES) : string[] => {
  let ret = ['', '']
  const requests = {};
  Object.entries(queries).forEach(([key, value]) => {
    switch(typeof value) {
      case 'string':
        return
      case 'object':
        return
      default:
        throw new Error(" ");
        
    }
  })
  return ret
}