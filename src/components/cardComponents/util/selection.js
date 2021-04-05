import styled from '@emotion/styled';
import {
    Button as button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Popper,
    TextField as textField,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import { CompactPicker, GithubPicker } from 'react-color';
import { RRC } from '.';
import { css_color_names } from '../data/color';

const Button = styled(button)`
    width: 100%;
    height: 100%;
    font-size: 12px;
`;

const ClearButton = styled(button)`
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
const TextField = styled(textField)`
    width: 100%;
`;

export const ColorSelector = ({
    color,
    onChange,
    width = 12,
    emptyMessage = 'No color selected',
    ...props
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleColor = ({ hex }) => {
        const adjusted = hex.toUpperCase() === 'TRANSPARENT' ? '' : hex;
        if (typeof onChange === 'function') onChange(adjusted);
        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <>
            <Button
                style={{
                    position: 'relative',
                    height: '48px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
                onClick={handleClick}
            >
                <span
                    style={{
                        backgroundColor: color,
                        height: '24px',
                        width: '24px',
                        position: 'absolute',
                        top: '50%',
                        left: '24px',
                        WebkitTransform: 'translate(-50%, -50%)',
                        MsTransform: 'translate(-50%, -50%)',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
                <span
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '48px',
                        WebkitTransform: 'translate(0%, -50%)',
                        MsTransform: 'translate(0%, -50%)',
                        transform: 'translate(0%, -50%)',
                    }}
                >
                    {color ? 'Color ' + color : emptyMessage}
                </span>
            </Button>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <CompactPicker
                    {...props}
                    color={color}
                    triangle='top-left'
                    width={12 + width * 25}
                    onChange={handleColor}
                />
            </Popper>
        </>
    );
};

export const IconSelector = ({
    label = 'Default icon',
    iconMap,
    value,
    onChange,
    emptyMessage = 'No icon selected',
    ...props
}) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(20);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { path, id } = iconMap[value] || {};

    const searchValue = inputValue.split(' ').join('-');
    let options = Object.values(iconMap).filter(op =>
        op.id.includes(searchValue)
    );
    const maximumPages = Math.floor(options.length / pageSize);

    //Check if the search value has matches
    if (options.length) {
        //Enact page filter
        options = options.filter(
            (_, i) => i >= page * pageSize && i < (page + 1) * pageSize
        );
        //Check that page filter has matches
        if (options.length === 0 && page > 0) {
            //No match, set to page zero
            setPage(0);
        } else {
            // Match, do expensive string transform
            options = options.map(op => ({
                ...op,
                name: (inputValue
                    ? op.id.split(searchValue).join('***' + searchValue + '***')
                    : op.id
                )
                    .split('-')
                    .join(' '),
                current: op.id === id,
            }));
        }
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clickIcon = iconId => {
        if (typeof onChange === 'function') onChange(iconId);
        handleClose();
    };

    return (
        <>
            <Button
                style={{
                    position: 'relative',
                    height: '48px',
                    overflow: 'hidden',
                }}
                onClick={handleOpen}
            >
                <img
                    style={{
                        backgroundColor: 'black',
                        height: '24px',
                        width: '24px',
                        position: 'absolute',
                        top: '50%',
                        left: '24px',
                        WebkitTransform: 'translate(-50%, -50%)',
                        MsTransform: 'translate(-50%, -50%)',
                        transform: 'translate(-50%, -50%)',
                        display: path ? 'initial' : 'none',
                    }}
                    src={path || ''}
                    alt=''
                />
                <span
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '48px',
                        WebkitTransform: 'translate(0%, -50%)',
                        MsTransform: 'translate(0%, -50%)',
                        transform: 'translate(0%, -50%)',
                    }}
                >
                    {value || emptyMessage}
                </span>
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
                            <h1>Select an icon</h1>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent dividers style={{ overflow: 'hidden' }}>
                    <p>
                        Select an icon. You can search by the name of the icon.
                        All icons are credited to{' '}
                        <a target='_blank' href='https://game-icons.net/'>
                            game-icons.net
                        </a>
                        . You should use their site for a more detailed search
                        function.
                    </p>
                    <Grid
                        container
                        direction='row'
                        justify='space-between'
                        alignItems='center'
                    >
                        <Grid item xs={6}>
                            <TextField
                                label='Search for Icon'
                                value={inputValue}
                                onChange={event =>
                                    setInputValue(event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item>
                            <ClearButton
                                color='secondary'
                                variant='contained'
                                onClick={() => clickIcon('')}
                            >
                                No Icon
                            </ClearButton>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogContent dividers>
                    <Grid container spacing={1}>
                        {options.map((op, i) => (
                            <IconOption key={i} {...op} onClick={clickIcon} />
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Pagination
                        count={maximumPages}
                        page={page + 1}
                        onChange={(e, newValue) => setPage(newValue - 1)}
                    />
                </DialogActions>
            </StyledDialog>
        </>
    );
};

const IconOption = ({ id, name, path, current, onClick, ...props }) => {
    return (
        <Grid item {...props}>
            <div
                style={{
                    border: 'solid black 2px',
                    textAlign: 'center',
                }}
                onClick={() => onClick(id)}
            >
                {path ? (
                    <img
                        style={{
                            backgroundColor: 'black',
                            height: '160px',
                            width: '160px',
                            display: 'block',
                        }}
                        src={path}
                        alt=''
                    />
                ) : (
                    <div
                        style={{
                            backgroundColor: 'black',
                            height: '160px',
                            width: '160px',
                            display: 'block',
                        }}
                    />
                )}
                <button
                    style={{
                        height: '40px',
                        width: '160px',
                        display: 'block',
                    }}
                >
                    {RRC(name)}
                </button>
            </div>
        </Grid>
    );
};
