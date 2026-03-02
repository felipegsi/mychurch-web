export type ChurchEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
};

export type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

export type Ministry = {
  id: string;
  name: string;
  leaderName: string;
  membersCount: number;
  focus: string;
};
