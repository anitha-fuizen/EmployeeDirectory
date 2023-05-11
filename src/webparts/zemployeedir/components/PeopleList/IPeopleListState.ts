import { IPerson } from "../Zemployeedir";

export interface IPeopleListState {
  showCallOut: boolean;
  calloutElement: number;
  person: IPerson;
  paginatedItems:IPerson[];
  allItems:IPerson[];
}