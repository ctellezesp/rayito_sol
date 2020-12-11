import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Menu from './menu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className="main">
                <Menu />
                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                    <Grid item xs={12} md={4} lg={3}>
                        <Link to="/create">
                            <Paper style={{padding: '20px', textAlign: 'center'}}>
                                Agregar Articulo
                            </Paper>
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Link to="/list-products">
                            <Paper style={{padding: '20px', textAlign: 'center'}}>
                                Ver Articulos
                            </Paper>
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Link to="/create-tag">
                            <Paper style={{padding: '20px', textAlign: 'center'}}>
                                Agregar Categoría
                            </Paper>
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Link to="/list-tags">
                            <Paper style={{padding: '20px', textAlign: 'center'}}>
                                Ver Categorias
                            </Paper>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        );
    }
}