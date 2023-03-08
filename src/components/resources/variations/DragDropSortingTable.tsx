import { useEffect, useRef } from 'react'
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

interface DataType {
  id: number;
  title: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Id',
    dataIndex: 'id',
  },
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = (props: RowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

const DragDropSortingTable = (
    props: {
        dataSource: any,
        loading: boolean,
        onOrderChange: (order: number[]) => void
    }
) => {
    const [dataSource, setDataSource] = useState(props.dataSource)
    const originalOrder = useRef([])
    const isLoading = useRef(props.loading)

    useEffect(()=>{
        if(!isLoading.current && props.loading){
            originalOrder.current = props.dataSource.map(item => item.id)
        }
    },[props.loading])

    useEffect(()=>{
        setDataSource(props.dataSource)
    },[props.dataSource])

    if(!dataSource) return <></>

        const onDragEnd = ({ active, over }: DragEndEvent) => {
            if (active.id !== over?.id) {
                setDataSource((prev) => {
                    const activeIndex = prev.findIndex((i) => i.id === active.id);
                    const overIndex = prev.findIndex((i) => i.id === over?.id);
                    const newDataSource = arrayMove(prev, activeIndex, overIndex);
                    const order = newDataSource.map(item => item.id)
                    let isNewOrder = false
                    for(let i=0; i<originalOrder.current.length; i++){
                        if(originalOrder.current[i] !== order[i]){
                            isNewOrder = true
                            break;
                        }
                    }
                    if(isNewOrder){
                        props.onOrderChange(order)
                    }
                    return newDataSource
                });
            }
        };

    return (
        <DndContext onDragEnd={onDragEnd}>
            <SortableContext
                items={dataSource.map((i) => i.id)}
                strategy={verticalListSortingStrategy}
            >
            <Table
                components={{
                    body: {
                        row: Row,
                    },
                }}
                rowKey="id"
                columns={columns}
                dataSource={dataSource}
            />
            </SortableContext>
        </DndContext>
    );
};

export default DragDropSortingTable;

