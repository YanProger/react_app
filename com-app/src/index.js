import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Row extends React.Component {
    render(){
        return (
            <div className="row">
                {<Cell cellValue="val1"/>}
                {<Cell cellValue="val2"/>}
            </div>
        );
    }
}

class Cell extends React.Component {
    render(){
        return (
            <div className="cell">
                {this.props.cellValue}
            </div>

        );
    }
}

// class Table extends React.Component {
//     render() {
//         return (
//             <div className="shopping-list">
//                 <h1>Shopping List for {this.props.name}</h1>
//                 <ul>
//                     <li>Instagram</li>
//                     <li>WhatsApp</li>
//                     <li>Oculus</li>
//                     <li>Oculussdasdsa</li>
//                 </ul>
//             </div>
//         );
//     }
// }

//--------------------------------

ReactDOM.render(
  <Row cellCount={9}/>,
    document.getElementById('root')
);