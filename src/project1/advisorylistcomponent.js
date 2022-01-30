import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import CardText from 'material-ui/Card'
import AutoComplete from "material-ui/AutoComplete/index";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import '../App.css'
import urls from './urls';

const muiTheme = getMuiTheme({
    card: {
        titleColor: '#006400',
        fontWeight: 600
    },
    cardText: {
        textColor: "#006400"
    },
    table: {
        backgroundColor: '#ffffff'
    },
    tableRow: {
        textColor: '#006400',
        borderColor: '#000000',
        hoverColor: '#b9f6ca',
        stripeColor: '#333333'
    },
    textField: {
        textColor: '#006400',
        hintColor: '#006400',
        floatingLabelColor: '#006400',
        focusColor: '#006400'
    },
    tableHeader: {
        borderColor: '#000000'
    },
    tableHeaderColumn: {
        textColor: '##006400'
    }
});

class ListAdvisory extends React.Component {

    constructor() {

        super();

        this.state = {
            selectedMsg: '',
            user: '',
            advisories: [],
        };
    }

    handleUpdateInput = (searchPick) => {
        this.setState({selectedMsg: searchPick})
    };

    handleSelectedUser = (searchPick) => {
        let user = this.props.users.find(u => u === searchPick);
        this.setState({user: user});
        this.fetchAdvisories(this.state.user);
        this.refs[`user`].setState({searchText:''});


    };

    fetchAdvisories = async (name) => {

        try {
            let response = await fetch(urls.ADVISORYBYNAMEURL + name);
            let json = await response.json();

            this.setState({advisories: json});
        } catch (error) {

        }
    };

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <CardText>
                        <div className="center greenTitle">
                            Advisories for {this.state.selectedMsg}
                        </div>
                        <div className="center">
                            <AutoComplete
                                ref={`user`}
                                floatingLabelText="Enter a User"
                                filter={AutoComplete.caseInsensitiveFilter}
                                maxSearchResults={5}
                                onUpdateInput={this.handleUpdateInput}
                                dataSource={this.props.users}
                                onNewRequest={this.handleSelectedUser}
                            />
                        </div>
                        <Table className="space">
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn>Country</TableHeaderColumn>
                                    <TableHeaderColumn>Travel Alert</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {this.state.advisories.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableRowColumn style={{whiteSpace: 'normal', wordWrap: 'break-word'}}>
                                            {row.Country}
                                        </TableRowColumn>
                                        <TableRowColumn style={{whiteSpace: 'normal', wordWrap: 'break-word'}}>
                                            {row.Alert} {row.Time}
                                        </TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardText>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default ListAdvisory