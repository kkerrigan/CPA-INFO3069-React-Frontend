import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import CardText from 'material-ui/Card'
import Snackbar from 'material-ui/Snackbar'
import AutoComplete from 'material-ui/AutoComplete'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import '../App.css'
import urls from './urls'
let moment = require('moment');

const muiTheme = getMuiTheme({
    card: {
        titleColor: '#006400',
        fontWeight: 600
    },
    cardText: {
        textColor: "#006400"
    },
    raisedButton: {
        primaryColor: '#006400',
        primaryTextColor: '#ffffff',
        disabledColor: '#455a64',
        disabledTextColor: '#ffffff'
    },
    textField: {
        textColor: '#006400',
        hintColor: '#006400',
        floatingLabelColor: '#006400',
        focusColor: '#006400'
    },
    snackbar: {
        textColor: '#ffffff',
        backgroundColor: '#006400',
        actionColor: '#000000'
    }
});

class AddAdvisory extends React.Component {

    constructor() {

        super();

        this.state = {
            name: "",
            country: null,
            success: false,
            disabled: true,
            advisoryMessage: '',
            nameErrorMsg: 'You must enter your name.',
            countryErrorMsg:'You must select a country.'
        };
    }

    handleRequestClose = () => {
        this.setState({success: false});
    };

    updateName = (value) => {
        if(value !== '') {
            this.setState({name: value});
            this.setState({nameErrorMsg: ''});
            this.buttonToggle();
        }else {
            this.setState({name: value});
            this.setState({nameErrorMsg: 'You must enter your name.'});
            this.buttonToggle();
        }
    };

    handleUpdateInput = (searchPick) => {
        if(searchPick !== ''){
            this.setState({countryErrorMsg: ''});
        }else{
            this.setState({countryErrorMsg: 'You must select a country.'});
        }
    };

    handleSelectedCountry = (searchPick) => {
        let country = this.props.countries.find(u => u === searchPick);
        this.setState({country: country});
        this.buttonToggle();
    };

    buttonToggle = () => {

        if(this.state.name !== '' && this.state.country !== null) {
            this.setState({disabled: false});
        }else{
            this.setState({disabled:true});
        }
    };


    addAdvisory = async () => {

        let alert = this.state.country.Alert;
        let country = this.state.country.Name;
        let code = this.state.country.Code;
        let name = this.state.name;
        let time = moment().format("YYYY-MM-DD HH:mm").toString();

        let doc = {
            Name: name,
            Country: country,
            Code: code,
            Alert: alert,
            Time: time
        };

        let advisoryStr = JSON.stringify(doc);
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        try {
            let response = await fetch(urls.ADDADVISORYURL, {
                method: 'POST',
                headers: myHeaders,
                body: advisoryStr
            });
            let json = await response.json();
            let msg = json.Msg;
            this.setState({advisoryMessage: msg});
            this.setState({success: true})
        } catch (error) {
            this.setState({advisoryMessage: 'Problem adding a new advisory'});
            this.setState({success: false})
        } finally {
            this.setState({name: ''});
            this.refs[`country`].setState({searchText:''});
            this.setState({disabled: true});
            this.setState({country: null});
            this.setState({countryErrorMsg: 'You must select a country.'});
            this.setState({nameErrorMsg: 'You must enter your name.'});
        }
    };

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <CardText>
                        <div className="center greenTitle">
                            Add Advisory
                        </div>

                        <div className="center">
                            <TextField hintText="Enter user's name here"
                                       ref={`name`}
                                       value={this.state.name}
                                       onChange={(event) => this.updateName(event.target.value)}
                                       errorText={this.state.nameErrorMsg}/><br/>
                            <AutoComplete
                                ref={`country`}
                                floatingLabelText="Country of Travel"
                                filter={AutoComplete.fuzzyFilter}
                                maxSearchResults={5}
                                onUpdateInput={this.handleUpdateInput}
                                dataSource={this.props.countries}
                                dataSourceConfig={{text: 'Name', value: 'Name'}}
                                onNewRequest={this.handleSelectedCountry}
                                errorText={this.state.countryErrorMsg}
                            />
                        </div>
                        <div className="center space">
                            <RaisedButton label="Add Advisory"
                                          disabled={this.state.disabled}
                                          primary={true}
                                          onClick={this.addAdvisory}
                                          />
                        </div>
                    </CardText>
                    <Snackbar
                        open={this.state.success}
                        message={this.state.advisoryMessage}
                        autoHideDuration={2000}
                        onRequestClose={this.handleRequestClose}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default AddAdvisory