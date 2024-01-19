import PropTypes from 'prop-types'

const MainContainer = ({ children }) => {
    return (
        <main className="main">
            {children}
        </main>
    )
}

MainContainer.propTypes = {
    children: PropTypes.any
}

export default MainContainer