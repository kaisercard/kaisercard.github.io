import styled from '@emotion/styled';
import {
    Button as button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Icon, Title } from './card';

const Button = styled(button)`
    width: 100%;
    height: 100%;
    font-size: 12px;
`;

const StyledDialog = styled(Dialog)`
    .MuiAppBar {
        position: relative;
        width: unset;
    }
    .MuiTypography-h6 {
        margin-left: theme.spacing(2);
        flex: 1;
    }

    .MuiDialog-paper {
        width: 100%;
        height: 100%;
    }
`;

export default ({ cardList, setCardList, ...props }) => {
    const [open, setOpen] = React.useState(false);
    const [currentOrder, setOrder] = React.useState([]);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleOpen = () => {
        setOpen(true);
        setOrder(
            cardList.map((card, i) => ({
                ...card,
                uuid: uuidv4(),
            }))
        );
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setCardList(currentOrder);
        handleClose();
    };

    return (
        <>
            <Button variant='contained' onClick={handleOpen}>
                Order Cards
            </Button>
            <StyledDialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth='md'
                scroll='paper'
            >
                <DialogTitle>
                    <Grid
                        container
                        direction='row'
                        justify='space-between'
                        alignItems='center'
                    >
                        <Grid item>
                            <h1>Order the Cards</h1>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <DDList
                            currentOrder={currentOrder}
                            onChange={setOrder}
                            {...props}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save Order</Button>
                </DialogActions>
            </StyledDialog>
        </>
    );
};

const DDList = ({
    currentOrder: cardList,
    onChange,
    options,
    iconMap,
    ...props
}) => {
    const onDragEnd = result => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newOrderItems = reorder(
            cardList,
            result.source.index,
            result.destination.index
        );

        onChange(newOrderItems);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {cardList.map((item, index) => (
                            <Draggable
                                key={item.uuid}
                                draggableId={item.uuid}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        <DragItem
                                            card={item}
                                            options={options}
                                            iconMap={iconMap}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

const uuidv4 = () => {
    return 'xxx4xxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

const DragItem = ({ index, card, options, iconMap, ...props }) => {
    const color =
        card.color_front || card.color || options.default_color || 'black';

    const cardProps = { card_data: card, options, iconMap };

    return (
        <div
            {...props}
            className='card'
            style={{
                height: 80,
                width: '100%',
                color,
                borderColor: color,
                backgroundColor: color,
                borderRadius: 4,
                zIndex: 10,
            }}
        >
            <Icon {...cardProps} />
            <Title {...cardProps} />
        </div>
    );
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
        background: 'rgb(235,235,235)',
    }),
    marginBottom: 4,
});

const getListStyle = isDraggingOver => ({
    // background: isDraggingOver ? 'lightblue' : 'lightgrey',
    width: '100%',
});
