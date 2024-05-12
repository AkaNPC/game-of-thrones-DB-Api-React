import React from "react";
import gotService from "../../services/gotService";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails/itemDetails";
import ErrorMessage from "../errorMessage/errorMessage";
import RowBlock from "../RowBlock/RowBlock";

export default class HousesPage extends React.Component {
    gotService = new gotService();

    state = {
        selectedHouse: null,
        error: false
    }

    onItemSelected = (name) => {
        this.setState({
            selectedHouse: name
        });
        console.log(this.selectedHouse)
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
                getData={this.gotService.getAllHouses}
                renderItem={({ name }) => `${name}`} />
        )

        const itemDetails = (
            <ItemDetails
                itemId={this.state.selectedHouse}
                getData={this.gotService.getHouse}>
                <Field field='region' label='Region' />
                <Field field='words' label='Words' />
                <Field field='titles' label='Titles' />
                <Field field='ancestralWeapons' label='Ancestral Weapons' />
            </ItemDetails>
        )
        return (
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}