import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Items extends Component {
    state = {
        items: [],
    }

    handleEraseClick = async (item_id) => {
        const options = {
            method: 'DELETE'
        };
        const url = `http://localhost:3000/api/items/${item_id}`;
        const httpResponse = await fetch(url, options);
        const jsonResponse = await httpResponse.json();
        console.log(jsonResponse);
        await this.getItems();
    }

    getItems = async () => {
        const httpResponse = await fetch('http://localhost:3000/api/items');
        const jsonResponse = await httpResponse.json();
        this.setState({ items: jsonResponse.data });
    }

    componentWillMount = async () => {
        await this.getItems();
    }

    render() {
        if (this.state.lists === null) {
            return (
                <p>Working</p>
            );
        } else {
            return (
                <div>
                    <Link to="/items/create">Create item</Link>
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Item description</td>
                                <td>List name</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.items.map(item => (
                                <tr key={item._id}>
                                    <td>{item.description}</td>
                                    <td>{item.list.name}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => this.handleEraseClick(item._id)}>Erase</button>
                                        
                                        <Link to={`/items/edit/${item._id}`} className="btn btn-primary">Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default Items;
