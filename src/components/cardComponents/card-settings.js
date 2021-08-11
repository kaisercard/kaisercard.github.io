import styled from '@emotion/styled';
import {
    Grid,
    Input as input,
    NativeSelect as select,
    TextField as textField,
} from '@material-ui/core';
import React from 'react';
import { bodyFont, titleFont } from './data/option-data';
import { ColorSelector, IconSelector } from './util/selection';

const Select = styled(select)`
    width: 100%;
    height: 100%;
`;

const Input = styled(input)`
    width: 100%;
    height: 100%;
    input {
        padding-left: 8px;
    }
`;

const TextField = styled(textField)`
    width: 100%;
    height: 100%;
`;

export const CardSettings = ({
    pageSetting,
    currentCard: card,
    updateCard,
    iconMap,
}) => {
    const divide = 2;

    const {
        title,
        tags = '',
        count,
        contents = [],
        title_size,
        body_text_size,
        icon_front,
        icon_back,
        color,
        qr,
    } = card;

    return (
        <Grid
            container
            direction='row'
            justify='center'
            alignItems='flex-start'
            spacing={1}
        >
            <Grid className='label' item xs={divide}>
                Name
            </Grid>
            <Grid item xs={12 - divide}>
                <TextField
                    value={title}
                    onChange={event =>
                        updateCard({ ...card, title: event.target.value })
                    }
                />
            </Grid>
            <Grid className='label' item xs={divide}>
                Title Font
            </Grid>
            <Grid item xs={12 - divide}>
                <Select
                    value={title_size}
                    onChange={event =>
                        updateCard({ ...card, title_size: event.target.value })
                    }
                >
                    {titleFont.map(({ name, value }) => (
                        <option key={value} value={value}>
                            {name}
                        </option>
                    ))}
                </Select>
            </Grid>
            <Grid className='label' item xs={divide}>
                Body Font
            </Grid>
            <Grid item xs={12 - divide}>
                <Select
                    value={body_text_size}
                    onChange={event =>
                        updateCard({
                            ...card,
                            body_text_size: event.target.value,
                        })
                    }
                >
                    {bodyFont.map(({ name, value }) => (
                        <option key={value} value={value}>
                            {name}
                        </option>
                    ))}
                </Select>
            </Grid>
            <Grid className='label' item xs={divide}>
                Count
            </Grid>
            <Grid item xs={12 - divide}>
                <Input
                    type='number'
                    value={count}
                    onChange={event =>
                        updateCard({ ...card, count: event.target.value })
                    }
                    inputProps={{
                        step: 1,
                        min: 1,
                    }}
                />
            </Grid>
            <Grid className='label' item xs={divide}>
                Tags
            </Grid>
            <Grid item xs={12 - divide}>
                <TextField
                    value={tags}
                    onChange={event =>
                        updateCard({ ...card, tags: event.target.value })
                    }
                />
            </Grid>
            <Grid className='label' item xs={divide}>
                QR Code
            </Grid>
            <Grid item xs={12 - divide}>
                <TextField
                    disabled={
                        icon_front !== 'qr-code' && icon_back !== 'qr-code'
                    }
                    placeholder='Enter a URL to be displayed in place of an icon.'
                    value={
                        icon_front !== 'qr-code' && icon_back !== 'qr-code'
                            ? 'Only enabled when front or back icon are qr-code'
                            : qr
                    }
                    onChange={event =>
                        updateCard({ ...card, qr: event.target.value })
                    }
                />
            </Grid>
            <Grid className='label' item xs={divide}>
                Icon
            </Grid>
            <Grid item xs={12 - divide}>
                <IconSelector
                    value={icon_front}
                    onChange={value =>
                        updateCard({ ...card, icon_front: value })
                    }
                    iconMap={iconMap}
                    emptyMessage='Using default icon'
                />
            </Grid>
            <Grid className='label' item xs={divide}>
                Back Icon
            </Grid>
            <Grid item xs={12 - divide}>
                <IconSelector
                    value={icon_back}
                    onChange={value =>
                        updateCard({ ...card, icon_back: value })
                    }
                    iconMap={iconMap}
                    emptyMessage='Using front icon'
                />
            </Grid>
            <Grid className='label' item xs={divide}>
                Color
            </Grid>
            <Grid item xs={12 - divide}>
                <ColorSelector
                    color={color}
                    onChange={value => updateCard({ ...card, color: value })}
                    emptyMessage='Using default color'
                />
            </Grid>
            <Grid className='label' item xs={divide}>
                Content
            </Grid>
            <Grid item xs={12 - divide}>
                <Contents
                    value={contents}
                    onUpdate={contents =>
                        updateCard({
                            ...card,
                            contents,
                        })
                    }
                />
            </Grid>
        </Grid>
    );
};

const Contents = ({ value = [], onUpdate, ...props }) => {
    const [innerValue, setValue] = React.useState();
    React.useEffect(() => {
        setValue(value.join('\n'));
    }, [value]);
    return (
        <textarea
            value={innerValue}
            onChange={event => setValue(event.target.value)}
            // onChange={event => setValue(event.target.value)}
            onBlur={() => {
                onUpdate(innerValue.split('\n'));
            }}
            // onKeyUp={() => onUpdate(innerValue.split('\n'))}
            {...props}
            style={{
                display: 'block',
                width: '100%',
                maxWidth: '95%',
                height: '100%',
                minHeight: 600,
                padding: '6px 12px',
                fontSize: 14,
                lineHeight: 1.42857143,
            }}
        />
    );
};
