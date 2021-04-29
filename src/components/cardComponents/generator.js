import styled from '@emotion/styled';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button as button,
    Grid,
    NativeSelect,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useLocalState } from '../utils/reactHooks';
import { CardSettings } from './card-settings';
import './css/card-size.css';
import './css/cards.css';
import './css/ui.css';
import { defaultCardData, defaultOptions } from './data/defaultSettings';
import exampleData from './data/exampleCards';
import { PageSettings } from './page-settings';
import { Preview } from './preview';

const Container = styled(Grid)`
    .label {
        text-align: right;
        padding-right: 16px;
        font-weight: 800;
    }
`;

const Button = styled(button)`
    width: 100%;
    height: 100%;
    font-size: 12px;
`;

const Select = styled(NativeSelect)`
    width: 100%;
    height: 100%;
`;

const Generator = ({ togglePrintMode }) => {
    const [cardList, setCardList] = useLocalState('cardList', exampleData());
    const [currentCard, setCurrentCard] = React.useState(0);
    const [options, setOptions] = useLocalState(
        'card_print_options',
        defaultOptions()
    );
    const [iconMap, setIconMap] = React.useState({});
    useEffect(() => {
        const loadedIcons = require('../../iconMap.json');
        setIconMap(loadedIcons);
    }, []);

    const {default_card_count=1} = options;

    if (cardList.length === 0) {
        setCardList([defaultCardData(1)]);
    }

    if (currentCard >= cardList.length) {
        setCurrentCard(Math.max(0, cardList.length - 1));
    }

    const updateCard = value => {
        if (currentCard < cardList.length) {
            const dup = [...cardList];
            dup[currentCard] = value;
            setCardList(dup);
        }
    };

    const updateIndex = event => {
        if (typeof event === 'number') setCurrentCard(event);
        else setCurrentCard(event.target.value);
    };

    const removeCurrent = () => {
        const dup = [...cardList];
        dup.splice(currentCard, 1);
        setCardList(dup);
    };

    const newCard = () => {
        setCardList([...cardList, defaultCardData(default_card_count)]);
        setCurrentCard(cardList.length);
    };

    const duplicateCard = () => {
        const curr = cardList[currentCard];
        const def = defaultCardData();
        const title = curr ? (curr.title + ' (Copy)').trim() : def.title;

        setCardList([
            ...cardList,
            {
                ...def,
                ...cardList[currentCard],
                title,
            },
        ]);
        setCurrentCard(cardList.length);
    };

    return (
        <Container
            container
            direction='row'
            justify='space-between'
            alignItems='flex-start'
            spacing={2}
        >
            <PageSettings
                cardList={cardList}
                setCardList={setCardList}
                pageOptions={options}
                setPageOptions={setOptions}
                iconMap={iconMap}
                togglePrintMode={togglePrintMode}
            />
            <Grid item xs={12} md={4}>
                <Deck
                    cardList={cardList}
                    currentCard={currentCard}
                    updateCurrent={updateIndex}
                    removeCurrent={removeCurrent}
                    newCard={newCard}
                    duplicateCard={duplicateCard}
                />
                <CardSettings
                    currentCard={cardList[currentCard]}
                    updateCard={updateCard}
                    iconMap={iconMap}
                />
            </Grid>

            <Preview
                card_data={cardList[currentCard]}
                options={options}
                iconMap={iconMap}
            />
        </Container>
    );
};

const Deck = ({
    cardList = [],
    currentCard,
    updateCurrent,
    removeCurrent,
    newCard,
    duplicateCard,
}) => {
    const divide = 2;
    const nameList = cardList.map(c => c.title);

    return (
        <Grid
            container
            direction='row'
            justify='center'
            alignItems='flex-start'
            spacing={1}
        >
            <Grid className='label' item xs={divide}>
                Deck
            </Grid>
            <Grid item xs={12 - divide}>
                Deck contains {cardList.length} unique cards.
            </Grid>
            <Grid className='label' item xs={divide}>
                Card
            </Grid>
            <Grid item xs={12 - divide}>
                <Grid container spacing={2}>
                    <Grid className='label' item xs={6}>
                        <Button
                            variant='contained'
                            onClick={() =>
                                updateCurrent(Math.max(0, currentCard - 1))
                            }
                        >
                            Previous Card
                        </Button>
                    </Grid>
                    <Grid className='label' item xs={6}>
                        <Button
                            variant='contained'
                            onClick={() =>
                                updateCurrent(
                                    Math.min(
                                        cardList.length - 1,
                                        currentCard + 1
                                    )
                                )
                            }
                        >
                            Next Card
                        </Button>
                    </Grid>
                </Grid>
                <Select value={currentCard} onChange={updateCurrent}>
                    {nameList.map(makeDeckItem)}
                </Select>

                <Accordion variant='outlined' square>
                    <AccordionSummary>Manage Card</AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid className='label' item xs={4}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={newCard}
                                >
                                    New card
                                </Button>
                            </Grid>
                            <Grid className='label' item xs={4}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={duplicateCard}
                                >
                                    Duplicate Card
                                </Button>
                            </Grid>
                            <Grid className='label' item xs={4}>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    onClick={removeCurrent}
                                >
                                    Delete Card
                                </Button>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    );
};

const makeDeckItem = (name, i) => (
    <option key={i} value={i}>
        {name}
    </option>
);

export default Generator;
