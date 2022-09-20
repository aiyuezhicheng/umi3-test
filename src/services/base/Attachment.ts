// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 修改附件 PUT /BaseService/api/v1/Attachment */
export async function putAttachment(body: API.IMAttachment, options?: { [key: string]: any }) {
  return request<API.BooleanAPIResult>('/BaseService/api/v1/Attachment', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建附件 POST /BaseService/api/v1/Attachment */
export async function postAttachment(body: API.IMAttachment, options?: { [key: string]: any }) {
  return request<API.GuidAPIResult>('/BaseService/api/v1/Attachment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 得到附件 GET /BaseService/api/v1/Attachment/${param0} */
export async function getAttachmentId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAttachmentIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IMAttachmentAPIResult>(`/BaseService/api/v1/Attachment/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除附件 DELETE /BaseService/api/v1/Attachment/${param0} */
export async function deleteAttachmentId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAttachmentIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BooleanAPIResult>(`/BaseService/api/v1/Attachment/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 下载附件 GET /BaseService/api/v1/Attachment/download/${param0} */
export async function getAttachmentDownloadAttachmentID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAttachmentDownloadAttachmentIDParams,
  options?: { [key: string]: any },
) {
  const { attachmentID: param0, ...queryParams } = params;
  return request<API.IMAttachmentContentAPIResult>(
    `/BaseService/api/v1/Attachment/download/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 得到所有附件 GET /BaseService/api/v1/Attachment/list */
export async function getAttachmentList(options?: { [key: string]: any }) {
  return request<API.IMAttachmentListAPIResult>('/BaseService/api/v1/Attachment/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 得到附件（根据名字） GET /BaseService/api/v1/Attachment/name/${param0} */
export async function getAttachmentNameName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAttachmentNameNameParams,
  options?: { [key: string]: any },
) {
  const { name: param0, ...queryParams } = params;
  return request<API.IMAttachmentAPIResult>(`/BaseService/api/v1/Attachment/name/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 上载附件 PUT /BaseService/api/v1/Attachment/Upload/${param0}/${param1} */
export async function putAttachmentUploadIdUrl(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putAttachmentUploadIdUrlParams,
  options?: { [key: string]: any },
) {
  const { id: param0, url: param1, ...queryParams } = params;
  return request<API.BooleanAPIResult>(
    `/BaseService/api/v1/Attachment/Upload/${param0}/${param1}`,
    {
      method: 'PUT',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 验证附件 PUT /BaseService/api/v1/Attachment/validate */
export async function putAttachmentValidate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putAttachmentValidateParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/BaseService/api/v1/Attachment/validate', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
