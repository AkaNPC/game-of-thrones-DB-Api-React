import React from "react";
import ItemDetails, { Field } from "../itemDetails/itemDetails";
import gotService from '../../services/gotService';

export default class BooksItem extends React.Component {
    gotService = new gotService();



    render() {
        return (
            <ItemDetails
                itemId={this.props.bookId}
                getData={this.gotService.getBook}>
                <Field field='numberOfPages' label='Number og pages' />
                <Field field='publisher' label='Publisher' />
                <Field field='released' label='Released' />
            </ItemDetails>
        )
    }
}