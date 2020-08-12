import { api } from '../constants';
import ReqProm from 'request-promise';
import { QUERIES } from 'types';
import { QUERIES_INDEX, BREWERIES, BREWERY } from '../types';

/**
 * @description returns a JOSN object from a get-url
 * @param url the string of the url to fetch from
 * @return JSON object
 */
export const getAndParse = async (url : string) : Promise<any> => {
  try {
    const stringify : string = await ReqProm(url);
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
  const ret : string[] = [];
  Object.entries(queries).forEach(([key, value]) => {
    switch(typeof value) {
      case 'string':
        ret.push(`${api}/breweries?${key}=${value}`);
        break;
      case 'object':
        value.forEach((aValue : string) => {
          ret.push(`${api}/breweries?${key}=${aValue}`)
        });
        break;
      default:
        throw new Error(" ");
        
    }
  })
  console.log('ret', ret)
  return ret
}

export const arrangeMultipleQueries = (unorganized : BREWERIES[]) : BREWERIES => {
  const ret : BREWERIES = [];
  unorganized.forEach((response : BREWERIES) => {
    response.forEach((brewery : BREWERY) => (!ret.some((aBrewery : BREWERY) => aBrewery.id === brewery.id)) && ret.push(brewery))
  })
  console.log('ret', ret.length)
  return ret;
}