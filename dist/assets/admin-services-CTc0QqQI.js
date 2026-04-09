import { h as r } from './common-services-DPGUVDMw.js';
import { a as o } from './api-client-CcbR4Lbf.js';
const m = async a => {
    const e = localStorage.getItem('token');
    try {
      if (!e) throw 'Not authorized to access';
      return (
        await o.post('/admin/registerEmployeeByAdmin', a, {
          headers: { auth_token: e }
        })
      ).data;
    } catch (t) {
      throw t;
    }
  },
  l = async a => {
    const e = localStorage.getItem('token');
    try {
      if (!e) throw 'Not authorized to access';
      return (
        await o.post(
          '/admin/addPackageByAdmin',
          {
            ...a,
            startDate: r(a.startDate).format('YYYY-MM-DD'),
            endDate: r(a.endDate).format('YYYY-MM-DD')
          },
          { headers: { Auth_token: `Bearer ${e}` } }
        )
      ).data;
    } catch (t) {
      throw t;
    }
  },
  i = async a => {
    const e = localStorage.getItem('adminToken');
    try {
      return (
        await o.put('/admin/updateEmployeeDetailsByAdmin', a, {
          headers: { auth_token: e }
        })
      ).data;
    } catch (t) {
      throw t;
    }
  },
  y = async (a, e) => {
    const t = localStorage.getItem('adminToken');
    try {
      return (
        await o.put(
          '/admin/updatePackageByAdmin',
          {
            id: a,
            detailsToUpdate: {
              ...e,
              startDate: r(e.startDate).format('YYYY-MM-DD'),
              endDate: r(e.endDate).format('YYYY-MM-DD')
            }
          },
          { headers: { auth_token: `Bearer ${t}` } }
        )
      ).data;
    } catch (n) {
      throw n;
    }
  },
  p = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.post(
          '/admin/employeePasswordResetByAdmin',
          { employeeId: a },
          { headers: { auth_token: e } }
        )
      ).data;
    } catch (t) {
      throw t;
    }
  },
  h = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.post('/admin/deleteEmployeeByAdmin', a, {
          headers: { auth_token: e }
        })
      ).data;
    } catch (t) {
      throw t;
    }
  },
  k = async (a, e) => {
    const t = localStorage.getItem('token');
    try {
      return (
        await o.delete(`/admin/deletePackageByAdmin/${a}`, {
          headers: { auth_token: t },
          data: { confirmDelete: e }
        })
      ).data;
    } catch (n) {
      throw n;
    }
  },
  u = async (a, e) => {
    const t = localStorage.getItem('token');
    try {
      return (
        await o.delete(`/admin/deleteTaskByAdmin/${a}`, {
          headers: { auth_token: `Bearer ${t}` },
          data: { confirmDelete: e }
        })
      ).data;
    } catch (n) {
      throw n;
    }
  },
  g = async (a, e) => {
    const t = localStorage.getItem('token');
    try {
      return (
        await o.delete('/admin/deleteEmployeePackagesByAdmin', {
          headers: { auth_token: `Bearer ${t}` },
          data: { employeeId: a, packageId: e }
        })
      ).data;
    } catch (n) {
      throw n;
    }
  },
  w = async (a, e, t) => {
    const n = localStorage.getItem('token');
    try {
      return (
        await o.delete('/admin/deleteEmployeeTaskByAdmin', {
          headers: { auth_token: `Bearer ${n}` },
          data: { employeeId: a, packageId: e, taskId: t }
        })
      ).data;
    } catch (s) {
      throw s;
    }
  },
  A = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.delete(`/admin/deletePoolCandidatesByAdmin/${a.candidateId}`, {
          headers: { auth_token: e },
          data: { confirmDelete: a.confirmDelete }
        })
      ).data;
    } catch (t) {
      throw t;
    }
  },
  B = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.delete(`/admin/deletePoolCompanyByAdmin/${a.companyId}`, {
          headers: { auth_token: e },
          data: { confirmDelete: a.confirmDelete }
        })
      ).data;
    } catch (t) {
      throw t;
    }
  },
  S = async a => {
    const e = localStorage.getItem('adminToken');
    try {
      return (
        await o.get(`/admin/getEmployeeDetailsByAdmin/${a}`, {
          headers: { auth_token: e }
        })
      ).data.userDetails;
    } catch (t) {
      throw t;
    }
  },
  I = async () => {
    const a = localStorage.getItem('token');
    try {
      if (!a) throw 'Not authorized to access';
      return (
        await o('/admin/getAllEmployeeDetailsByAdmin', {
          headers: { auth_token: a }
        })
      ).data.usersList;
    } catch (e) {
      throw e;
    }
  },
  _ = async () => {
    const a = localStorage.getItem('token');
    try {
      if (!a) throw 'Not authorized to access';
      return (
        await o('/admin/getAllPackagesByAdmin', {
          headers: { auth_token: `Bearer ${a}` }
        })
      ).data.packagesList;
    } catch (e) {
      throw e;
    }
  },
  E = async a => {
    const e = localStorage.getItem('token');
    try {
      if (!e) throw 'Not authorized to access';
      return (
        await o.get(`/admin/getPackageDetailsByAdmin/${a}`, {
          headers: { auth_token: e }
        })
      ).data.packageDetails;
    } catch (t) {
      throw t;
    }
  },
  D = async a => {
    const e = localStorage.getItem('token');
    try {
      if (!e) throw 'Not authorized to access';
      const t = await o.get(`/admin/getEmployeePackagesByAdmin/${a}`, {
        headers: { auth_token: e }
      });
      return t.data.employeePackageDetails.length
        ? t.data.employeePackageDetails[0].packages
        : [];
    } catch (t) {
      throw t;
    }
  },
  b = async () => {
    const a = localStorage.getItem('token');
    try {
      if (!a) throw 'Not authorized to access';
      return (
        await o('/admin/getAllBloodGroupsByAdmin', {
          headers: { auth_token: a }
        })
      ).data.bloodGroupList;
    } catch (e) {
      throw e;
    }
  },
  f = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.post('/admin/addBloodGroupByAdmin', a, {
          headers: { auth_token: e }
        })
      ).data.bloodGroupList;
    } catch (t) {
      throw t;
    }
  },
  P = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.post('/admin/addEmploymentTypeByAdmin', a, {
          headers: { auth_token: e }
        })
      ).data;
    } catch (t) {
      throw t;
    }
  },
  T = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.post('/admin/addEmployeeRoleByAdmin', a, {
          headers: { auth_token: e }
        })
      ).data;
    } catch (t) {
      throw t;
    }
  },
  $ = async a => {
    const e = localStorage.getItem('token');
    if (!e) throw new Error('Not authorized');
    try {
      return (
        await o.post('/admin/addPackagetoEmployeeByAdmin', a, {
          headers: { auth_token: `Bearer ${e}` }
        })
      ).data;
    } catch (t) {
      throw t;
    }
  },
  Y = async (a, e) => {
    const t = localStorage.getItem('token');
    try {
      return (
        await o.put(
          '/admin/updateBloodGroupByAdmin',
          { id: a, type: e },
          { headers: { auth_token: t } }
        )
      ).data;
    } catch (n) {
      throw n;
    }
  },
  R = async (a, e) => {
    const t = localStorage.getItem('token');
    try {
      return (
        await o.put(
          '/admin/updateEmployeeRoleByAdmin',
          { id: a, designation: e },
          { headers: { auth_token: t } }
        )
      ).data;
    } catch (n) {
      throw n;
    }
  },
  z = async (a, e) => {
    const t = localStorage.getItem('token');
    try {
      return (
        await o.put(
          '/admin/updateEmploymentTypeByAdmin',
          { id: a, employmentType: e },
          { headers: { auth_token: t } }
        )
      ).data;
    } catch (n) {
      throw n;
    }
  },
  G = async () => {
    const a = localStorage.getItem('token');
    try {
      return (
        await o.get('/admin/getAllEmploymentTypesByAdmin', {
          headers: { auth_token: a }
        })
      ).data.employmentTypesList;
    } catch (e) {
      throw e;
    }
  },
  N = async (a, e) => {
    try {
      return (await o.post('/admin/addTaskByAdmin', { packageId: a, title: e }))
        .data;
    } catch (t) {
      throw t;
    }
  },
  M = async (a, e) => {
    const t = localStorage.getItem('token');
    try {
      return (
        await o.put(
          '/admin/updateTaskByAdmin',
          { id: a, title: e },
          { headers: { auth_token: t } }
        )
      ).data;
    } catch (n) {
      throw n;
    }
  },
  C = async () => {
    const a = localStorage.getItem('token');
    try {
      return (
        await o.get('/admin/getAllEmployeeRoleByAdmin', {
          headers: { auth_token: a }
        })
      ).data.employeeRoles;
    } catch (e) {
      throw e;
    }
  },
  L = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.delete(`/admin/deleteEmployeeRoleByAdmin/${a}`, {
          headers: { auth_token: e }
        })
      ).data;
    } catch (t) {
      throw t;
    }
  },
  F = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.delete(`/admin/deleteBloodGroupByAdmin/${a}`, {
          headers: { auth_token: e }
        })
      ).data;
    } catch (t) {
      throw t;
    }
  },
  v = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.delete(`/admin/deleteEmploymentTypeByAdmin/${a}`, {
          headers: { auth_token: e }
        })
      ).data;
    } catch (t) {
      throw t;
    }
  },
  x = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.post('/admin/previewSalarySlip', a, {
          headers: { auth_token: e }
        })
      ).data;
    } catch (t) {
      throw t;
    }
  },
  j = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.post('/admin/generateSalarySlip', a, {
          headers: { auth_token: e },
          responseType: 'blob'
        })
      ).data;
    } catch (t) {
      throw t;
    }
  },
  q = async () => {
    const a = localStorage.getItem('token');
    try {
      if (!a) throw 'Not authorized to access';
      return (
        await o('/admin/getallfeedbackattributesbyadmin', {
          headers: { auth_token: a }
        })
      ).data.data.feedbackAttributeResponse;
    } catch (e) {
      throw e;
    }
  },
  H = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.post('/admin/addfeedbackattributebyadmin', a, {
          headers: { auth_token: e }
        })
      ).data.data;
    } catch (t) {
      throw t;
    }
  },
  J = async (a, e) => {
    const t = localStorage.getItem('token');
    try {
      return (
        await o.put(
          '/admin/updatefeedbackattributebyadmin',
          { id: a, name: e },
          { headers: { auth_token: t } }
        )
      ).data;
    } catch (n) {
      throw n;
    }
  },
  K = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.delete(`/admin/deletefeedbackattributebyadmin/${a}`, {
          headers: { auth_token: e }
        })
      ).data;
    } catch (t) {
      throw t;
    }
  },
  O = async () => {
    const a = localStorage.getItem('token');
    try {
      if (!a) throw 'Not authorized to access';
      return (
        await o('/admin/getalldepartmentsbyadmin', {
          headers: { auth_token: a }
        })
      ).data.data.departments;
    } catch (e) {
      throw e;
    }
  },
  U = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.post('/admin/adddepartmentbyadmin', a, {
          headers: { auth_token: e }
        })
      ).data.data;
    } catch (t) {
      throw t;
    }
  },
  Q = async (a, e) => {
    const t = localStorage.getItem('token');
    try {
      return (
        await o.put(
          '/admin/updatedepartmentbyadmin',
          { _id: a, departmentName: e },
          { headers: { auth_token: t } }
        )
      ).data;
    } catch (n) {
      throw n;
    }
  },
  V = async a => {
    const e = localStorage.getItem('token');
    try {
      return (
        await o.delete(`/admin/deletedepartmentbyadmin/${a}`, {
          headers: { auth_token: e }
        })
      ).data;
    } catch (t) {
      throw t;
    }
  };
export {
  f as A,
  P as B,
  T as C,
  Y as D,
  R as E,
  z as F,
  L as G,
  F as H,
  v as I,
  H as J,
  J as K,
  K as L,
  U as M,
  Q as N,
  V as O,
  q as P,
  C as a,
  b,
  O as c,
  S as d,
  I as e,
  j as f,
  G as g,
  N as h,
  u as i,
  E as j,
  g as k,
  w as l,
  D as m,
  _ as n,
  $ as o,
  x as p,
  l as q,
  m as r,
  i as s,
  y as t,
  M as u,
  p as v,
  h as w,
  k as x,
  A as y,
  B as z
};
