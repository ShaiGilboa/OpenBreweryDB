import request from 'request-promise';
import { QUERIES } from 'types';
import { QUERIES_INDEX } from '../types';

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

export const transformQueriesToRequests = (queries : QUERIES) : string[] => {
  let ret = ['', '']
  const requests = {};
  Object.entries(queries).forEach(([key, value]) => console.log('key, value', key, value))
  return ret
}