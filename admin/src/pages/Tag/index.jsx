import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import dayjs from 'dayjs';

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      // console.error('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export const TagList = props => {
  const {
    // loading,
    dispatch,
    tagList: { tagList, totalCount },
  } = props;

  useEffect(() => {
    dispatch({
      type: 'tagList/fetch',
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

  // TODO: delete
  const handleDelete = key => {
    console.log(key);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '标签名',
      dataIndex: 'title',
      editable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '修改时间',
      dataIndex: 'createdTime',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) =>
        tagList.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];

  // TODO: delete
  const handleAdd = () => {
    // const newData = {
    //   key: totalCount,
    //   name: `Edward King ${totalCount}`,
    //   age: 32,
    //   address: `London, Park Lane no. ${totalCount}`,
    // };
    // this.setState({
    //   dataSource: [...dataSource, newData],
    //   totalCount: totalCount + 1,
    // });
  };

  const handleSave = row => {
    const newData = tagList;
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    // this.setState({
    //   dataSource: newData,
    // });
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const newColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <PageHeaderWrapper>
      <div>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          新增Tag
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          rowKey="id"
          pagination={paginationProps}
          dataSource={tagList}
          columns={newColumns}
        />
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(({ tagList, loading }) => ({
  tagList,
  loading: loading.models.tagList,
}))(TagList);
