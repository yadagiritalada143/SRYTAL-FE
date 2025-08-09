export interface PoolCandidatesComments {
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    id: string;
  };
  callStartsAt: Date;
  callEndsAt: Date;
  comment: string;
  updateAt: string;
  _id: string;
  id: string;
}

export interface CandidateInterface {
  _id: string;
  candidateName: string;
  contact: {
    email: string;
    phone: string;
  };
  totalYearsOfExperience: number;
  relaventYearsOfExperience: number;
  evaluatedSkills: string;
  comments: PoolCandidatesComments[];
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    id: string;
  };
  createdAt: string;
  lastUpdatedAt: string;
  __v: number;
}
