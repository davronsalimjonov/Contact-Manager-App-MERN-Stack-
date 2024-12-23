import { useState } from 'react';
import { StarsRating } from 'stars-rating-react-hooks';

const Rater = ({
    count = 5,
    defaultValue = 0,
    isDisabled = false,
    onRate
}) => {
    const [value, setValue] = useState(defaultValue)

    const config = {
        totalStars: count,
        initialSelectedValue: defaultValue,
        value: value,
        renderFull: (
            <img src="/images/full-star.svg" />
        ),
        renderEmpty: (
            <img src="/images/empty-star.svg" />
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