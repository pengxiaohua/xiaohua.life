import React, { useEffect } from 'react';
import {
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Col, List, Row, Tag } from 'antd';
import { router } from 'umi';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import styles from './style.less';

const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const ListContent = ({ data: { createdTime, updatedTime, status } }) => {
  const blogStusList = {
    0: {
      color: 'error',
      icon: <CloseCircleOutlined />,
      text: '已删除',
    },
    1: {
      color: 'success',
      icon: <CheckCircleOutlined />,
      text: '已发布',
    },
    2: {
      color: 'processing',
      icon: <ClockCircleOutlined />,
      text: '存草稿',
    },
  };
  return (
    <div className={styles.listContent}>
      <div className={styles.listContentItem}>
        <span>创建时间</span>
        <p>{moment(createdTime).format('YYYY-MM-DD HH:mm:ss')}</p>
      </div>
      <div className={styles.listContentItem}>
        <span>最后修改</span>
        <p>{moment(updatedTime).format('YYYY-MM-DD HH:mm:ss')}</p>
      </div>
      <div className={styles.listContentItem}>
        <span>当前状态</span>
        <p>
          <Tag
            style={{ margin: 0 }}
            icon={blogStusList[status].icon}
            color={blogStusList[status].color}
          >
            {blogStusList[status].text}
          </Tag>
        </p>
      </div>
    </div>
  );
};

export const BlogList = props => {
  const {
    loading,
    dispatch,
    blogList: { blogList, totalCount },
  } = props;

  useEffect(() => {
    dispatch({
      type: 'blogList/fetch',
      payload: {
        offset: 0,
        limit: 10,
      },
    });
  }, [1]);
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    totalCount,
  };

  const deleteItem = id => {
    dispatch({
      type: 'blogList/delete',
      payload: {
        id,
      },
    });
  };

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的待办" value="8个任务" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周任务平均处理时间" value="32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="24个任务" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="基本列表"
            style={{
              marginTop: 24,
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px',
            }}
          >
            <Button
              type="dashed"
              style={{
                width: '100%',
                marginBottom: 8,
              }}
              onClick={() => router.push('/blogs/edit')}
            >
              <PlusOutlined />
              添加
            </Button>

            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={blogList}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a key="edit" onClick={() => router.push(`/blogs/edit?id=${item.id}`)}>
                      编辑
                    </a>,
                    <a key="delete" onClick={deleteItem(item.id)}>
                      删除
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.content}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    </div>
  );
};
export default connect(({ blogList, loading }) => ({
  blogList,
  loading: loading.models.blogList,
}))(BlogList);
