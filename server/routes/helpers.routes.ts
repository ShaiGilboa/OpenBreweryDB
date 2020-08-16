import { api, PER_PAGE } from '../constants';
import ReqProm from 'request-promise';
import { QUERIES } from 'types';
import { QUERIES_INDEX, BREWERIES, BREWERY, LOCATIONS_TYPES } from '../types';
import { type } from 'os';

/**
 * @description returns a JOSN object from a get-url
 * @param url the string of the url to fetch from
 * @return JSON object
 */
export const getAndParse = async (url : string) : Promise<any> => {
  try {
    const ret : BREWERIES = []
    let stringify : string = await ReqProm(url);
    let json : any = await JSON.parse(stringify);
    ret.push(...json);
    console.log('ret', ret.length )
    return ret;
  } catch (error) {
    console.log('error in getAndParse', error)
    return ;
  }
}

/**
 * @description seperates the queries into types, and locations
 * @param info { locations: string[], types : string[] } - will be the requests for the locations, and the types
 * @param page '${number}` - the page we are asking for
 * @param key - filer by this key
 * @param value - the value of the filter key
 */
const orsOrAnds = (info : LOCATIONS_TYPES, page: string, key: string, value: string) : void => {
  const { locations, types } = info;
  switch (key) {
    case 'by_type':
      types.push(`&by_type=${value}`);
      break;
    case 'by_city':
    case 'by_postal':
    case 'by_state':
    case 'by_postal':
      locations.push(`${api}/breweries?${key}=${value}&per_page=${PER_PAGE}&page=${page}`);
      break;
    default:
      //error
  }
}

/**
 * 
 * @param queries 
 * @param page 
 */
const destructorQueries = (queries : QUERIES, page: string) : LOCATIONS_TYPES => {
  const locations: string[] = [];
  const types: string[] = [];
  Object.entries(queries).forEach(([key, value]) => {
    switch(typeof value) {
      case 'string':
        orsOrAnds({locations, types} , page, key, value)
        break;
      case 'object':
        console.log('key', key)
        value.forEach((aValue : string) => {
          orsOrAnds({locations, types} , page, key, aValue)
        });
        break;
      default:
        throw new Error(" ");
    }
  })
  return {locations, types};
}

/**
 * @description returns Object of the breweries after ALL queries 
 * @param queries the objects of queries
 * @return JSON object with desired breweries
 */
export const transformQueriesToRequests = (queries : QUERIES, page: string) : string[] => {
  const {locations, types} = destructorQueries(queries, page)
  if(locations.length === 0) throw new Error("forgot to put locations");
  if (types.length > 0) {
    const requests : string[] = [];
    types.forEach(type => locations.forEach( location => requests.push(`${location}${type}`)))
    return requests;
  } else {
    return locations
  }
}

export const reduceMultipleQueries = (unorganized : BREWERIES[]) : BREWERIES => {
  const ret : BREWERIES = [];
  unorganized.forEach((response : BREWERIES) => {
    response.forEach((brewery : BREWERY) => (!ret.some((aBrewery : BREWERY) => aBrewery.id === brewery.id)) && ret.push(brewery))
  })
  return ret;
}