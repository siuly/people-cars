import{Card}from'antd'
import{useParams}from'react-router-dom';
import{Link}from'react-router-dom';
import{useQuery}from"@apollo/client";
import{GET_PERSON_W_CARS}from"../../queries";

const getStyles=()=>({
    card: {
        width: '500px'
    }
})

const PersonWCars = props =>{
    const styles=getStyles()
    const{id}=useParams();
    const{loading,error,data }=useQuery(GET_PERSON_W_CARS,{
        variables: {personId: id}
    });

    const person = data?.personWCars

    if(loading)return'Loading...'
    if(error)return`Error! ${error.message}`
    console.log('Check here: ',data)


    return(
        <>
            <Card
                title={`${person?.firstName}${person?.lastName}`}
                style={styles.card}
            >
                {person?.cars?.map(({id,year,make,model,price })=>{
                    return<Card  title={`${year}${make}${model}-> ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}`}/>
                })}

            </Card>
        </>
    )
}

export default PersonWCars
