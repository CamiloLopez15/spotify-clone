export interface Song {
  id: number;
  title: string;
  created_at: string;
  file: string;
  proprietors: string[];
  album: string;
  albumId: number;
  cover: string;
}

export interface Album {
  albumId: number;
  title: string;
  description: string;
  created_at: string;
  artists: string[];
  cover: string;
}
