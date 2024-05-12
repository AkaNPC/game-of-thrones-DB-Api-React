import React from 'react';
import Spinner from '../spinner/spinner';
import GotService from '../../services/gotService';
import ItemList from '../itemList';

const withData = (View, getData) => {
    return class extends React.Component {
        state = {
            data: null
        }

        componentDidMount() {
            getData()
                .then((data) => {
                    this.setState({
                        data
                    })
                })
        }

        render() {
            const { data } = this.state;

            if (!data) {
                return <Spinner />
            }
            return <View {...this.props} data={data} />
        }
    }
}

const { getData } = new GotService();
export default withData (ItemList, getData);