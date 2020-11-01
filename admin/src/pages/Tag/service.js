import request from '@/utils/request';

export async function queryTagList(params) {
  return request('/api/tags', {
    params,
  });
}
export async function removeTag(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/tagList', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'delete' },
  });
}
export async function addTag(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/tagList', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'post' },
  });
}
export async function updateTag(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/tagList', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'update' },
  });
}
