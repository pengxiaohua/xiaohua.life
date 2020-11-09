import { addTag, queryTagList, updateTag } from './service';

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
        type: 'save',
        payload: response,
      });
    },

    *update({ payload }, { call, put }) {
      const res = yield call(updateTag, payload);
      if (res) {
        yield put({
          type: 'fetch',
          payload: {
            offset: 0,
            limit: 10,
          },
        });
      }
    },

    *add({ payload }, { call, put }) {
      const res = yield call(addTag, payload);
      if (res) {
        yield put({
          type: 'save',
          payload: res,
        });
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
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
