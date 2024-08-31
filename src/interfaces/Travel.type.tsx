export type TravelStatus =
  | 'init'
  | 'searching'
  | 'cancelled'
  | 'inprogress'
  | 'complete';

export type SearchingTravelProps = {
  handle: boolean;
  userId: string;
};
export type TravelType =
  | 'fast'
  | 'schedule'
  | 'fast-shared'
  | 'schedule-shared';
