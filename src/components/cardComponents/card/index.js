import styled from '@emotion/styled';
import Image from '../../imageComponents';
import { cardSize, pageSize } from '../data/option-data';
import { RRC } from '../util';

const Wrapper = styled('div')`
    @page {
        margin: 0;
        size: ${props => props.size}
        -webkit-print-color-adjust: exact;
    }
`;

// ============================================================================
// Card definition related functions
// ============================================================================

export function card_data_color_front(card_data, options) {
    return (
        card_data.color_front ||
        card_data.color ||
        options.default_color ||
        'black'
    );
}

function card_data_color_back(card_data, options) {
    return (
        card_data.color_back ||
        card_data.color ||
        options.default_color ||
        'white'
    );
}

function card_data_icon_front(card_data, options) {
    const iconValue =
        card_data.icon_front || card_data.icon || options.default_icon || 'ace';
    return get_icon_rotation_array(iconValue);
}

function card_data_icon_back(card_data, options) {
    const iconValue =
        card_data.icon_back ||
        card_data.icon_front ||
        card_data.icon ||
        options.default_icon ||
        'ace';
    return get_icon_rotation_array(iconValue);
}

function get_icon_rotation_array(iconValue) {
    const [icon, rotation] = iconValue.split('#');
    return [icon, rotation];
}

function card_data_body_text_font(card_data, options) {
    return card_data.body_text_size || options.default_body_text_size || '8';
}

function card_data_subtitle_text_font(card_data, options) {
    return (
        parseFloat(card_data_body_text_font(card_data, options)) + 2
    ).toString();
}

function card_data_section_text_font(card_data, options) {
    return (
        parseFloat(card_data_body_text_font(card_data, options)) + 2
    ).toString();
}

function card_data_split_params(value) {
    return value.split('|').map(function (str) {
        return str.trim();
    });
}

/************************************************************************/

export const Title = ({ card_data, options }) => {
    var title = card_data.title || '';
    var title_size =
        card_data.title_size || options.default_title_size || 'normal';

    const a = 'card-title card-title-' + title_size;

    return <div className={a}>{title}</div>;
};

export const Icon = ({ card_data, options, iconMap }) => {
    const [icon, rotation] = card_data_icon_front(card_data, options);
    const { path } = iconMap[icon] || {};
    const iconClass = options && options.icon_inline ? 'inlineicon' : 'icon';

    const a = 'card-title-' + iconClass + '-container';
    const b = 'card-front-icon card-title-' + iconClass;

    return (
        <div className={a}>
            <div className={b}>
                <Image src={path} rotation={rotation} alt='' />
            </div>
        </div>
    );
};

const IconBack = ({ card_data, options, iconMap }) => {
    const [icon, rotation] = card_data_icon_back(card_data, options);
    const { path } = iconMap[icon] || {};

    return (
        <div className='card-back-icon'>
            <Image src={path} rotation={rotation} alt='' />
        </div>
    );
};

const Subtitle = ({ params, card_data, options }) => {
    var subtitle_text_font = card_data_subtitle_text_font(card_data, options);
    var subtitle = params[0] || '';

    const b = { fontSize: subtitle_text_font + 'pt' };

    return (
        <div className='card-element card-subtitle' style={b}>
            {RRC(subtitle)}
        </div>
    );
};

export const InlineIcon = ({ params, card_data, options, iconMap }) => {
    var icon = params[0] || '';
    const { path } = iconMap[icon] || {};
    var size = params[1] || '40';
    var align = params[2] || 'center';
    var color = card_data_color_front(card_data, options);

    const a = 'card-element card-inline-icon align-' + align + ' icon-' + icon;
    const b = {
        height: size + 'px',
        minHeight: size + 'px',
        width: size + 'px',
        backgroundColor: color,
    };
    return (
        <div className={a} style={b}>
            <Image src={path} alt='' />
        </div>
    );
};

