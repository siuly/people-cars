import {useMutation, useQuery} from '@apollo/client'
import {Button, Form, Input, Select} from 'antd'
import { useEffect, useState } from 'react'
import {GET_PEOPLE, UPDATE_CAR} from '../../queries'
const { Option } = Select;

const UpdateCar = props => {
    const { id, year, make, model, price, personId } = props
    const [updateCar] = useMutation(UPDATE_CAR)
    const [changedPersonId, setChangedPersonId] = useState(personId)
    const{ data }=useQuery(GET_PEOPLE)
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        const { year, make,model,price } = values

        updateCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId: changedPersonId
            }
        })

        props.onButtonClick()
    }

    return (
        <Form
            form={form}
            name='update-car-form'
            layout='inline'
            onFinish={onFinish}
            initialValues={{
                year: year,
                make: make,
                model: model,
                price: price,
                personId: data.people.find(person => person.id === personId).id,
            }}
        >
            <Form.Item
                    label={'Year:'}
                    name='year'
                    rules={[{ required: true, message: 'Please input the year!' }]}
                >
                    <Input placeholder='Year' />
                </Form.Item>
                <Form.Item
                    label={'Make:'}
                    name='make'
                    rules={[{ required: true, message: 'Please input the make!' }]}
                >
                    <Input placeholder='Make' />
                </Form.Item>
                <Form.Item
                    label={'Model:'}
                    name='model'
                    rules={[{ required: true, message: 'Please input the model!' }]}
                >
                    <Input placeholder='Make' />
                </Form.Item>
                <Form.Item
                    label={'Price:'}
                    name='price'
                    type={'currency'}
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <Input  />
                </Form.Item>
                <Form.Item
                    label={'Person:'}
                    name='personId'
                    rules={[{ required: true, message: 'Please select a person!' }]}
                >
                    <select
                        placeholder={'Select a person'}
                        onChange={(id => setChangedPersonId(id))}
                    >
                        {data?.people?.map(person => (
                            <option value={person.id}>{person.firstName} {person.lastName}</option>
                        ))
                        }
                    </select>

                </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            (!form.isFieldTouched('year') && !form.isFieldTouched('make')) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Car
                    </Button>
                )}
            </Form.Item>
            <Button type='danger' onClick={props.onButtonClick}>
                Cancel
            </Button>
        </Form>

    )
}

export default UpdateCar