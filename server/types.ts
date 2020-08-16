export interface BREWERY {
  id: number,
  name: string,
  brewery_type: string,
  street: string,
  city: string,
  state: string,
  postal_code: string,
  country: string,
  longitude: string,
  latitude: string,
  phone: string,
  website_url: string,
  updated_at: string,
}

export type BREWERIES = BREWERY[];

export interface QUERIES {
  by_city?: string,
  by_state?: string,
  by_postal?: string,
  by_type?: string[] | string,
}

export type QUERIES_INDEX = keyof QUERIES

export interface LOCATIONS_TYPES {
  locations: string[],
  types: string[],
}