import { useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../Forms/UpdatePerson";
import Cars from "../list/Cars";

import { Link } from 'react-router-dom';

const getStyles = () => ({
    card: {
        width: '500px'
    }
})
const Person = props => {
    const { id, firstName, lastName } = props
    const styles = getStyles()

    const [editMode, setEditMode] = useState(false)

    const handleButtonClick = () => setEditMode(!editMode)

    return (
        <>
            {editMode ? (
                <UpdatePerson
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    onButtonClick={handleButtonClick}
                />
            ) : (
                <Card
                    style={styles.card}
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemovePerson id={id} />
                    ]}
                >
                    {firstName} {lastName}

                    <Cars checkID={id}/>

                    <Link to={`/person/${id}`}>LEARN MORE</Link>
                </Card>
            )}
        </>
    )
}

export default Person