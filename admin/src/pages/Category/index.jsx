import React, { useState, useCallback, useRef } from 'react';
import { Table, Button } from 'antd';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const RNDContext = createDndContext(HTML5Backend);

const type = 'DragableBodyRow';

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const columns = [
  {
    title: '分类名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '分类字段名',
    dataIndex: 'enName',
    key: 'enName',
  },
  {
    title: 'Blog数量',
    dataIndex: 'blogNumber',
    key: 'blogNumber',
  },
  {
    title: '操作',
    key: 'action',
    render: () => {
      return (
        <div>
          <a>删除</a>
          <a>编辑</a>
        </div>
      );
    },
  },
];

const DragSortingTable = () => {
  const [data, setData] = useState([]);

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [data],
  );

  const manager = useRef(RNDContext);

  return (
    <PageHeaderWrapper>
      <DndProvider manager={manager.current.dragDropManager}>
        <Button type="primary" className={styles.addBtn}>
          新增分类
        </Button>
        <Table
          columns={columns}
          dataSource={data}
          components={components}
          onRow={(record, index) => ({
            index,
            moveRow,
          })}
        />
      </DndProvider>
    </PageHeaderWrapper>
  );
};

export default connect(({ blogList, loading }) => ({
  blogList,
  loading: loading.models.blogList,
}))(DragSortingTable);
