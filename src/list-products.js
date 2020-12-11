import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import Menu from './menu';
import {Planets} from 'react-preloaders';
import firebase from "./firebase/config";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import swal from 'sweetalert';
import './index.css';

export default class ListProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            rendering: [],
            tags: [],
            loading: true
        }
    }

    componentDidMount() {
        firebase.db.collection("items").orderBy("name", "asc").get()
        .then(res => {
            this.setState({
                products: res.docs,
                rendering: res.docs,
                loading: false
            });
        });
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

    fetchData() {
        firebase.db.collection("items").orderBy("name", "asc").get()
        .then(res => {
            this.setState({
                products: res.docs,
                rendering: res.docs
            });
        });
    }

    enable = (id) => {
        firebase.db.collection("items").doc(id).update({
            active: true
        })
        .then(res => {
            this.fetchData();
        })
        .catch(err => {
            console.log(err);
        })
    }

    unable = (id) => {
        firebase.db.collection("items").doc(id).update({
            active: false
        })
        .then(() => {
            this.fetchData();
        })
        .catch(err => {
            console.log(err);
        })
    }

    resetTag = () => {
        this.setState({
            rendering: this.state.products
        });
    }

    setTag = (tag) =>  {
        let result = this.state.products.filter(product => {
          return product.data().tags.includes(tag);
        });
        this.setState({
          rendering: result
        });
      }

    delete = (id, image) => {
        swal({
            title: "¿Quieres eliminar este artículo?",
            text: "El producto se eliminará permanentemente",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              firebase.db.collection("items").doc(id).delete()
              .then(res => {
                swal("Producto eliminado", {
                  icon: "success",
                });
                if(image !== ""){
                    const imageRef = firebase.storage.ref().child('items').child(image);
                    imageRef.delete();
                }
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

    render() {
        return(
            <div className="main">
                <Menu />
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={12} lg={8}>
                        <Link to="/create">
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<AddIcon />}
                            >
                                Agregar Producto
                            </Button>
                        </Link>
                        <Grid container>
                            <Grid item xs={12}>
                                <div className="scroll" style={{marginTop: '15px'}}>
                                    <Chip label="Todos" onClick={this.resetTag} />
                                    {this.state.tags.map((tag, index) => {
                                        return <Chip key={index} label={tag.data().name} onClick={() => this.setTag(tag.data().value)} />
                                    })}
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Producto</TableCell>
                                            <TableCell align="right">Disponible</TableCell>
                                            <TableCell align="right">Editar</TableCell>
                                            <TableCell align="right">Eliminar</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {this.state.rendering.map((product, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {product.data().name}
                                                </TableCell>
                                                <TableCell align="right"><IconButton aria-label="show">{product.data().active ? <VisibilityIcon fontSize="small" style={{color: 'green'}} onClick={() => this.unable(product.ref.id)} />: <VisibilityOffIcon fontSize="small" style={{color: 'red'}} onClick={() => this.enable(product.ref.id)} />}</IconButton></TableCell>
                                                <TableCell align="right"><Link to={`edit-product/${product.ref.id}`}><IconButton aria-label="show"><EditIcon fontSize="small" /></IconButton></Link></TableCell>
                                                <TableCell align="right"><IconButton aria-label="show" onClick={() => this.delete(product.ref.id, product.data().imageID)}><DeleteIcon fontSize="small" style={{color: 'red'}} /></IconButton></TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Planets customLoading={this.state.loading} color="#FFFFFF" background="#fce4ec" />
            </div>
        );
    }
}