import { Grid } from '@material-ui/core';
import React from 'react';
import { CardFront, CardBack } from './card';

export const Preview = ({ card_data, options, iconMap }) => {
    const cardProps = { card_data, options, iconMap };

    if (card_data)
        return (
            <Grid
                item
                xs={12}
                md={5}
                container
                direction='column'
                justify='flex-start'
                alignItems='center'
                spacing={1}
            >
                <Grid item id='preview-container'>
                    <CardFront {...cardProps} />
                </Grid>
                <Grid item id='preview-container'>
                    <CardBack {...cardProps} />
                </Grid>
            </Grid>
        );
    return null;
};
