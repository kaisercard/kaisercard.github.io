import React, { useEffect } from 'react';
import { useLocalState } from '../utils/reactHooks';
import { card_pages_generate_html } from './card';
import './css/card-size.css';
import './css/cards.css';
import './css/print.css';
import { defaultOptions } from './data/defaultSettings';

const Print = () => {
    const [cardList] = useLocalState('cardList', []);
    const [options] = useLocalState('card_print_options', defaultOptions());
    const [iconMap, setIconMap] = React.useState({});

    useEffect(() => {
        const loadedIcons = require('../../iconMap.json');
        setIconMap(loadedIcons);
    }, []);

    const pages = card_pages_generate_html(cardList, options, iconMap);

    return pages;
};

export default Print;
