import { useState } from 'react';
import { StarsRating } from 'stars-rating-react-hooks';

const Rater = ({
    count = 5,
    defaultValue = 0,
    isDisabled = false,
    onRate,
    width="25px",
    height="25px"
}) => {
    const [value, setValue] = useState(defaultValue)

    const config = {
        totalStars: count,
        initialSelectedValue: defaultValue,
        value: value,
        renderFull: (
            <img
                src="/images/full-star.svg"
                style={{
                    width: width,
                    height: height,
                    transition: "transform 0.3s ease, filter 0.3s ease",
                    cursor: "pointer"
                }}
            />
        ),
        renderEmpty: (
            <img
                src="/images/empty-star.svg"
                style={{
                    width: width,
                    height: height,
                    transition: "transform 0.3s ease, filter 0.3s ease",
                    cursor: "pointer"
                }}
            />
        ),
    };

    const handleStarsRated = (value) => {
        setValue(value)
        typeof onRate === 'function' && onRate(value)
    }

    return (
        <StarsRating
            config={config}
            isDisabled={isDisabled}
            onStarsRated={handleStarsRated}
        />
    );
}

export default Rater;