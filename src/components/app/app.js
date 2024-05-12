import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import './app.css';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../pages/characterPage';
import BooksPage from '../pages/booksPage';
import HousesPage from '../pages/housesPage';
import BooksItem from '../pages/booksItem';
import gotService from '../../services/gotService';

import { Routes, Route } from 'react-router-dom';


export default class App extends React.Component {
    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    };

    // Ловим и обрабатываем ошибки
    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }


    ToggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {
        const toggle = this.state.showRandomChar ? <RandomChar interval={15000} /> : null;
        const btnClass = 'toggleBtn';

        if (this.state.error) {
            return <ErrorMessage />
        }
        return (
            <>
                <Container>
                    <Header />
                </Container >
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {toggle}
                            <button
                                className={btnClass}
                                onClick={this.ToggleRandomChar}>Toggle character</button>
                        </Col>
                    </Row>
                        <Routes>
                            <Route path='/*' element={() => <h1>Welcome to GOT Database</h1>} />
                            <Route path='/characters' element={<CharacterPage/>} />
                            <Route path='/houses' element={<HousesPage/>} />
                            <Route path='/books/*' element={<BooksPage/>} />
                            <Route path='/books/:id' render={
                                ({ match }) => {
                                    const { id } = match.params;

                                    return <BooksItem bookId={id} />
                                }
                            } />
                        </Routes>
                </Container>
            </>
        )
    }
};

