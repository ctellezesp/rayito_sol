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

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            img: 'https://i.imgur.com/ATTiCmE.jpg',
            imageID: '',
            allTags: [],
            tags: []
        }
    }

    componentDidMount() {
        firebase.db.collection("tags").orderBy('name', 'asc').get()
        .then(res => {
            console.log(res.docs);
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
            img: imageURL,
            imageID: imageID
        });
    }

    save = () => {
        const toSave = {
            "name": this.state.name,
            "price": this.state.price,
            "img": this.state.img,
            "imageID": this.state.imageID,
            "tags": this.state.tags,
            "active": true
        }
        firebase.db.collection("items").add(toSave)
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
                <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
                    <Grid item xs={12} lg={8}>
                        <Paper style={{padding: '20px'}}>
                            <Grid container spacing={2}>
                                <Grid className="spaced-field" item xs={12} lg={8}>
                                    <TextField style={{width: '100%'}} id="outlined-basic" label="Nombre articulo" variant="outlined" onChange={this.setName} />
                                </Grid>
                                <Grid className="spaced-field" item xs={12} lg={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            onChange={this.setPrice}
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            labelWidth={60}
                                            type="string"
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
                                            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name={tag.data().value} onChange={() => this.setTag(tag.data().value)}/>}
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