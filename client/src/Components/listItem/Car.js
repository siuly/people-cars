import { useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import RemovePerson from "../buttons/RemovePerson";
import UpdateCar from "../Forms/UpdateCar";
import RemoveCar from "../buttons/RemoveCar";

const getStyles = () => ({
    card: {
        width: '500px'
    }
})
const Car = props => {
    const { id, year, make, model, price, personId } = props
    const styles = getStyles()

    const [editMode, setEditMode] = useState(false)

    const handleButtonClick = () => setEditMode(!editMode)

    return (
        <>
            {editMode ? (
                <UpdateCar
                    id={id}
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    personId={personId}
                    onButtonClick={handleButtonClick}
                />
            ) : (
                <Card
                    style={styles.card}
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemoveCar id={id} />
                    ]}
                >
                    {year} {make} {model} {price} {personId}
                </Card>
            )}
        </>
    )
}

export default Car