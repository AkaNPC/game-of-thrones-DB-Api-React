import React from "react";
import gotService from "../../services/gotService";
import ItemList from "../itemList";
import ErrorMessage from "../errorMessage/errorMessage";
import withRouter from "../withRouterHook/withRouterHook";

class BooksPage extends React.Component {
    gotService = new gotService();

    state = {
        error: false
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

        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({ name }) => name} />
        )
    }
}

export default withRouter(BooksPage);
