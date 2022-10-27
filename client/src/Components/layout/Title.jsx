const getStyles = () => ({
    title: {
        fontSize: 50,
        padding: '15px',
        width: '100%',
        textAlign: 'center',
        marginBottom: '50px',
        borderBottom: '3px solid rgb(206,206,206,0.2)',
    }
})

const Title = () => {
    const styles = getStyles()

    return <h1 style={styles.title}>PEOPLE AND THEIR CARS</h1>
}

export default Title