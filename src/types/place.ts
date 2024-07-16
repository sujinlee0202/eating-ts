import { Inputs } from "@/components/AddPlaceInfoForm";

export interface Place {
  id: string;
  address: string;
  category: string;
  description: string;
  link: string;
  mapx: string;
  mapy: string;
  roadAddress: string;
  telephone: string;
  title: string;
}

export interface PlaceReview extends Place, Inputs {}
