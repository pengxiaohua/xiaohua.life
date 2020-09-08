import { createBlog, updateBlog, getBlogDetail } from './service';

const Model = {
  namespace: 'editBlog',
  state: {
    blogDetail: {},
  },
  effects: {
    *create({ payload }, { call }) {
      const res = yield call(createBlog, payload);
      return res;
    },

    *update({ payload }, { call }) {
      const res = yield call(updateBlog, payload);
      return res;
    },

    *blogDetail({ payload }, { call, put }) {
      const res = yield call(getBlogDetail, payload);
      yield put({
        type: 'queryDetail',
        payload: res || {},
      });
      return res;
    },
  },

  reducers: {
    queryDetail(state, action) {
      return {
        ...state,
        blogDetail: action.payload,
      };
    },
  },
};
export default Model;
