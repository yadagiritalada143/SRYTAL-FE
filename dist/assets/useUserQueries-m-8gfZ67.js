import { u as s } from './useQuery-4fhBkLAX.js';
import {
  g as t,
  d as o,
  e as u,
  f as n,
  h as y,
  i as l
} from './button-D3DmOMH8.js';
import { e as i } from './common-services-DPGUVDMw.js';
const a = {
    companies: ['poolCompanies'],
    company: e => ['poolCompany', e],
    candidates: ['poolCandidates'],
    candidate: e => ['poolCandidate', e],
    userDetails: ['userDetails'],
    profileImage: ['profileImage'],
    courses: ['userCourses']
  },
  c = () => s({ queryKey: a.companies, queryFn: t }),
  C = (e, r = !0) =>
    s({ queryKey: a.company(e), queryFn: () => o(e), enabled: !!e && r }),
  g = () => s({ queryKey: a.candidates, queryFn: u }),
  q = (e, r = !0) =>
    s({ queryKey: a.candidate(e), queryFn: () => n(e), enabled: !!e && r }),
  f = () => s({ queryKey: a.userDetails, queryFn: y }),
  B = () => s({ queryKey: a.profileImage, queryFn: i }),
  D = () => s({ queryKey: a.courses, queryFn: l });
export { c as a, C as b, B as c, a as d, g as e, q as f, D as g, f as u };
