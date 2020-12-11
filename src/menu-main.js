import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class MenuMain extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <AppBar position="static" style={{marginBottom: '15px'}}>
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1, color: 'white', textAlign: 'center', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                        <img src="https://i.imgur.com/VWISE8H.png" style={{height: '50px', width: 'auto', marginRight: '15px', borderRadius: '50%'}} />
                        <span>Rayito de Sol</span>
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}