import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import CardText from 'material-ui/Card'
import Snackbar from 'material-ui/Snackbar'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import urls from './urls';
import '../App.css'

const muiTheme = getMuiTheme({
    card: {
        titleColor: '#1b5e20',
        fontWeight: 600
    },
    cardText: {
        textColor: "#1b5e20"
    },
    table: {
        backgroundColor: '#ffffff'
    },
    tableRow: {
        textColor: '#1b5e20',
        borderColor: '#000000',
        hoverColor: '#b9f6ca',
        stripeColor: '#333333'
    },
    tableHeader: {
        borderColor: '#000000'
    },
    tableHeaderColumn: {
        textColor: '#1b5e20'
    },
    snackbar: {
        textColor: '#ffffff',
        backgroundColor: '#1b5e20',
        actionColor: '#000000'
    }
});

class AlertComponent extends React.Component {

    constructor() {

        super();
        this.state = {
            message: [],
            strings: [],
            snackbarMessage: '',
            gotData: false,
            displayTable: false
        };

        this.fetchAlerts();
    }

    handleRequestClose = () => {
        this.setState({gotData: false});
    };

    fetchAlerts = async () => {

        try {
            let response = await fetch(urls.ALERTSETUPURL);
            let json = await response.json();

            this.setState({message: json});
            let strArray = this.state.message.results.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
            this.setState({strings: strArray});
            this.setState({gotData: true});
            this.setState({displayTable: true});
            this.setState({snackbarMessage: 'Alerts setup successfully!'});
        }
        catch (error) {
            this.setState({snackbarMessage: 'There was a problem with setting up the alerts'});
            this.setState({gotData: false});
            this.setState({displayTable: false});
        }

    };

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <CardText>
                        <Table>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn>Steps</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                <TableRow>
                                    <TableRowColumn style={{whiteSpace: 'normal', wordWrap: 'break-word'}}>
                                        {this.state.strings[0]}
                                    </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{whiteSpace: 'normal', wordWrap: 'break-word'}}>
                                        {this.state.strings[1]}
                                    </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{whiteSpace: 'normal', wordWrap: 'break-word'}}>
                                        {this.state.strings[2]}
                                    </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{whiteSpace: 'normal', wordWrap: 'break-word'}}>
                                        {this.state.strings[3]}
                                    </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{whiteSpace: 'normal', wordWrap: 'break-word'}}>
                                        {this.state.strings[4]}
                                    </TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn style={{whiteSpace: 'normal', wordWrap: 'break-word'}}>
                                        {this.state.strings[5]}
                                    </TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardText>
                    <Snackbar
                        open={this.state.gotData}
                        message={this.state.snackbarMessage}
                        autoHideDuration={2000}
                        onRequestClose={this.handleRequestClose}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default AlertComponent
