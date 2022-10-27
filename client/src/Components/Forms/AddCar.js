import { useEffect, useState } from 'react'
import {useMutation, useQuery} from '@apollo/client'
import {Button, Form, Input, Select} from 'antd'
import { v4 as uuidv4 } from 'uuid'
import {ADD_CAR, GET_CARS, GET_PEOPLE} from '../../queries'
const { Option } = Select;

const AddCar = () => {
    const [addCar] = useMutation(ADD_CAR)
    const [people, setPeople] = useState([])
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const { data } = useQuery(GET_PEOPLE);

    useEffect(() => {
        forceUpdate({})
    }, [])


    const onFinish = values => {
        const {
            year,
            make,
            model,
            price
        } = values

        addCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId: people,
            },
            update: (cache, { data:  addCar  }) => {
                const dataNew = cache.readQuery({ query: GET_CARS })
                cache.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...data,
                        cars: [...data.cars, addCar]
                    }
                })
            }
        })
        form.resetFields();
        setId(uuidv4());
    }

    return (
        <>
            <div>
                <h2>
                    Add Car
                </h2>
            </div>
            <Form
                form={form}
                name='add-car-form'
                layout='inline'
                onFinish={onFinish}
                size='large'
                style={{ marginBottom: '40px' }}
            >
                <Form.Item
                    label={'Year:'}
                    name='year'
                    min={1900}
                    rules={[{ required: true, message: 'Please input the year!' }]}
                >
                    <InputNumber placeholder='Year' />
                </Form.Item>
                <Form.Item
                    label={'Make:'}
                    name='Make'
                    rules={[{ required: true, message: 'Please input the make!' }]}
                >
                    <Input placeholder='Make' />
                </Form.Item>
                <Form.Item
                    label={'Model:'}
                    name='Model'
                    rules={[{ required: true, message: 'Please input the model!' }]}
                >
                    <Input placeholder='Make' />
                </Form.Item>
                <Form.Item
                    min={0}
                    label={'Price:'}
                    name='Price'
                    type={'currency'}
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <InputNumber  />
                </Form.Item>
                <Form.Item
                    label={'Person:'}
                    name='person'
                    rules={[{ required: true, message: 'Please select a person!' }]}
                >
                    <Select
                        showSearch
                        placeholder={'Select a person'}
                        onChange={(id => setPeople(id))}
                    >
                        {data?.people?.map(person => (
                            <Option key={person.id} value={person.id}>{person.firstName} {person.lastName}</Option>
                        ))}
                    </Select>

                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                !form.isFieldsTouched(true) ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Add Car
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </>
    )
}

export default AddCar
