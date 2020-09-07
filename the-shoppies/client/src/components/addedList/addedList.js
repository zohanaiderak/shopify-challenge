import React from 'react';

class AddedList extends React.Component{

    removed = () => {
        const { id , name } = this.props;
        const removed = {
            id : id,
            name : name
        };
        this.props.onRemove(removed);
    }
    render () {
        const { name } = this.props;
        return (
                <ul className = "result__list" >
                    <li>
                        { name }
                        <button 
                            onClick = { this.removed }
                            value = { name }
                            className = "result__button"
                        > Remove
                        </button>
                    </li>
                </ul>
        )
    }
}

export default AddedList;
