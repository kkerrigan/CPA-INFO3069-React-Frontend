import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog'

import TopBar from './topbar'

class Exercise2Component extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }

    handleOpenDialog = () => this.setState({open: true});

    handleCloseDialog = () => this.setState({open: false});

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <TopBar viewDialog={this.handleOpenDialog} />
                    <Dialog title="Dialog Info" modal={false} open={this.state.open}
                            onRequestClose={this.handleCloseDialog}>
                        <h3>Some interesting information would go here</h3>

                    </Dialog>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default Exercise2Component