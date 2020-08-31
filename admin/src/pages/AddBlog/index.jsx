import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { Button, Input, message } from 'antd';
import { connect } from 'dva';
// import styles from './style.less'
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { router } from 'umi';

export const BlogList = props => {
  const {
    // loading,
    dispatch,
  } = props;

  const editorRef = useRef(null);

  const [blogTitle, setTitle] = useState('');
  const [blogContent, setContent] = useState('');
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    const editId = props.location.query.id;
    if (editId) {
      dispatch({
        type: 'editBlog/blogDetail',
        payload: editId,
      }).then(res => {
        if (res) {
          setTitle(res.title);
          setContent(res.content);
        }
      });
    }
  }, [1]);

  // 保存blog为草稿
  const holdBlog = () => {
    if (!blogId) {
      dispatch({
        type: 'editBlog/create',
        payload: {
          title: blogTitle,
          content: blogContent,
          tags: '',
          status: 2,
        },
      }).then(res => {
        if (res) {
          setBlogId(res);
          message.success('更新成功！');
        }
      });
    } else {
      dispatch({
        type: 'editBlog/update',
        payload: {
          id: blogId,
          title: blogTitle,
          content: blogContent,
          tags: '',
          status: 2,
        },
      }).then(res => {
        if (res) {
          message.success('更新成功！');
        }
      });
    }
  };

  // 发布blog
  const pushBlog = () => {
    const data = {
      title: blogTitle,
      content: blogContent,
      tags: '',
      status: 1,
    };
    if (blogId) {
      data.id = blogId;
    }
    dispatch({
      type: blogId ? 'editBlog/update' : 'editBlog/create',
      payload: data,
    }).then(res => {
      if (res) {
        router.push('/blogs');
      }
    });
  };

  const handleChangeTitle = e => {
    const currentTitle = e.target.value;
    setTitle(currentTitle);
  };

  // 获取实时content
  const handleChangeContent = () => {
    const content = editorRef.current.editorInst.getMarkdown();
    setContent(content);
  };

  return (
    <div>
      <Input allowClear size="large" defaultValue={blogTitle} onChange={handleChangeTitle} />
      <Editor
        placeholder="Write Your Story!"
        previewStyle="vertical"
        height="650px"
        initialEditType="markdown"
        useCommandShortcut
        initialValue={blogContent}
        events={{ change: handleChangeContent }}
        ref={editorRef}
      />
      <Button onClick={holdBlog}>存为草稿</Button>
      <Button onClick={pushBlog}>发布文章</Button>
    </div>
  );
};
export default connect(({ editBlog, loading }) => ({
  editBlog,
  loading: loading.models.editBlog,
}))(BlogList);
