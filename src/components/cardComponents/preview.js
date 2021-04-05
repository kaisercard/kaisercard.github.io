import { Grid } from '@material-ui/core';
import React from 'react';
import { CardFront, CardBack } from './card';

export const Preview = ({ card_data, options, iconMap }) => {
    const cardProps = { card_data, options, iconMap };

    if (card_data)
        return (
            <Grid item xs={12} md={5}>
                <div id='preview-container'>
                    <CardFront {...cardProps} />
                </div>
                <div id='preview-container'>
                    <CardBack {...cardProps} />
                </div>
            </Grid>
        );
    return null;
};
