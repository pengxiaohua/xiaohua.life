import request from '@/utils/request';

export async function createBlog(params) {
  return request('/api/blogs/create', {
    method: 'POST',
    data: params,
  });
}

export async function updateBlog(params) {
  return request('/api/blogs/update', {
    method: 'POST',
    data: params,
  });
}

export async function getBlogDetail(id) {
  return request(`/api/blogs/${id}`);
}
