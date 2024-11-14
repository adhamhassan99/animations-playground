export interface ISearchPayload {
  total_results: number;
  page: number;
  per_page: number;
  photos: IPhoto[];
}

export interface IPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  avg_color: string;
  src: {
    original: string;
    large: string;
    medium: string;
    large2x: string;
  };
  alt: string;
}
