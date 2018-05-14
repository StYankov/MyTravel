import React from 'react';
import { View } from 'react-native';

import StarRatings from 'react-native-star-rating';

const Ratings = ({ rating }) => (
    <View style={{ flex: 1 }}>
        <StarRatings
            disabled
            selectedStar={() => undefined}
            halfStarEnabled
            starSize={35}
            rating={rating}
            starColor="#f1c40f"
        />
    </View>
);

export default Ratings;
