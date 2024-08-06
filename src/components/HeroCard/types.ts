type heroType = {
  id: string;
  name: string;
  films: string[];
  starships: string[];
};

type nodesType = {
  id: string;
  data: {
    label: string;
  };
  position: {
    x: number;
    y: number;
  };
};

type edgesType = {
  id: string;
  source: string;
  target: string;
};

export type { heroType, nodesType, edgesType };