const Picture = ({ params, card_data, options }) => {
    var url = params[0] || '';
    var height = params[1] || '';
    return (
        <div
            className='card-element card-picture'
            style={{
                backgroundImage: `url(${url})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: `${height}mm`,
            }}
        />
    );
};

const Ruler = ({ params, card_data, options }) => {
    var color = card_data_color_front(card_data, options);
    return (
        <svg
            className='card-ruler'
            height='1'
            width='100'
            viewBox='0 0 100 1'
            preserveAspectRatio='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <polyline points='0,0 100,0.5 0,1' fill={color} />
        </svg>
    );
};

const Boxes = ({ params, card_data, options }) => {
    var color = card_data_color_front(card_data, options);
    var count = Number(params[0]) || 1;
    var size = Number(params[1]) || 3;

    const Box = props => (
        <svg
            {...props}
            className='card-box'
            height='100'
            width='100'
            viewBox='0 0 100 100'
            preserveAspectRatio='none'
            xmlns='http://www.w3.org/2000/svg'
            style={{ width: size + 'em', height: size + 'em' }}
        >
            <rect
                x='5'
                y='5'
                width='90'
                height='90'
                fill='none'
                stroke={color}
                style={{ strokeWidth: 10 }}
            />
        </svg>
    );

    return (
        <div className='card-element card-description-line'>
            {Array(count)
                .fill(0)
                .map((_, i) => (
                    <Box key={i} />
                ))}
        </div>
    );
};

const D20Stat = ({ params, card_data, options }) => {
    const [str = 10, dex = 10, con = 10, int = 10, wis = 10, cha = 10] = params;

    const display = v => {
        const vnum = Number(v) || 10;
        const mod = Math.floor((vnum - 10) / 2);
        return `${vnum} (${mod >= 0 ? '+' + mod : mod})`;
    };

    return (
        <table className='card-element card-d20-stat'>
            <thead>
                <tr>
                    <th>STR</th>
                    <th>DEX</th>
                    <th>CON</th>
                    <th>INT</th>
                    <th>WIS</th>
                    <th>CHA</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{display(str)}</td>
                    <td>{display(dex)}</td>
                    <td>{display(con)}</td>
                    <td>{display(int)}</td>
                    <td>{display(wis)}</td>
                    <td>{display(cha)}</td>
                </tr>
            </tbody>
        </table>
    );
};

const Property = ({ params, card_data, options }) => {
    const right = (
        <div style={{ float: 'right' }}>
            <h4 className='card-property-name'>{RRC(params[2])}</h4>
            <p className='card-p card-property-text'>{RRC(params[3])}</p>
        </div>
    );
    return (
        <div className='card-element card-property-line'>
            <h4 className='card-property-name'>{RRC(params[0])}</h4>
            <p className='card-p card-property-text'>{RRC(params[1])}</p>
            {params[2] ? right : null}
        </div>
    );
};

const Description = ({ params, card_data, options }) => {
    return (
        <div className='card-element card-description-line'>
            <h4 className='card-description-name'>{RRC(params[0])}</h4>
            <p className='card-p card-description-text'>{RRC(params[1])}</p>
        </div>
    );
};

const Text = ({ params, card_data, options }) => {
    return (
        <div className='card-element card-description-line'>
            <p className='card-p card-description-text'>{RRC(params[0])}</p>
        </div>
    );
};

const Center = ({ params, card_data, options }) => {
    return (
        <div
            className='card-element card-description-line'
            style={{ textAlign: 'center' }}
        >
            <p className='card-p card-description-text'>{RRC(params[0])}</p>
        </div>
    );
};

const Justify = ({ params, card_data, options }) => {
    return (
        <div
            className='card-element card-description-line'
            style={{ textAlign: 'justify', hyphens: 'auto' }}
        >
            <p className='card-p card-description-text'>{RRC(params[0])}</p>
        </div>
    );
};

const Bullet = ({ params, card_data, options }) => {
    let item = RRC(params[0]);
    if (params.length > 1) {
        item = (
            <>
                <h4 className='card-property-name'>{RRC(params[0])}</h4>
                <p className='card-p card-property-text'>{RRC(params[1])}</p>
            </>
        );
    }
    return (
        <ul className='card-element card-bullet-line'>
            <li className='card-bullet'>{item}</li>
        </ul>
    );
};

const Check = ({ params, card_data, options }) => {
    let item = RRC(params[0]);
    if (params.length > 1) {
        item = (
            <>
                <h4 className='card-property-name'>{RRC(params[0])}</h4>
                <p className='card-p card-property-text'>{RRC(params[1])}</p>
            </>
        );
    }
    return (
        <ul className='card-element card-check-line'>
            <li className='card-check'>{item}</li>
        </ul>
    );
};

const Section = ({ params, card_data, options }) => {
    var section_text_font = card_data_section_text_font(card_data, options);
    var color = card_data_color_front(card_data, options);
    var section = params[0] || '';

    const right = <span style={{ float: 'right' }}>{RRC(params[1])}</span>;

    return (
        <h3
            className='card-section'
            style={{ color: color, fontSize: section_text_font + 'pt' }}
        >
            {RRC(params[0])}
            {params[1] ? right : null}
        </h3>
    );
};

const Fill = ({ params, card_data, options }) => {
    return <span className='' style={{ flex: params[0] || 1 }} />;
};

const TableHeader = ({
    params,
    card_data,
    options,
    cellStyle,
    rowStyle,
    iconMap,
    ...props
}) => {
    return (
        <thead>
            <tr
                className='card-element card-table-header'
                style={rowStyle}
                {...props}
            >
                {params.map((param, i) => (
                    <td key={i} className='card-table-cell' style={cellStyle}>
                        {RRC(param)}
                    </td>
                ))}
            </tr>
        </thead>
    );
};

const TableRow = ({
    params,
    card_data,
    options,
    cellStyle,
    rowStyle,
    props,
}) => {
    return (
        <tbody>
            <tr
                className='card-element card-table-row'
                style={rowStyle}
                {...props}
            >
                {params.map((param, i) => (
                    <td key={i} className='card-table-cell' style={cellStyle}>
                        {RRC(param)}
                    </td>
                ))}
            </tr>
        </tbody>
    );
};

const PFTrait = ({ params }) => {
    const traits = params.map((param, i) => {
        let rarityClass = '';
        switch (param) {
            case 'uncommon':
                rarityClass = '-uncommon';
                break;
            case 'rare':
                rarityClass = '-rare';
                break;
            case 'unique':
                rarityClass = '-unique';
                break;
        }
        return (
            <span key={i} className={'card-pftrait' + rarityClass}>
                {param}
            </span>
        );
    });
    return <div className='card-element card-pftrait-line'>{traits}</div>;
};

const Unknown = ({ params, card_data, options }) => {
    return <div>Unknown element{params.join(<br />)}</div>;
};

const Empty = () => null;

const card_element_generators = {
    subtitle: Subtitle,
    property: Property,
    rule: Ruler,
    ruler: Ruler,
    box: Boxes,
    boxes: Boxes,
    description: Description,
    text: Text,
    center: Center,
    justify: Justify,
    bullet: Bullet,
    check: Check,
    fill: Fill,
    section: Section,
    disabled: Empty,
    picture: Picture,
    icon: InlineIcon,
    tablehead: TableHeader,
    tableheader: TableHeader,
    table: TableRow,
    tablerow: TableRow,
    pftrait: PFTrait,
    d20stat: D20Stat,
    unknown: Unknown,
};

export const CardFront = props => {
    const { card_data, options } = props;
    var color = card_data_color_front(card_data, options);
    var colorStyle = card_generate_color_style(color, options);
    var body_text_font = card_data_body_text_font(card_data, options);

    const { width, height } = cardSize[options.card_size];
    const masterStyle = { width, height };

    if (options.card_orientation === 'landscape') {
        masterStyle.width = height;
        masterStyle.height = width;
    }

    const style = {
        ...colorStyle,
        fontSize: body_text_font + 'pt',
        ...masterStyle,
    };

    // card-size-${options.card_size}
    return (
        <div className={`card`} style={style}>
            <Icon {...props} />
            <Title {...props} />
            {makeCardContents(card_data.contents, props)}
        </div>
    );
};

export const CardBack = props => {
    const { card_data, options } = props;
    var color = card_data_color_back(card_data, options);
    var colorStyle = card_generate_background_color_style(color, options);
    var url = card_data.background_image;

    const { width, height } = cardSize[options.card_size];
    const masterStyle = { width, height };

    if (options.card_orientation === 'landscape') {
        masterStyle.width = height;
        masterStyle.height = width;
    }

    const style = {
        ...colorStyle,
        ...masterStyle,
    };

    // card-size-${options.card_size}
    return (
        <div className={`card`} style={style}>
            <div className='card-back'>
                <div className='card-back-inner'>
                    <IconBack {...props} />
                </div>
            </div>
        </div>
    );
};

const CardEmpty = props => {
    const { count = 1, options } = props;
    var colorStyle = card_generate_color_style('white');

    const { width, height } = cardSize[options.card_size];
    const masterStyle = { width, height };

    if (options.card_orientation === 'landscape') {
        masterStyle.width = height;
        masterStyle.height = width;
    }

    const style = {
        ...colorStyle,
        ...masterStyle,
    };

    // card-size-${options.card_size}
    return Array(count)
        .fill(0)
        .map((_, i) => <div key={i} className={`card`} style={style} />);
};

const CardContent = ({ line, card_data, options, ...props }) => {
    const [name, ...params] = card_data_split_params(line);
    const Gen = card_element_generators[name || 'unknown'];
    const content = { params, card_data, options };

    if (name && Gen) {
        return <Gen {...content} {...props} />;
    }
    return <Empty {...content} {...props} />;
};

const makeCardContents = (contents, props) => {
    const contentGroup = split_content([...contents, '']);

    const list = contentGroup.map((value, i) => {
        if (Array.isArray(value)) {
            const tableprops = (
                value.find(row => row.startsWith('tableprops')) || ''
            )
                .toLowerCase()
                .replace(/\s+/g, '');
            const cellStyle = {};
            const rowStyle = {};
            const tableStyle = {};
            if (tableprops.includes('norow;')) {
                cellStyle.border = 0;
                rowStyle.border = 0;
            }
            if (tableprops.includes('lefttext;')) {
                cellStyle.textAlign = 'left';
            }
            if (tableprops.includes('paragraph;')) {
                rowStyle.marginTop = 5.33;
            }
            return (
                <table key={i} className='card-table' style={tableStyle}>
                    {value
                        .filter(row => !row.startsWith('tableprops'))
                        .map((row, x) => (
                            <CardContent
                                key={x}
                                line={row}
                                {...props}
                                cellStyle={cellStyle}
                                rowStyle={rowStyle}
                            />
                        ))}
                </table>
            );
        }
        return <CardContent key={i} line={value} {...props} />;
    });

    return <div className='card-content-container'>{list}</div>;
};

const split_content = (contents, split = []) => {
    if (contents.length === 0) return split;

    let queue = [];
    contents.forEach(value => {
        if (
            [
                'tableprops',
                'table',
                'tablerow',
                'tableheader',
                'tablehead',
            ].includes(card_data_split_params(value)[0])
        ) {
            queue.push(value);
        } else {
            if (queue.length) {
                split.push(queue);
                queue = [];
            }
            split.push(value);
        }
    });

    return split;
};

const card_generate_color_style = (color, options) => ({
    color,
    borderColor: color,
    backgroundColor: color,
});

const card_generate_background_color_style = (color, options) => ({
    color,
    borderColor: color,
    backgroundColor: color,
});

const card_generate_color_gradient_style = (color, options) => ({
    background: `radial-gradient(ellipse at center, white 20%, ${color} 120%)`,
});

export const card_pages_generate_html = (cardList, options, iconMap) => {
    const props = {
        options,
        iconMap,
    };

    var rows = Number(options.page_rows) || 2;
    var cols = Number(options.page_columns) || 2;

    var front_cards = cardList.flatMap((card, i) =>
        Array(Number(options.card_count) || Number(card.count) || 1)
            .fill(0)
            .map((_, x) => (
                <CardFront
                    key={`front-${i}-${x}`}
                    card_data={card}
                    {...props}
                />
            ))
    );
    var back_cards = cardList.flatMap((card, i) =>
        Array(Number(options.card_count) || Number(card.count) || 1)
            .fill(0)
            .map((_, x) => (
                <CardBack key={`back-${i}-${x}`} card_data={card} {...props} />
            ))
    );

    var pages = [];
    if (options.card_arrangement === 'doublesided') {
        // Add padding cards so that the last page is full of cards
        front_cards = card_pages_add_padding(front_cards, options);
        back_cards = card_pages_add_padding(back_cards, options);

        // Split cards to pages
        var front_pages = card_pages_split(front_cards, rows, cols);
        var back_pages = card_pages_split(back_cards, rows, cols);

        // Shuffle back cards so that they line up with their corresponding front cards
        back_pages = back_pages.map(function (page) {
            return cards_pages_flip_left_right(page, rows, cols);
        });

        // Interleave front and back pages so that we can print double-sided
        pages = card_pages_merge(front_pages, back_pages);
    } else if (options.card_arrangement === 'front_only') {
        var cards = card_pages_add_padding(front_cards, options);
        pages = card_pages_split(cards, rows, cols);
    } else if (options.card_arrangement === 'side_by_side') {
        var cards = card_pages_interleave_cards(
            front_cards,
            back_cards,
            options
        );
        cards = card_pages_add_padding(cards, options);
        pages = card_pages_split(cards, rows, cols);
    }

    return card_pages_wrap(pages, options);
};

const card_pages_wrap = (pages, options) => {
    const { page_size, card_orientation } = options;
    const { width = '4.25in', height = '5.5in' } = pageSize[page_size];
    const masterStyle = { width, height };

    if (card_orientation === 'landscape') {
        masterStyle.width = height;
        masterStyle.height = width;
    }

    const result = pages.map((page, i) => {
        const style = { ...masterStyle };
        if (options.card_arrangement === 'doublesided' && i % 2 === 1) {
            style.backgroundColor = options.background_color;
        } else {
            style.backgroundColor = options.foreground_color;
        }
        return (
            <div key={i} className='page page-preview' style={style}>
                {page}
            </div>
        );
    });
    // return result;
    return <Wrapper size={`${width} ${height}`}>{result}</Wrapper>;
};

function card_pages_split(data, rows, cols) {
    var cards_per_page = rows * cols;
    var result = [];
    for (var i = 0; i < data.length; i += cards_per_page) {
        var page = data.slice(i, i + cards_per_page);
        result.push(page);
    }
    return result;
}

function card_pages_merge(front_pages, back_pages) {
    var result = [];
    for (var i = 0; i < front_pages.length; ++i) {
        result.push(front_pages[i]);
        result.push(back_pages[i]);
    }
    return result;
}

function cards_pages_flip_left_right(cards, rows, cols) {
    var result = [];
    for (var r = 0; r < rows; ++r) {
        for (var c = 0; c < cols; ++c) {
            var i = r * cols + (cols - 1 - c);
            result.push(cards[i]);
        }
    }
    return result;
}

function card_pages_add_padding(cards, options) {
    var cards_per_page = options.page_rows * options.page_columns;
    var last_page_cards = cards.length % cards_per_page;
    if (last_page_cards !== 0) {
        return cards.concat(
            <CardEmpty
                key={'end'}
                count={(options.page_columns - 2, options)}
                options={options}
            />
        );
    } else {
        return cards;
    }
}

function card_pages_interleave_cards(front_cards, back_cards, options) {
    var result = [];
    var i = 0;
    while (i < front_cards.length) {
        result.push(front_cards[i]);
        result.push(back_cards[i]);
        if (options.page_columns > 2) {
            result.push(
                <CardEmpty
                    key={i}
                    count={(options.page_columns - 2, options)}
                    options={options}
                />
            );
        }
        ++i;
    }
    return result;
}
