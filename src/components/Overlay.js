import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Collapse,
    TextField,
    InputAdornment,
    Typography,
    IconButton,
    Popover,
    Button,
} from '@material-ui/core';
import { Help, KeyboardArrowDown as Arrow, VerticalAlignCenter as GoTo } from '@material-ui/icons';
import Locations from './Locations';
import MapSelect from './MapSelect';
import FavoritesMenu from './FavoritesMenu';
import HelperText from './HelperText';

const styles = theme => ({
    textField: {
        width: 75,
    },
    main: {
        zIndex: 2,
        position: 'fixed',
        marginLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        width: 257,
    },
    resultsPos: {
        zIndex: 2,
        position: 'relative',
        marginTop: theme.spacing.unit,
    },
    arrow: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    arrowShift: {
        transform: 'rotate(180deg)',
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    headerText: {
        marginLeft: theme.spacing.unit * 2,
    },
    popOver: {
        marginLeft: theme.spacing.unit,
    },
    popOverText: {
        margin: theme.spacing.unit,
        maxWidth: 257 + theme.spacing.unit * 5,
    },
    goto: {
        zIndex: 2,
        transform: 'translate(102px, -127px)',
    },
    rightPanel: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        right: 0,
        width: 300,
    },
});

const Overlay = props => {
    const { classes, selectedTile, centerCoords, selectMap, selectedMap, zoom, favorites, modFavorites } = props;
    // anchorEl / doAnchor used for HelperText popover
    const [anchorEl, doAnchor] = useState(null);
    // mathIn / toggleMath used for math menu collapse
    const [mathIn, toggleMath] = useState(true);
    const [gpsValues, setValue] = useState({ input: [100, 50], actualX: [6, 7], actualY: [49, 51] });
    const xDivisor = gpsValues.actualX[1] - gpsValues.actualX[0],
        yDivisor = gpsValues.actualY[1] - gpsValues.actualY[0],
        xModifier = gpsValues.input[0] - gpsValues.actualX[0] / xDivisor,
        yModifier = gpsValues.input[1] - gpsValues.actualY[0] / yDivisor;

    return (
        <>
            <div className={classes.main}>
                <Paper>
                    <Typography
                        className={classes.headerText}
                        onClick={() => toggleMath(!mathIn)}
                        variant="overline"
                        align="center"
                        id="tableTitle"
                    >
                        Do telescience math
                        <IconButton disabled className={mathIn ? classes.arrow : classes.arrowShift}>
                            <Arrow />
                        </IconButton>
                    </Typography>
                    <Collapse in={mathIn}>
                        <Table padding="dense">
                            <TableHead>
                                {/* HEADER */}
                                <TableRow>
                                    <TableCell align="center">Console coord</TableCell>
                                    <TableCell align="center">GPS coord</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* CONSOLE X1 // ACTUAL X1 */}

                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            disabled={!mathIn}
                                            onChange={e => update(e, 'input', 0)}
                                            value={gpsValues.input[0]}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">X1</InputAdornment>,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            disabled={!mathIn}
                                            onChange={e => update(e, 'actualX', 0)}
                                            value={gpsValues.actualX[0]}
                                        />
                                    </TableCell>
                                </TableRow>

                                {/* CONSOLE Y1 // ACTUAL Y1 */}

                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            disabled={!mathIn}
                                            onChange={e => update(e, 'input', 1)}
                                            value={gpsValues.input[1]}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">Y1</InputAdornment>,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            disabled={!mathIn}
                                            onChange={e => update(e, 'actualY', 0)}
                                            value={gpsValues.actualY[0]}
                                        />
                                    </TableCell>
                                </TableRow>

                                {/* CONSOLE X2 // ACTUAL X2 */}

                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            key="gpsX1"
                                            value={gpsValues.input[0] + 1}
                                            disabled
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">X2</InputAdornment>,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            disabled={!mathIn}
                                            onChange={e => update(e, 'actualX', 1)}
                                            value={gpsValues.actualX[1]}
                                        />
                                    </TableCell>
                                </TableRow>

                                {/* CONSOLE Y2 // ACTUAL Y2 */}

                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            value={gpsValues.input[1] + 1}
                                            disabled
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">Y2</InputAdornment>,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            disabled={!mathIn}
                                            onChange={e => update(e, 'actualY', 1)}
                                            value={gpsValues.actualY[1]}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Collapse>
                </Paper>
                <Paper className={classes.resultsPos}>
                    <Typography
                        className={classes.headerText}
                        variant="overline"
                        align="center"
                        id="tableTitle"
                        onClick={event => {
                            let val = event.currentTarget;
                            doAnchor(val);
                        }}
                    >
                        Real Coordinates
                        <IconButton disabled>
                            <Help />
                        </IconButton>
                    </Typography>
                    <Table padding="dense">
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        className={classes.textField}
                                        value={selectedTile[0]}
                                        onChange={e => {
                                            let val = parseInt(e.target.value);
                                            if (!val) val = 0;
                                            props.transform(prev => {
                                                prev.selectedTile[0] = val;
                                                return prev;
                                            });
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">X</InputAdornment>,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        className={classes.textField}
                                        value={selectedTile[1]}
                                        onChange={e => {
                                            let val = parseInt(e.target.value);
                                            if (!val) val = 0;
                                            props.transform(prev => {
                                                prev.selectedTile[1] = val;
                                                return prev;
                                            });
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Y</InputAdornment>,
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Typography variant="overline" align="center">
                        Console Coordinates
                    </Typography>
                    <Table padding="dense">
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        disabled
                                        className={classes.textField}
                                        value={selectedTile[0] / xDivisor + xModifier}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">X</InputAdornment>,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        disabled
                                        className={classes.textField}
                                        value={selectedTile[1] / yDivisor + yModifier}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Y</InputAdornment>,
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                <Popover
                    className={classes.popOver}
                    aria-label="Math help"
                    id="math-tips"
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => doAnchor(null)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Typography align="center" variant="caption" className={classes.popOverText}>
                        Stuck? Check the SS13 wiki on
                        <Button
                            size="small"
                            href="https://wiki.ss13.co/Telescience#Decoding_the_teleporter"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            decoding the teleporter
                        </Button>
                        <HelperText />
                    </Typography>
                </Popover>
                <IconButton
                    tabIndex={-1}
                    className={classes.goto}
                    onClick={() => {
                        // Want this to center the screen on the coordinates, and set the zoom level
                        return centerCoords();
                    }}
                >
                    <GoTo />
                </IconButton>
                <Locations math={{ divisors: [xDivisor, yDivisor], modifiers: [xModifier, yModifier] }} />
            </div>
            <div className={classes.rightPanel}>
                <MapSelect selectMap={selectMap} selectedMap={selectedMap} />
                <FavoritesMenu
                    zoom={zoom}
                    centerCoords={centerCoords}
                    favorites={favorites}
                    selectedMap={selectedMap}
                    modFavorites={modFavorites}
                    math={{ divisors: [xDivisor, yDivisor], modifiers: [xModifier, yModifier] }}
                />
            </div>
        </>
    );
    function update(e, target, index) {
        let val = parseInt(e.target.value);
        if (!val) val = 0;
        setValue(prev => {
            prev[target][index] = val;
            return prev;
        });
    }
};

export default withStyles(styles)(Overlay);