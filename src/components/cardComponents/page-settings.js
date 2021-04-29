import styled from '@emotion/styled';
import {
    Button as button,
    Divider,
    Grid,
    NativeSelect as select,
    TextField as textField,
} from '@material-ui/core';
import { saveAs } from 'file-saver';
import React from 'react';
import { Link } from 'react-router-dom';
import { cape } from '../utils/toolHelper';
import { defaultOptions } from './data/defaultSettings';
import exampleCards from './data/exampleCards';
import { bodyFont, cardSize, pageSize, titleFont } from './data/option-data';
import { default as Order } from './dnd-dialog';
import HelpDialog from './help-dialog';
import { ColorSelector, IconSelector } from './util/selection';

const Button = styled(button)`
    width: 100%;
    height: 100%;
    font-size: 12px;
`;

const Select = styled(select)`
    width: 100%;
    height: 100%;
`;

const TextField = styled(textField)`
    width: 100%;
    height: 100%;
`;

export const PageSettings = ({
    cardList,
    setCardList,
    pageOptions,
    setPageOptions,
    iconMap,
    togglePrintMode,
}) => {
    const {
        page_size,
        card_size,
        default_title_size,
        default_body_text_size,
        default_card_count,
        icon_inline,
        page_rows,
        page_columns,
        rounded_corners,
        card_arrangement,
        default_icon,
        default_color,
        page_orientation,
        card_orientation,
    } = pageOptions;

    const divide = 5;
    const buttonXS = 6;

    const updateAllColor = () =>
        setCardList(cardList.map(card => ({ ...card, color: default_color })));

    const updateAllTitleFont = () =>
        setCardList(
            cardList.map(card => ({ ...card, title_size: default_title_size }))
        );

    const updateAllBodyFont = () =>
        setCardList(
            cardList.map(card => ({
                ...card,
                body_text_size: default_body_text_size,
            }))
        );

    const updateAllFrontIcon = () =>
        setCardList(
            cardList.map(card => ({
                ...card,
                icon_front: default_icon,
            }))
        );

    const updateAllBackIcon = () =>
        setCardList(
            cardList.map(card => ({
                ...card,
                icon_back: default_icon,
            }))
        );

    const updateAllCardCount = () =>
        setCardList(
            cardList.map(card => ({
                ...card,
                count: default_card_count,
            }))
        );

    const clickSaveCards = () => {
        const fileName = prompt('Filename:') || 'rpg-cards';

        const file = new Blob([JSON.stringify(cardList, null, 4)], {
            type: 'application/json;charset=utf-8',
        });

        saveAs(file, fileName);
    };

    const handleFile = event => {
        const fileReader = new FileReader();
        fileReader.onloadend = e => {
            const content = JSON.parse(fileReader.result);
            setCardList([...cardList, ...cape(content)]);
        };
        fileReader.readAsText(event.target.files[0]);
    };

    return (
        <Grid
            item
            xs={12}
            md={3}
            container
            direction='column'
            justify='center'
            alignItems='stretch'
            spacing={2}
        >
            {/* Global Settings */}
            <Grid item container spacing={2}>
                <Grid item xs={buttonXS}>
                    <HelpDialog />
                </Grid>
                <Grid item xs={buttonXS}>
                    <Button
                        variant='contained'
                        onClick={() => {
                            setCardList([]);
                        }}
                    >
                        Delete All
                    </Button>
                </Grid>
                <Grid item xs={buttonXS}>
                    <Button
                        variant='contained'
                        onClick={() => setCardList(exampleCards())}
                    >
                        Load Sample
                    </Button>
                </Grid>
                <Grid item xs={buttonXS}>
                    <UploadButton handleFile={handleFile}>
                        Load from file
                    </UploadButton>
                </Grid>
                <Grid item xs={buttonXS}>
                    <Order
                        cardList={cardList}
                        setCardList={setCardList}
                        options={pageOptions}
                        iconMap={iconMap}
                    />
                </Grid>
                <Grid item xs={buttonXS}>
                    <Button variant='contained' onClick={clickSaveCards}>
                        Save to file
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button component={Link} to='/print' variant='contained'>
                        Generate
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <h2>Print settings</h2>
                <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='flex-start'
                    spacing={1}
                >
                    <Grid className='label' item xs={divide}>
                        Page Size
                    </Grid>
                    <Grid item xs={12 - divide}>
                        <Select
                            value={page_size}
                            onChange={event =>
                                setPageOptions({
                                    ...pageOptions,
                                    page_size: event.target.value,
                                })
                            }
                        >
                            {size2Options(pageSize)}
                        </Select>
                    </Grid>
                    <Grid className='label' item xs={divide}>
                        Card Size
                    </Grid>
                    <Grid item xs={12 - divide}>
                        <Select
                            value={card_size}
                            onChange={event =>
                                setPageOptions({
                                    ...pageOptions,
                                    card_size: event.target.value,
                                })
                            }
                        >
                            {size2Options(cardSize)}
                        </Select>
                    </Grid>
                    <Grid className='label' item xs={divide}>
                        Page Orientation
                    </Grid>
                    <Grid item xs={12 - divide}>
                        <Select
                            value={page_orientation}
                            onChange={event =>
                                setPageOptions({
                                    ...pageOptions,
                                    page_orientation: event.target.value,
                                })
                            }
                        >
                            <option value={'portrait'}>Portrait</option>
                            <option value={'landscape'}>Landscape</option>
                        </Select>
                    </Grid>
                    <Grid className='label' item xs={divide}>
                        Card Orientation
                    </Grid>
                    <Grid item xs={12 - divide}>
                        <Select
                            value={card_orientation}
                            onChange={event =>
                                setPageOptions({
                                    ...pageOptions,
                                    card_orientation: event.target.value,
                                })
                            }
                        >
                            <option value={'portrait'}>Portrait</option>
                            <option value={'landscape'}>Landscape</option>
                        </Select>
                    </Grid>
                    <Grid className='label' item xs={divide}>
                        Cards/page
                    </Grid>
                    <Grid
                        item
                        xs={12 - divide}
                        container
                        direction='row'
                        justify='space-between'
                        alignItems='center'
                    >
                        <Grid item xs={5}>
                            <TextField
                                value={page_rows}
                                onChange={event =>
                                    setPageOptions({
                                        ...pageOptions,
                                        page_rows: event.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: 'center' }}>
                            ×
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                value={page_columns}
                                onChange={event =>
                                    setPageOptions({
                                        ...pageOptions,
                                        page_columns: event.target.value,
                                    })
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid className='label' item xs={divide}>
                        Arragement
                    </Grid>
                    <Grid item xs={12 - divide}>
                        <Select
                            value={card_arrangement}
                            onChange={event =>
                                setPageOptions({
                                    ...pageOptions,
                                    card_arrangement: event.target.value,
                                })
                            }
                        >
                            <option value={'front_only'}>
                                Front side only
                            </option>
                            <option value={'doublesided'}>
                                Double sided printing
                            </option>
                            <option value='side_by_side'>Side by side</option>
                        </Select>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <h2>Default values</h2>
                <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='flex-start'
                    spacing={1}
                >
                    <Grid className='label' item xs={divide}>
                        Title
                    </Grid>
                    <Grid item xs={12 - divide}>
                        <Select
                            value={default_title_size}
                            onChange={event =>
                                setPageOptions({
                                    ...pageOptions,
                                    default_title_size: event.target.value,
                                })
                            }
                        >
                            {titleFont
                                .filter(f => f.value)
                                .map(({ name, value }) => (
                                    <option key={value} value={value}>
                                        {name}
                                    </option>
                                ))}
                        </Select>
                    </Grid>
                    <Grid className='label' item xs={divide}>
                        Body
                    </Grid>
                    <Grid item xs={12 - divide}>
                        <Select
                            value={default_body_text_size}
                            onChange={event =>
                                setPageOptions({
                                    ...pageOptions,
                                    default_body_text_size: event.target.value,
                                })
                            }
                        >
                            {bodyFont
                                .filter(f => f.value)
                                .map(({ name, value }) => (
                                    <option key={value} value={value}>
                                        {name}
                                    </option>
                                ))}
                        </Select>
                    </Grid>

                    <Grid className='label' item xs={divide}>
                        Card Count
                    </Grid>
                    <Grid item xs={12 - divide}>
                        <TextField
                            value={default_card_count}
                            onChange={event =>
                                setPageOptions({
                                    ...pageOptions,
                                    default_card_count: event.target.value,
                                })
                            }
                        />
                    </Grid>

                    <Grid className='label' item xs={divide}>
                        Icon
                    </Grid>
                    <Grid item xs={12 - divide}>
                        <IconSelector
                            iconMap={iconMap}
                            value={default_icon}
                            onChange={value =>
                                setPageOptions({
                                    ...pageOptions,
                                    default_icon: value,
                                })
                            }
                        />
                    </Grid>

                    <Grid className='label' item xs={divide}>
                        Color
                    </Grid>
                    <Grid item xs={12 - divide}>
                        <ColorSelector
                            color={default_color}
                            onChange={value =>
                                setPageOptions({
                                    ...pageOptions,
                                    default_color: value,
                                })
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <h2>Apply defaults to all cards</h2>
                <Grid container spacing={2}>
                    <Grid item xs={buttonXS}>
                        <Button variant='contained' onClick={updateAllColor}>
                            Apply color
                        </Button>
                    </Grid>
                    <Grid item xs={buttonXS}>
                        <Button
                            variant='contained'
                            onClick={updateAllCardCount}
                        >
                            Apply card count
                        </Button>
                    </Grid>
                    <Grid item xs={buttonXS}>
                        <Button
                            variant='contained'
                            onClick={updateAllTitleFont}
                        >
                            Apply title font
                        </Button>
                    </Grid>
                    <Grid item xs={buttonXS}>
                        <Button variant='contained' onClick={updateAllBodyFont}>
                            Apply body font
                        </Button>
                    </Grid>
                    <Grid item xs={buttonXS}>
                        <Button
                            variant='contained'
                            onClick={updateAllFrontIcon}
                        >
                            Apply front icon
                        </Button>
                    </Grid>
                    <Grid item xs={buttonXS}>
                        <Button variant='contained' onClick={updateAllBackIcon}>
                            Apply back icon
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Divider />
            </Grid>
            <Grid item>
                <Button
                    onClick={() => setPageOptions(defaultOptions())}
                    color='secondary'
                    variant='contained'
                >
                    Reset Settings
                </Button>
            </Grid>
        </Grid>
    );
};

const size2Options = sizes =>
    Object.entries(sizes).map(([id, { name, hint }]) => (
        <option key={id} value={id}>
            {name + (hint ? ` (${hint})` : '')}
        </option>
    ));

const UploadButton = ({ handleFile }) => {
    return (
        <div>
            <input
                style={{ display: 'none' }}
                id='upload-button'
                accept='application/json'
                multiple
                type='file'
                onChange={handleFile}
            />
            <label htmlFor='upload-button'>
                <Button variant='contained' component='span'>
                    Load from file
                </Button>
            </label>
        </div>
    );
};
