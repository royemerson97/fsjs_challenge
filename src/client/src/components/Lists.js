import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Lists extends Component {
    state = {
        lists: [],
    }

    handleEraseClick = async (list_id) => {
        const options = {
            method: 'DELETE'
        };
        const url = `http://localhost:3000/api/lists/${list_id}`;
        const httpResponse = await fetch(url, options);
        const jsonResponse = await httpResponse.json();
        console.log(jsonResponse);
        await this.getLists();
    }

    getLists = async () => {
        const httpResponse = await fetch('http://localhost:3000/api/lists');
        const jsonResponse = await httpResponse.json();
        this.setState({ lists: jsonResponse.data });
    }

    componentWillMount = async () => {
        await this.getLists();
    }

    render() {
        if (this.state.lists === null) {
            return (
                <p>Working</p>
            );
        } else {
            return (
                <div>
                    <Link to="/lists/create">Create list</Link>
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Is Visible?</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.lists.map(list => (
                                <tr key={list._id}>
                                    <td>{list.name}</td>
                                    <td>{list.visible.toString()}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => this.handleEraseClick(list._id)}>Erase</button>
                                        
                                        <Link to={`/lists/edit/${list._id}`} className="btn btn-primary">Edit</Link>
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

export default Lists;
