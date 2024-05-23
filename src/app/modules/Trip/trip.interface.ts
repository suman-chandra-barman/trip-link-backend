type TItinerary = {
  day: number;
  description: string;
};

export type TTrip = {
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  travelType: string;
  photos: string[];
  budget: number;
  isDeleted: false;
  itinerary: TItinerary[];
};
