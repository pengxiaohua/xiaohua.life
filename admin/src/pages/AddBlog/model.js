import { createBlog, updateBlog, getBlogDetail } from './service';

const Model = {
  namespace: 'editBlog',
  state: {},
  effects: {
    *create({ payload }, { call }) {
      const res = yield call(createBlog, payload);
      return res;
    },

    *update({ payload }, { call }) {
      const res = yield call(updateBlog, payload);
      return res;
    },

    *blogDetail({ payload }, { call }) {
      const res = yield call(getBlogDetail, payload);
      return res;
    },
  },

  reducers: {
    queryList(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
export default Model;
