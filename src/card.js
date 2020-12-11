import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <Card>
                <CardActionArea>
                    <CardMedia
                        style={{height: 300}}
                        image={this.props.image}
                        title={this.props.title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h5">
                        {this.props.title}
                    </Typography>
                    <Typography variant="body2" className="price-color" color="textSecondary" component="p">
                        {this.props.price === "" ? '' : `$${this.props.price}`}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}