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
  by_city?: string[] | string,
  by_name?: string,
  by_state?: string[] | string,
  by_postal?: string[] | string,
  by_type?: string[] | string,
  sort?: string,
}

export type QUERIES_INDEX = keyof QUERIES