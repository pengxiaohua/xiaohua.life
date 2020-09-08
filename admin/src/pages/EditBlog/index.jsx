import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { Button, Input, message } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import styles from './style.less'
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { router } from 'umi';

export const EditBlog = props => {
  const { dispatch } = props;

  const editorRef = useRef(null);

  const editId = props.location.query.id || 0;

  const [blogTitle, setTitle] = useState('');
  const [blogContent, setContent] = useState('');
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const res = await dispatch({
        type: 'editBlog/blogDetail',
        payload: editId,
      });
      setTitle(res.title);
      setContent(res.content);
      setBlogId(editId);
      // 设置blog内容
      editorRef.current.editorInst.setMarkdown(res.content);
    };
    getDetail();
  }, [editId]);

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
    <PageHeaderWrapper>
      <div>
        <Input allowClear size="large" value={blogTitle} onChange={handleChangeTitle} />
        <Editor
          placeholder="Write Your Story!"
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut
          events={{ change: handleChangeContent }}
          ref={editorRef}
        />
        <Button type="primary" onClick={holdBlog} style={{ marginRight: 10 }}>
          存为草稿
        </Button>
        <Button onClick={pushBlog}>发布文章</Button>
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(({ editBlog, loading }) => ({
  blogDetail: editBlog.blogDetail,
  loading: loading.models.editBlog,
}))(EditBlog);
