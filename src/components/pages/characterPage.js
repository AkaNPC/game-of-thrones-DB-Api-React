import React from "react";
import ItemList from '../itemList';
import ItemDetails, { Field } from "../itemDetails/itemDetails";
import ErrorMessage from "../errorMessage/errorMessage";
import gotService from '../../services/gotService';
import RowBlock from "../RowBlock/RowBlock";

export default class CharacterPage extends React.Component {
    gotService = new gotService();

    state = {
        selectedChar: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        });
        console.log(this.selectedChar)
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={({ name, gender }) => `${name} (${gender})`} />
        )

        const itemDetails = (
            <ItemDetails
                itemId={this.state.selectedChar}
                getData={this.gotService.getCharacter}>
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </ItemDetails>
        )
        return (
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}