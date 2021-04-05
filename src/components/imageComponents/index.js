
const Image = ({ alt, ...props }) => {
    if (!props.src) return null;

    return <img alt='' {...props} />;
};

export default Image;
