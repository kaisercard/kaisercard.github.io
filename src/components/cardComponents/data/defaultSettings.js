export const defaultOptions = () => ({
    foreground_color: 'white',
    background_color: 'white',
    default_color: 'black',
    default_icon: 'ace',
    default_title_size: '13',
    default_body_text_size: '8',
    default_card_count:1,
    page_size: 'letter',
    page_rows: 2,
    page_columns: 2,
    card_orientation: 'portrait',
    page_orientation: 'portrait',
    card_arrangement: 'doublesided',
    card_size: '425x55',
    card_count: null,
    icon_inline: true,
    rounded_corners: false,
});

export const defaultCardData = (count = 1) => ({
    count,
    title: 'New card',
    contents: [],
    tags: [],
    color: '',
    icon_front: '',
    icon_back: '',
    title_size: '',
    body_text_size: '',
});

export const clearCardData = card => {
    card.title = card.title || '';
    card.contents = card.contents || [];
    card.tags = card.tags || [];
};
