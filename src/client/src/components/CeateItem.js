import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
class CreateItem extends Component {

    state = {
        lists : [],
        list_id : "",
        description : "",
    }

    componentWillMount = async () =>{
        const url = `http://localhost:3000/api/lists/`;
        const httpResponse = await fetch(url);
        const jsonResponse = await httpResponse.json();
        this.setState({
            lists : jsonResponse.data
        });
    }

    handleListChange = (e) =>{
        this.setState({
            list_id : e.target.value
        })
    }

    handleDescriptionChange = (e) => {
        this.setState({ description: e.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: this.state.description,
                list_id: this.state.list_id
            })
        };
        const url = `http://localhost:3000/api/items`;
        const httpResponse = await fetch(url, options);
        const jsonResponse = await httpResponse.json();
        console.log(jsonResponse);
        this.setState({redirect : true});
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to="/items" />
            );
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="description">Description of the item</label>
                    <input type="text" className="form-control" id="description" placeholder="Enter description of the item" onChange={this.handleDescriptionChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="list">Select list</label>
                    <select className="form-control" id="list" onChange={this.handleListChange}>
                        {this.state.lists.map(list =>(
                            <option key={list._id} value={list._id}>
                                {list.name}
                            </option>
                        ))};
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        );
    }
}

export default CreateItem;