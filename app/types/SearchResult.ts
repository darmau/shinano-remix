export type SearchResult = {
  file_id: string;
  filename: string;
  score: number;
  attributes: {
    file: {
      description: string;
      image: string;
      title: string;
    };
  };
};