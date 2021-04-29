const text = () => {
    return (
        <div>
            <h2>Content Line Types</h2>
            <p>
                Each line in the content box must start with one of the
                following commands. Each type is proceeded by a "|" (bar
                character). Some line types can have multiple bars, the text
                between two bars, or the end text, will be displayed as per the
                type. Examples of each type can be found below.
            </p>
            <hr />
            {/* SUBTITLE */}
            <p>
                <span className='text-desc'>subtitle</span> Text that will be
                displayed right below the cards title. You can only have a
                single subtitle per card, but it is not required.
            </p>
            <ul>
                <li>Argument 1: the text.</li>
            </ul>
            <code>subtitle | Text that will appear right below a card</code>
            <hr />

            {/* TEXT */}
            <p>
                <span className='text-desc'>text</span> The text following the |
                will be displayed. Variations include:{' '}
                <span className='text-desc'>center</span>{' '}
                <span className='text-desc'>justify</span>
            </p>
            <ul>
                <li>Argument 1: the text.</li>
            </ul>
            <code>
                text | Some text to display. The text will wrap to the next line
                if it is long enough.
            </code>
            <hr />

            {/* DESCRIPTION */}
            <p>
                <span className='text-desc'>description</span> Displays a title
                in bold and a body of text after it. The head and body have no
                seperating marks.
            </p>
            <ul>
                <li>Argument 1: the title.</li>
                <li>Argument 2: the text displayed after the title.</li>
            </ul>
            <code>
                property | Head of the description | Text body related to the
                description. This will display like a definition in a
                dictionary.
            </code>
            <hr />

            {/* PROPERTY */}
            <p>
                <span className='text-desc'>property</span> Like the description
                type, but the title and body are seperated by a "." and if the
                body wraps, it is indented. If you use another bar, a second
                property will be displayed right aligned to the first one. This
                can be useful to display multiple short properties. Be warned,
                if the first part is too long, it will wrap the second part in a
                weird way.
            </p>
            <ul>
                <li>Argument 1: the title.</li>
                <li>Argument 2: the text displayed after the title.</li>
                <li>Argument 3 (Optional): the second title. Right aligned.</li>
                <li>
                    Argument 4 (Optional): the text displayed after the second
                    title.
                </li>
            </ul>
            <code>
                property | Head of the property | Text body related to the
                property. If the body is long enought to wrap, it will be
                indented.
            </code>
            <code>
                property | Head 1 | Text body related to the first property. |
                Head 2 | Text body for the second part
            </code>

            <hr />

            {/* RULE */}
            <p>
                <span className='text-desc'>rule</span> Displays a horizontal
                line across the card. The color of the line will match the
                card's. This has no arguments, so does not need a bar.
                Variations include: <span className='text-desc'>ruler</span>
            </p>
            <ul>
                <li>No arguments</li>
            </ul>
            <code>rule</code>
            <hr />

            {/* BOX */}
            <p>
                <span className='text-desc'>box</span> Creates a number of empty
                boxes. The boxes will be the same color as the card. You can
                change the size of the boxes with a second argument. Variations
                include: <span className='text-desc'>boxes</span>
            </p>
            <ul>
                <li>
                    Argument 1 (Optional): The number of boxes to create. If no
                    value is provided, it creates a single box.
                </li>
                <li>
                    Argument 2 (Optional): The size of the boxes. Default size
                    is 3.
                </li>
            </ul>
            <code>box | 1</code>
            <code>box | 6 | 10</code>
            <hr />

            {/* BULLET */}
            <p>
                <span className='text-desc'>bullet</span> Creates a bullet
                pointed line. A second bar will format the bullet like the
                property type (head and body text).
            </p>
            <ul>
                <li>
                    Argument 1: the text. If argument 2 is present, this becomes
                    the bolded title.
                </li>
                <li>
                    Argument 2 (Optional): the text displayed after the title.
                </li>
            </ul>
            <code>bullet | some text on an item line</code>
            <code>bullet | title of something | description of that thing</code>
            <hr />

            {/* CHECK */}
            <p>
                <span className='text-desc'>check</span> Like bullet, but will
                create a hollow box like a checkbox.
            </p>
            <ul>
                <li>
                    Argument 1: the text. If argument 2 is present, this becomes
                    the bolded title.
                </li>
                <li>
                    Argument 2 (Optional): the text displayed after the title.
                </li>
            </ul>
            <code>check | some text on an item line</code>
            <code>check | title of something | description of that thing</code>
            <hr />

            {/* SECTION */}
            <p>
                <span className='text-desc'>section</span> Creates a large line
                of text with a line under it that goes across the card. A second
                bar will create a second bit of text that is right aligned.
            </p>
            <ul>
                <li>Argument 1: the section name.</li>
                <li>
                    Argument 2 (Optional): a second section name, right aligned.
                </li>
            </ul>
            <code>section | Heading 1</code>
            <code>section | Heading right | Heading left</code>
            <hr />

            {/* FILL */}
            <p>
                <span className='text-desc'>fill</span> A dynamically resized
                empty space that takes up a portion of the card. You can use
                this to vertically center text by adding one of these before and
                after the text you want to center.
            </p>
            <ul>
                <li>
                    Argument 1 (Optional): the number of units of empty space to
                    use.
                </li>
            </ul>
            <code>fill</code>
            <code>fill | 4</code>
            <hr />

            {/* PICTURE */}
            <p>
                <span className='text-desc'>picture</span> An image will be
                displayed based on the url provided.
            </p>
            <ul>
                <li>Argument 1: the number of units of empty space to use.</li>
                <li>Argument 2: The height of the image, in mm.</li>
            </ul>
            <code>picture | url.com/image</code>
            <code>picture | url.com/image | 20</code>
            <hr />

            {/* ICON */}
            <p>
                <span className='text-desc'>icon</span> An inline icon. The icon
                can be left, right, or center aligned and the size can be
                changed. The name of the icon must match one of the icons found
                in the icon browsers.
            </p>
            <ul>
                <li>Argument 1: The icon's name.</li>
                <li>
                    Argument 2 (Optional): The height of the image, in px.
                    Default is 40.
                </li>
                <li>
                    Argument 3 (Optional): How the icon is aligned: right, left,
                    center. Default value is center.
                </li>
            </ul>
            <code>icon | ace</code>
            <code>icon | ace | 60</code>
            <code>icon | ace | 60 | right</code>
            <hr />

            {/* TABLEHEAD */}
            {/* TABLEROW */}
            <p>
                <span className='text-desc'>tablehead</span> and{' '}
                <span className='text-desc'>tablerow</span> A row of a table.
                Each table cell is its own argument. Tablerows and tablehead
                lines with no space between them will group together to make a
                table. For best results, make sure each row has the number of
                arguments. The tablehead will change the style of the the line
            </p>
            <ul>
                <li>Argument X: the text of a table cell.</li>
            </ul>
            <code>tablehead | heading 1 | heading 2 | heading 3</code>
            <code>tablerow | cell 1 | cell 2 | cell 3</code>
            <hr />

            {/* PFTRAIT */}
            <p>
                <span className='text-desc'>pftrait</span> Creates a trait icon
                like in the Pathfinder 2e rulebook. Each argument is its own
                trait. The arguments uncommon, rare, and unique will be styled
                special, as per the rulebook.
            </p>
            <ul>
                <li>Argument X: The trait name.</li>
            </ul>
            <code>pftrait | arcane | fire | manipulate</code>
            <code>pftrait | uncommon | kobold</code>
            <hr />

            {/* D20STAT */}
            <p>
                <span className='text-desc'>d20stat</span> Creates a stat block
                using the d20 rules. Teh modifier will be calculated from the
                given value.
            </p>
            <ul>
                <li>Argument 1: Strength value.</li>
                <li>Argument 2: Dexterity value.</li>
                <li>Argument 3: Constituion value.</li>
                <li>Argument 4: Intelligence value.</li>
                <li>Argument 5: Wisdom value.</li>
                <li>Argument 6: Charisma value.</li>
            </ul>
            <code>d20stat | 10 | 14 | 13 | 18 | 15 | 9</code>
            <hr />

            <h2>Styling of Text</h2>
            <p>
                Below you will find the markup language you can use to style the
                text of most line types.
            </p>

            {/* BOLD */}
            <code>**bolded text**</code>
            <p>
                Text can be bolded by placing it in between a pair of two star
                characters.
            </p>
            <hr />

            {/* ITALICS */}
            <code>*italicized text*</code>
            <p>
                Text can be italicized by placing it in between a pair star
                characters.
            </p>
            <hr />

            {/* ENDASH */}
            <code>endash--between</code>
            <p>Two dash characters will become an endash.</p>
            <hr />

            {/* EMDASH */}
            <code>emdash---between</code>
            <p>
                Three dash characters will become an emdash, which is slightly
                longer than endash.
            </p>
            <hr />

            {/* NEW LINE */}
            <code>break text^^between lines</code>
            <p>
                Two caret characters will become a newline. This allows you to
                break text between lines.
            </p>
            <hr />

            {/* PF ACTION */}
            <code>[[one-action]]</code>
            <p>The symbol for Pathfinder 2e single action.</p>
            <hr />
            <code>[[two-action]]</code>
            <p>The symbol for Pathfinder 2e two action.</p>
            <hr />
            <code>[[three-action]]</code>
            <p>The symbol for Pathfinder 2e three action.</p>
            <hr />
            <code>[[free-action]]</code>
            <p>The symbol for Pathfinder 2e free action.</p>
            <hr />
            <code>[[reaction]]</code>
            <p>The symbol for Pathfinder 2e reaction.</p>
            <hr />
        </div>
    );
};
export default text;
