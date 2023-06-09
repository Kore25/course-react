import PropTypes from 'prop-types';

export const FirstApp = function ({ title, subtitle, name }) {

    return (
        <>
            <h1 data-testid="test-title">{title}</h1>
            {/* <code>{ JSON.stringify(newMessage) }</code> */}
            <p>{subtitle}</p>
            <p>{subtitle}</p>
            <p>{name}</p>
        </>
    )
}

FirstApp.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
}

FirstApp.defaultProps = {
    // title: 'No hay titulo',
    subtitle: 'No hay subtitulo',
    name: 'Luis Carlos'
}