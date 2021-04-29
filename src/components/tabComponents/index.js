import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component='div'
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
        style: { minWidth: 0 },
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export const TabManager = ({
    names,
    tabContent,
    orientation = 'horizontal',
    tabProps = {},
    ...props
}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position='static' variant='outlined' {...props}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant='fullWidth'
                    {...tabProps}
                >
                    {names.map((name, i) => (
                        <Tab key={i} label={name} {...a11yProps(i)} />
                    ))}
                </Tabs>
            </AppBar>
            {tabContent.map((content, i) => (
                <TabPanel key={i} value={value} index={i}>
                    {content}
                </TabPanel>
            ))}
        </div>
    );
};
