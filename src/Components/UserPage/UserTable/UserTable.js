import React, { Component } from 'react';
import { Table, Tag, Button } from 'antd';

const { Column, ColumnGroup } = Table;

const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        role: 'Quản lý',
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        role: 'Quản lý',
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        role: 'Vận hành',
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

class UserTable extends Component {
    render() {
        return (
            <div>
            <Table dataSource={data}>
                <ColumnGroup title="Name">
                    <Column title="First Name" dataIndex="firstName" key="firstName" />
                    <Column title="Last Name" dataIndex="lastName" key="lastName" />
                </ColumnGroup>
                <Column title="Role" dataIndex="role" key="role" />
                <Column title="Address" dataIndex="address" key="address" />
                <Column
                    title="Tags"
                    dataIndex="tags"
                    key="tags"
                    render={tags => (
                        <span>
                            {tags.map(tag => (
                                <Tag color="blue" key={tag}>
                                    {tag}
                                </Tag>
                            ))}
                        </span>
                    )}
                />
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <span>
                            {/* <a style={{ marginRight: 16 }} href="#"> Invite {record.lastName}</a>
                            <a href="#"> Delete</a> */}
                            <Button type="link" >
                                Edit
                            </Button>
                            <Button type="link" danger>
                                Delete
                            </Button>
                        </span>
                    )}
                />
            </Table>
            </div>
        );
    }
}

export default UserTable;