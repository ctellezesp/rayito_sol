import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import firebase from "./firebase/config";
import Menu from './menu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import swal from 'sweetalert';
import './index.css';

export default class CreateTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            value: ''
        }
    }

    setTag = (event) => {
        let key = event.target.value.replace(/ /g,"-");
        const mapObj = {
            Á: "a",
            É:" e",
            Í: "i",
            Ó: "o",
            Ú: "u",
            á: "a",
            é: "e",
            í: "i",
            ó: "o",
            ú: "u"
         };
        key = key.replace(/Á|É|Í|Ó|Ú|á|é|í|ó|ú/gi, function(matched){
           return mapObj[matched];
         });
        key = key.toLowerCase();
        this.setState({
            name: event.target.value,
            value: key
        });
        console.log(key);
    }

    save = () => {
        firebase.db.collection("tags").add(this.state)
        .then(res => {
            swal("Categoría agredada", `${this.state.name} agregada`, "success")
            .then(()=>{
                this.props.history.push("/list-tags");
            });
        })
        .catch(err => {
            console.log(err);
            swal("Error", "Verifica tus datos", "error");
        });
    }

    render() {
        return(
            <div className="main">
                <Menu />
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={12} lg={8}>
                        <Paper style={{padding: '20px'}}>
                            <Grid container>
                                <Grid className="spaced-field" item xs={12}>
                                    <TextField style={{width: '100%'}} id="outlined-basic" label="Nombre de la categoria" variant="outlined" onChange={this.setTag} />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        style={{marginTop: '10px'}}
                                        startIcon={<SaveIcon />}
                                        onClick={this.save}
                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}