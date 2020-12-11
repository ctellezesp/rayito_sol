import React, {Component} from 'react';
import ProductCard from './card';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import {Planets} from 'react-preloaders';
import MenuMain from './menu-main';
import Fab from '@material-ui/core/Fab';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "./firebase/config";
import './index.css';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      current: [],
      tags: [],
      init: true,
      loading: true
    }
    this.setTag = this.setTag.bind(this);
    this.resetTag = this.resetTag.bind(this);
  }

  setTag(tag) {
    let result = this.state.products.filter(product => {
      return product.data().tags.includes(tag);
    });
    this.setState({
      current: result,
      init: false
    });
  }

  resetTag() {
    this.setState({
      current: this.state.products,
      init: true
    });
  }


  componentDidMount() {
    firebase.db.collection("items").where("active", "==", true).get()
    .then(res => {
        this.setState({
            current: res.docs,
            products: res.docs,
            loading: false
          });
    })
    .catch(err => {
        console.log(err);
    });
    firebase.db.collection("tags").orderBy("name", "asc").get()
    .then(res => {
        this.setState({
            tags: res.docs,
            loading: false
        });
    })
    .catch(err => {
        console.log(err);
    })
  }

  render() {
    return (
      <div className="main-home">
        <MenuMain />
        <Grid container>
          <div className="scroll">
            <Chip label="Inicio" onClick={this.resetTag} />
            {this.state.tags.map((tag, index) => {
              return <Chip key={index} label={tag.data().name} onClick={() => this.setTag(tag.data().value)} />
            })}
          </div>
        </Grid>
        {this.state.init == true && <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <img style={{width: '100%', height: 'auto', borderRadius: '20px'}} src="https://i.imgur.com/YVTyndx.jpg" />
          </Grid>
        </Grid>}
        {this.state.init == false && <Grid container spacing={2}>
          {this.state.current.length > 0 && this.state.current.map((product, index) => {
            return (
              <Grid item xs={12} md={4} lg={3} key={index}>
                <ProductCard title={product.data().name} price={product.data().price} image={product.data().img} />
              </Grid>
            )
          })}
          {this.state.current.length <= 0 && <h3 style={{color: 'black', padding: '20px'}}>No hay productos disponibles de esta categoria</h3>}
        </Grid>}
        <a href="https://www.instagram.com/joyeria_rayito_de_sol/" target="_blank">
          <Fab size="medium" aria-label="add" style={{position: 'fixed', bottom: 0, right: 0, backgroundColor: '#C13584', color: 'white'}}>
            <InstagramIcon />
          </Fab>
        </a>
        <a href="https://www.facebook.com/Joyeria.Rayito.de.Sol" target="_blank">
          <Fab size="medium" aria-label="add" style={{position: 'fixed', bottom: 0, right: 0, marginRight: '55px', backgroundColor: '#3B5998', color: 'white'}}>
            <FacebookIcon />
          </Fab>
        </a>
        <Planets customLoading={this.state.loading} color="#FFFFFF" background="#fce4ec" />
      </div>
    );
  }
}
