const Image = ({ alt, src, rotation='', style = {}, ...props }) => {
    if (!src) return null;

    if (rotation) {
        style.transform = `rotate(${rotation}deg)`;
    }

    return <img alt='' src={src} style={style} {...props} />;
};

export default Image;
