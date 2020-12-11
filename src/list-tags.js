import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Menu from './menu';
import {Planets} from 'react-preloaders';
import firebase from "./firebase/config";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import swal from 'sweetalert';
import './index.css';

export default class ListTags extends Component {
    constructor(props){
        super(props);
        this.state = {
            tags: [],
            loading: true
        }
    }

    componentDidMount() {
        firebase.db.collection("tags").orderBy("name", "asc").get()
        .then(res => {
            this.setState({
                tags: res.docs,
                loading: false
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    delete = (id) => {
        swal({
            title: "¿Quieres eliminar esta categoría?",
            text: "La categoría se eliminará permanentemente",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              firebase.db.collection("tags").doc(id).delete()
              .then(res => {
                swal("Categoría eliminada", {
                  icon: "success",
                });
                this.fetchData();
              })
              .catch(err => {
                swal("Error", {
                  icon: "error",
                });
              })
            } else {
              swal("El producto NO fue eliminado");
            }
          });
    }

    fetchData = () => {
        firebase.db.collection("tags").orderBy("name", "asc").get()
        .then(res => {
            this.setState({
                tags: res.docs
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render(){
        return(
            <div className="main">
                <Menu />
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={12} lg={8}>
                    <Link to="/create-tag">
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<AddIcon />}
                            >
                                Agregar Categoría
                            </Button>
                        </Link>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Categoría</TableCell>
                                    <TableCell align="right">Eliminar</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {this.state.tags.map((tag, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {tag.data().name}
                                        </TableCell>
                                        <TableCell align="right"><IconButton aria-label="show" onClick={() => this.delete(tag.ref.id)}><DeleteIcon fontSize="small" style={{color: 'red'}} /></IconButton></TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Planets customLoading={this.state.loading} color="#FFFFFF" background="#fce4ec" />
            </div>
        );
    }
}