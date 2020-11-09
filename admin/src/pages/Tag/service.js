import request from '@/utils/request';

export async function queryTagList(params) {
  return request('/api/tags', {
    params,
  });
}

export async function removeTag(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/tags/delete', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'delete' },
  });
}

export async function addTag(params) {
  return request('/api/tags/create', {
    method: 'POST',
    data: params,
  });
}

export async function updateTag(params) {
  return request('/api/tags/update', {
    method: 'POST',
    data: params,
  });
}
