import React from 'react';

class Results extends React.Component {
    selected = () => {
        const { id , name , year } = this.props;
        const selectedVal = {
            name : `${name}(${year})`,
            id : id
        };
        this.props.onSelect(selectedVal);
    }

    render() {
        const { name, year, disabled, id } = this.props;
        return (
            <ul className = "result__list">
                <li>
                    { name }({ year })
                    <button 
                        id = { id }
                        onClick = { this.selected } 
                        value = { `${ name }(${ year })` } 
                        disabled = { disabled }
                        className = "result__button"
                    > Nominate
                    </button>
                </li>
            </ul>
        )
    }
}

export default Results;