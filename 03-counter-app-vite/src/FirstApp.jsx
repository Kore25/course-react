import PropTypes from 'prop-types';

export const FirstApp = function ({ title, subtitle }) {

    return (
        <>
            <h1>{title}</h1>
            {/* <code>{ JSON.stringify(newMessage) }</code> */}
            <p>{subtitle}</p>
        </>
    )
}

FirstApp.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
}

FirstApp.defaultProps = {
    title: 'No hay titulo',
    subtitle: 'No hay subtitulo'
}