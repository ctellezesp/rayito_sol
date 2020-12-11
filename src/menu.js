import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <AppBar position="static" style={{marginBottom: '15px'}}>
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1, color: 'white'}}>
                        Rayito de Sol
                    </Typography>
                    <Link to="/dashboard"><Button color="inherit" style={{color: 'white'}}>Dashboard</Button></Link>
                    <Link to="/list-products"><Button color="inherit" style={{color: 'white'}}>Productos</Button></Link>
                    <Link to="/"><Button color="inherit" style={{color: 'white'}}>Home</Button></Link>
                </Toolbar>
            </AppBar>
        );
    }
}