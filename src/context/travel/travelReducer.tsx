import {Card} from '../../interfaces/Card.interface';
import {Prices} from '../../interfaces/Prices.interface';
import {TravelStatus, TravelType} from '../../interfaces/Travel.type';
import {Location, TravelPoint} from '../../interfaces/TravelInfo.interface';

export interface TravelState {
  userLocation: Location;
  pointUser: TravelPoint;
  selectedPayment: Card;
  travelValue: number;
  travelFastValue: number;
  travelScheduleValue: number;
  travelFastSharedValue: number;
  travelScheduleSharedValue: number;
  travelStatus: TravelStatus;
  travelFrom: TravelPoint;
  travelTo: TravelPoint;
  travelId: string;
  loadingCalculatedTravel: boolean;
  travelType: TravelType;
  travelDate: Date;
  prices: Prices | null;
}

type TravelAction =
  | {type: 'set_user_location'; payload: Location}
  | {type: 'set_travel_from'; payload: TravelPoint}
  | {type: 'set_travel_to'; payload: TravelPoint}
  | {type: 'set_travel_type'; payload: TravelType}
  | {type: 'set_travel_date'; payload: Date}
  | {type: 'set_travel_status'; payload: TravelStatus}
  | {type: 'set_point_user'; payload: TravelPoint}
  | {type: 'set_travel_value'; payload: number}
  | {type: 'set_travel_fast_value'; payload: number}
  | {type: 'set_travel_fast_shared_value'; payload: number}
  | {type: 'set_travel_schedule_value'; payload: number}
  | {type: 'set_travel_schedule_shared_value'; payload: number}
  | {type: 'set_selected_payment'; payload: Card}
  | {type: 'set_travel_id'; payload: string}
  | {type: 'setPrices'; payload: Prices}
  | {type: 'set_loading_calculated_travel'; payload: boolean};

export const travelReducer = (
  state: TravelState,
  action: TravelAction,
): TravelState => {
  switch (action.type) {
    case 'set_user_location':
      return {
        ...state,
        userLocation: action.payload,
      };
    case 'set_selected_payment':
      return {
        ...state,
        selectedPayment: action.payload,
      };
    case 'set_point_user':
      return {
        ...state,
        pointUser: action.payload,
      };
    case 'set_travel_value':
      return {
        ...state,
        travelValue: action.payload,
      };

    case 'set_travel_fast_value':
      return {
        ...state,
        travelFastValue: action.payload,
      };
    case 'set_travel_fast_shared_value':
      return {
        ...state,
        travelFastSharedValue: action.payload,
      };
    case 'set_travel_schedule_value':
      return {
        ...state,
        travelScheduleValue: action.payload,
      };
    case 'set_travel_schedule_shared_value':
      return {
        ...state,
        travelScheduleSharedValue: action.payload,
      };

    case 'set_travel_from':
      return {
        ...state,
        travelFrom: action.payload,
      };
    case 'set_travel_to':
      return {
        ...state,
        travelTo: action.payload,
      };

    case 'set_travel_type':
      return {
        ...state,
        travelType: action.payload,
      };

    case 'set_travel_date':
      return {
        ...state,
        travelDate: action.payload,
      };

    case 'set_travel_status':
      return {
        ...state,
        travelStatus: action.payload,
      };
    case 'set_travel_id':
      return {
        ...state,
        travelId: action.payload,
      };
    case 'set_loading_calculated_travel':
      return {
        ...state,
        loadingCalculatedTravel: action.payload,
      };
    case 'setPrices':
      return {
        ...state,
        prices: action.payload,
      };
    default:
      return state;
  }
};
