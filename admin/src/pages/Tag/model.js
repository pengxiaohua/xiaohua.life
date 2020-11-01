import { addTag, queryTagList, removeTag, updateTag } from './service';

const Model = {
  namespace: 'tagList',
  state: {
    tagList: [],
    totalCount: 0,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTagList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryTagList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *submit({ payload }, { call, put }) {
      let callback;

      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeTag : updateTag;
      } else {
        callback = addTag;
      }

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, ...action.payload };
    },

    appendList(
      state = {
        list: [],
      },
      action,
    ) {
      return { ...state, list: state.list.concat(action.payload) };
    },
  },
};
export default Model;
