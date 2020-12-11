import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Menu from './menu';
import { v4 as uuidv4 } from 'uuid';
import firebase from "./firebase/config";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import swal from 'sweetalert';
import './index.css';

export default class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            name: '',
            price: 0.00,
            img: 'https://i.imgur.com/ATTiCmE.jpg',
            allTags: [],
            tags: []
        }
    }

    componentDidMount() {
        firebase.db.collection("items").doc(this.state.id).get()
        .then(res => {
            this.setState({
                name: res.data().name,
                price: res.data().price,
                img: res.data().img,
                tags: res.data().tags
            });
        })
        .catch(err => {
            console.log(err);
        });
        firebase.db.collection("tags").orderBy('name', 'asc').get()
        .then(res => {
            this.setState({
                allTags: res.docs
            })
        })
        .catch(err => {
            console.log(err)
        });
    }

    setName = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    setPrice = (event) => {
        this.setState({
            price: event.target.value
        });
    }

    setImg = (event) => {
        this.setState({
            img: event.target.value
        });
    }

    setTag = (tag) => {
        if(this.state.tags.includes(tag)) {
            const newTags = this.state.tags.filter(tagState => tagState !== tag);
            this.setState({
                tags: newTags
            });
        } else {
            this.setState({
                tags: [...this.state.tags, tag]
            });
        }
    }

    uploadImage = async (image) => {
        const imageID = uuidv4();
        const imageRef = await firebase.storage.ref().child('items').child(imageID);
        await imageRef.put(image);
        const imageURL = await imageRef.getDownloadURL();
        this.setState({
            img: imageURL
        });
    }

    save = () => {
        const toSave = {
            "name": this.state.name,
            "price": this.state.price,
            "img": this.state.img,
            "tags": this.state.tags,
            "active": true
        }
        firebase.db.collection("items").doc(this.state.id).set(toSave, {merge: true})
        .then(res => {
            swal("Articulo agredado", `${this.state.name} agregado`, "success")
            .then(()=>{
                this.props.history.push("/list-products");
            });
        })
        .catch(err => {
            console.log(err);
            swal("Error", "Verifica tus datos", "error");

        });

    }

    selectFile = (event) => {
        console.log(event.target.files[0]);
        const image = event.target.files[0];
        if(image === undefined) {
            swal("Error,", "No se selecciono una imagen", "error");
            return;
        }
        if(image.type.startsWith('image')) {
            this.uploadImage(image);
        } else {
            swal("Error,", "Formato de imagen no valido", "error");
        }
    }

    render() {
        return(
            <div className="main">
                <Menu />
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={12} lg={8}>
                        <Paper style={{padding: '20px'}}>
                            <Grid container>
                                <Grid className="spaced-field" item xs={12} lg={8}>
                                    <TextField style={{width: '100%'}} id="outlined-basic" label="Nombre articulo" variant="outlined" value={this.state.name} onChange={this.setName} />
                                </Grid>
                                <Grid className="spaced-field" item xs={12} lg={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            value={this.state.price}
                                            onChange={this.setPrice}
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            labelWidth={60}
                                            type="number"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid className="spaced-field" item xs={12}>
                                    <TextField style={{width: '100%'}} id="outlined-basic" label="URL Imagen" variant="outlined" value={this.state.img} onChange={this.setImg} />
                                </Grid>
                                <Grid className="space-field" item xs={12}>
                                    <input
                                        accept="image/*"
                                        style={{display: 'none'}}
                                        id="contained-button-file"
                                        type="file"
                                        onChange={e => this.selectFile(e)}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="primary" component="span">
                                            Subir Imagen
                                        </Button>
                                    </label>
                                </Grid>
                                <Grid className="spaced-field" item xs={12}>
                                    {this.state.allTags.map((tag, index) => {
                                        return <FormControlLabel key={index}
                                            control={<Checkbox checked={this.state.tags.includes(tag.data().value)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} name={tag.data().value} onChange={() => this.setTag(tag.data().value)}/>}
                                            label={tag.data().name}
                                        />
                                    })}
                                </Grid>
                            </Grid>
                            <Grid container direction="row" justify="flex-end" alignItems="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<SaveIcon />}
                                    onClick={this.save}
                                >
                                    Guardar
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid xs={12} lg={2}>
                        <Paper>
                            <img src={this.state.img} style={{width: '100%', height: 'auto'}} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}