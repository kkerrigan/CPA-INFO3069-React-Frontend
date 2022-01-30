import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardHeader} from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem'
import List from 'material-ui/svg-icons/action/list'
import IconButton from 'material-ui/IconButton'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AlertComponent from './alert-setupcomponent'
import AddAdvisory from './advisoryaddcomponent'
import ListAdvisory from './advisorylistcomponent'
import '../App.css'
import logo from '../images/logo.png'
import urls from './urls'

const muiTheme = getMuiTheme({
    appBar: {
        color: '#D52B1E',
            textColor: '#c8e6c9'
    },
    card: {
        titleColor: '#1b5e20',
            fontWeight: 600
    },
    cardText: {
        textColor: "#1b5e20"
    },
    menu: {
        backgroundColor: '#d50000'
    },
    menuItem: {
        hoverColor: '#1b5e20'
    }
});

class Project1Component extends React.Component {

    constructor() {

        super();
        this.state = {
            setupAlerts: null,
            addComponent: null,
            listComponent: null,
            gotData: false,
            messages: [],
            countries: [],
            uniqueUsers: []
        };

        this.fetchCountryAlerts();
    }

    createAlertComponent = () => {
        this.setState({
            setupAlerts: true,
            addComponent: false,
            listComponent: false
        });
    };

    createAddAdvisoryComponent = () => {
        this.setState({
            addComponent: true,
            setupAlerts: false,
            listComponent: false
        });
    };

    createListAdvisoryComponent = () => {
        this.fetchUniqueName();
        this.setState({
            addComponent: false,
            setupAlerts: false,
            listComponent: true
        });


    };

    returnToHomePage = () => {
        this.setState({
            setupAlerts: false,
            addComponent: false,
            listComponent: false
        });
    };

    fetchCountryAlerts = async () => {

        try {
            let response = await fetch(urls.COUNTRIESURL);
            let json = await response.json();

            this.setState({countries: json});
        }
        catch (error) {

        }
    };

    fetchUniqueName = async() => {

        try{
            let response = await fetch(urls.UNIQUENAMESURL);
            let json = await response.json();

            this.setState({uniqueUsers: json});
        } catch (error) {

        }
    };

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Card style={{marginTop: '5%', marginLeft: '5%', width: '90%'}}>
                    <AppBar title="Case Study #1"
                            iconElementLeft={
                                <IconMenu iconButtonElement={<IconButton><List
                                    color="white"/></IconButton>}>
                                    <MenuItem primaryText="Home"
                                        onClick={this.returnToHomePage}/>
                                    <MenuItem primaryText="Setup Alerts"
                                        onClick={this.createAlertComponent}/>
                                    <MenuItem primaryText="Add a Tourist Advisory"
                                        onClick={this.createAddAdvisoryComponent}/>
                                    <MenuItem primaryText="List Tourist Advisories"
                                        onClick={this.createListAdvisoryComponent}/>
                                </IconMenu>
                            }>
                    </AppBar>
                    <CardHeader>
                        <div className="center">
                            <img src={logo} alt="Logo" />
                            <h3 className="header">Global Travel Alerts</h3>
                        </div>
                    </CardHeader>
                    {!this.state.setupAlerts ? null : <AlertComponent />}
                    {!this.state.addComponent ? null : <AddAdvisory countries = {this.state.countries} />}
                    {!this.state.listComponent ? null : <ListAdvisory users = {this.state.uniqueUsers} />}
                </Card>
            </MuiThemeProvider>

        )
    }
}

export default Project1Component