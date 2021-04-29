const Image = ({ alt, src, rotation, style = {}, ...props }) => {
    if (!src) return null;

    switch (rotation) {
        case '90':
            style.transform = 'rotate(90deg)';
            break;
        case '180':
            style.transform = 'rotate(180deg)';
            break;
        case '270':
            style.transform = 'rotate(270deg)';
            break;

        default:
    }

    return <img alt='' src={src} style={style} {...props} />;
};

export default Image;
