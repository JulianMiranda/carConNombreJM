export interface DataTravel {
  from: TravelPoint;
  to: TravelPoint;
}
export interface Location {
  latitude: number;
  longitude: number;
}
export interface TravelPoint {
  name: string;
  address: string;
  coordinates: Location;
}

export interface HistoryTravel {
  from: TravelPoint;
  to: TravelPoint;
  createdAt: string;
  cost: number;
}
export interface FavoritesPlaces {
  name: string;
  place: TravelPoint;
}

export interface DistanceCalculated {
  fast: number;
  fastShared: number;
  schedule: number;
  scheduleShared: number;
}
export interface Travel {
  state: string;
  type: string;
  user: string;
  cost: number;
  currency: string;
  date: Date;
  status: boolean;
  fromLocation: Location;
  toLocation: Location;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  coordinates: Coordinates;
  mapImageFrom: string;
  mapImageTo: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
