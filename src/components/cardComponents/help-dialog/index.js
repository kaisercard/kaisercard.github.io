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
    useTheme
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { TabManager } from '../../tabComponents';
import ContentText from './content-text';
import PrintingText from './printing';


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

const HelpDialog = () => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant='contained' onClick={handleOpen}>
                Open Help
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
                            <h1>How to Use</h1>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <TabManager
                        names={['Styling Content', "Printing Cards"]}
                        tabContent={[<ContentText />, <PrintingText />]}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </StyledDialog>
        </>
    );
};

export default HelpDialog;
