// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 修改组织单元 PUT /OrgStructureService/api/v1/OrgUnit */
export async function putOrgUnit(body: API.IMOrgUnit, options?: { [key: string]: any }) {
  return request<boolean>('/OrgStructureService/api/v1/OrgUnit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建组织单元 POST /OrgStructureService/api/v1/OrgUnit */
export async function postOrgUnit(body: API.IMOrgUnit, options?: { [key: string]: any }) {
  return request<string>('/OrgStructureService/api/v1/OrgUnit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到组织单元 GET /OrgStructureService/api/v1/OrgUnit/${param0} */
export async function getOrgUnitId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrgUnitIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IMOrgUnit>(`/OrgStructureService/api/v1/OrgUnit/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除组织单元 DELETE /OrgStructureService/api/v1/OrgUnit/${param0} */
export async function deleteOrgUnitId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteOrgUnitIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/OrgStructureService/api/v1/OrgUnit/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到直接儿子组织单元 GET /OrgStructureService/api/v1/OrgUnit/child/${param0} */
export async function getOrgUnitChildParentID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrgUnitChildParentIDParams,
  options?: { [key: string]: any },
) {
  const { parentID: param0, ...queryParams } = params;
  return request<API.IMOrgUnit[]>(`/OrgStructureService/api/v1/OrgUnit/child/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到组织单元下的排班表 POST /OrgStructureService/api/v1/OrgUnit/DutyRoster */
export async function postOrgUnitDutyRoster(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postOrgUnitDutyRosterParams,
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.IMDutyRoster[]>('/OrgStructureService/api/v1/OrgUnit/DutyRoster', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 按照ID列表 得到多个组织单元 内部不验证参数的有效性 POST /OrgStructureService/api/v1/OrgUnit/idList */
export async function postOrgUnitIdList(body: string[], options?: { [key: string]: any }) {
  return request<API.IMOrgUnit[]>('/OrgStructureService/api/v1/OrgUnit/idList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到所有组织单元 GET /OrgStructureService/api/v1/OrgUnit/list */
export async function getOrgUnitList(options?: { [key: string]: any }) {
  return request<API.IMOrgUnit[]>('/OrgStructureService/api/v1/OrgUnit/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 得到组织单元（根据名字） GET /OrgStructureService/api/v1/OrgUnit/name/${param0}/${param1} */
export async function getOrgUnitNameParentIDName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrgUnitNameParentIDNameParams,
  options?: { [key: string]: any },
) {
  const { parentID: param0, name: param1, ...queryParams } = params;
  return request<API.IMOrgUnit>(`/OrgStructureService/api/v1/OrgUnit/name/${param0}/${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到组织单元分配的轮班 GET /OrgStructureService/api/v1/OrgUnit/shift/${param0} */
export async function getOrgUnitShiftId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrgUnitShiftIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IMOUShift[]>(`/OrgStructureService/api/v1/OrgUnit/shift/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到组织单元树 GET /OrgStructureService/api/v1/OrgUnit/tree */
export async function getOrgUnitTree(options?: { [key: string]: any }) {
  return request<API.IMTreeNode[]>('/OrgStructureService/api/v1/OrgUnit/tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 验证组织单元 PUT /OrgStructureService/api/v1/OrgUnit/validate */
export async function putOrgUnitValidate(body: API.IMOrgUnit, options?: { [key: string]: any }) {
  return request<boolean>('/OrgStructureService/api/v1/OrgUnit/validate', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
