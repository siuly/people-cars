import Title from '../Components/layout/Title'
import AddPerson from '../Components/Forms/AddPerson'
import People from '../Components/list/People'
import AddCar from "../Components/Forms/AddCar";

const HomePage = () => {
    return (
        <div className='App'>
            <Title/>
            <AddPerson/>
            <AddCar/>
            <People/>
        </div>

    )
}

export default HomePage