import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
class CreateList extends Component {
    state = {
        name: '',
        visible: false,
        redirect: false
    }

    handleVisibleChange = () => {
        this.setState(prevState => ({
            visible: !prevState.visible
        }));
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                visible: this.state.visible
            })
        };
        const url = `http://localhost:3000/api/lists`;
        const httpResponse = await fetch(url, options);
        const jsonResponse = await httpResponse.json();
        console.log(jsonResponse);
        this.setState({redirect : true});
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to="/lists" />
            );
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name of the list</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter name of the lists" onChange={this.handleNameChange} />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="visible" onChange={this.handleVisibleChange} />
                    <label className="form-check-label" htmlFor="visible">is this list Visible?</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        );
    }
}

export default CreateList;
