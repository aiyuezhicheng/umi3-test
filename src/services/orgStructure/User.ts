// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 修改用户 PUT /OrgStructureService/api/v1/User */
export async function putUser(body: API.IMUser, options?: { [key: string]: any }) {
  return request<boolean>('/OrgStructureService/api/v1/User', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建用户 POST /OrgStructureService/api/v1/User */
export async function postUser(body: API.IMUser, options?: { [key: string]: any }) {
  return request<string>('/OrgStructureService/api/v1/User', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到用户（根据ID） GET /OrgStructureService/api/v1/User/${param0} */
export async function getUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IMUser>(`/OrgStructureService/api/v1/User/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除用户 DELETE /OrgStructureService/api/v1/User/${param0} */
export async function deleteUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/OrgStructureService/api/v1/User/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到属于指定岗位的所有用户基本信息 GET /OrgStructureService/api/v1/User/baseInfo/post/${param0} */
export async function getUserBaseInfoPostPostIDs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserBaseInfoPostPostIDsParams,
  options?: { [key: string]: any },
) {
  const { postIDs: param0, ...queryParams } = params;
  return request<Record<string, any>[]>(
    `/OrgStructureService/api/v1/User/baseInfo/post/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 得到属于指定业务范畴的所有用户 GET /OrgStructureService/api/v1/User/businessDimension/${param0} */
export async function getUserBusinessDimensionBusinessDimensionID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserBusinessDimensionBusinessDimensionIDParams,
  options?: { [key: string]: any },
) {
  const { businessDimensionID: param0, ...queryParams } = params;
  return request<API.IMUser[]>(`/OrgStructureService/api/v1/User/businessDimension/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到直接儿子用户 GET /OrgStructureService/api/v1/User/child/${param0} */
export async function getUserChildParentID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserChildParentIDParams,
  options?: { [key: string]: any },
) {
  const { parentID: param0, ...queryParams } = params;
  return request<API.IMUser[]>(`/OrgStructureService/api/v1/User/child/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据登录名获取用户ID GET /OrgStructureService/api/v1/User/id/${param0} */
export async function getUserIdLoginName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserIdLoginNameParams,
  options?: { [key: string]: any },
) {
  const { loginName: param0, ...queryParams } = params;
  return request<string>(`/OrgStructureService/api/v1/User/id/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量导入 POST /OrgStructureService/api/v1/User/Import */
export async function postUserImport(body: API.IMUser[], options?: { [key: string]: any }) {
  return request<API.StringMutilAPIResult>('/OrgStructureService/api/v1/User/Import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设置用户是否停用 PUT /OrgStructureService/api/v1/User/isStop/${param0}/${param1} */
export async function putUserIsStopIdState(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putUserIsStopIdStateParams,
  options?: { [key: string]: any },
) {
  const { id: param0, state: param1, ...queryParams } = params;
  return request<boolean>(`/OrgStructureService/api/v1/User/isStop/${param0}/${param1}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到所有用户 GET /OrgStructureService/api/v1/User/list */
export async function getUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserListParams,
  options?: { [key: string]: any },
) {
  return request<API.IMUser[]>('/OrgStructureService/api/v1/User/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 批量删除用户 DELETE /OrgStructureService/api/v1/User/list */
export async function deleteUserList(body: string[], options?: { [key: string]: any }) {
  return request<API.StringMutilAPIResult>('/OrgStructureService/api/v1/User/list', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到用户（根据名字） GET /OrgStructureService/api/v1/User/name/${param0}/${param1} */
export async function getUserNameParentIDName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserNameParentIDNameParams,
  options?: { [key: string]: any },
) {
  const { parentID: param0, name: param1, ...queryParams } = params;
  return request<API.IMUser>(`/OrgStructureService/api/v1/User/name/${param0}/${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到属于指定组织单元（包括子孙）的所有用户 GET /OrgStructureService/api/v1/User/orgUnit/${param0} */
export async function getUserOrgUnitOrgUnitID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserOrgUnitOrgUnitIDParams,
  options?: { [key: string]: any },
) {
  const { orgUnitID: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/OrgStructureService/api/v1/User/orgUnit/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到属于指定组织单元的所有用户 GET /OrgStructureService/api/v1/User/orgUnit/${param0}/${param1} */
export async function getUserOrgUnitOrgUnitIDWithRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserOrgUnitOrgUnitIDWithRolesParams,
  options?: { [key: string]: any },
) {
  const { orgUnitID: param0, withRoles: param1, ...queryParams } = params;
  return request<API.IMUser[]>(`/OrgStructureService/api/v1/User/orgUnit/${param0}/${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到属于指定岗位的所有用户 GET /OrgStructureService/api/v1/User/post/${param0} */
export async function getUserPostPostID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserPostPostIDParams,
  options?: { [key: string]: any },
) {
  const { postID: param0, ...queryParams } = params;
  return request<API.IMUser[]>(`/OrgStructureService/api/v1/User/post/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 得到用户所有角色 GET /OrgStructureService/api/v1/User/role/${param0} */
export async function getUserRoleId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserRoleIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IMRole[]>(`/OrgStructureService/api/v1/User/role/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改用户角色 PUT /OrgStructureService/api/v1/User/role/${param0} */
export async function putUserRoleId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putUserRoleIdParams,
  body: API.IMRole[],
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/OrgStructureService/api/v1/User/role/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 得到用户树 GET /OrgStructureService/api/v1/User/tree */
export async function getUserTree(options?: { [key: string]: any }) {
  return request<API.IMTreeNode[]>('/OrgStructureService/api/v1/User/tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 得到用户树 GET /OrgStructureService/api/v1/User/tree/baseInfo */
export async function getUserTreeBaseInfo(options?: { [key: string]: any }) {
  return request<API.IMTreeNodeUser[]>('/OrgStructureService/api/v1/User/tree/baseInfo', {
    method: 'GET',
    ...(options || {}),
  });
}
