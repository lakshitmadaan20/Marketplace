import React, {Component} from 'react';
import Web3 from 'web3'

class CarouselHomepage extends Component {
  
  render() {

    return (
      <div>
        <div className="jumbotron">
          <p>Your Account Number: {this.props.account}</p>
          <p>Your Account Balance: {window.web3.utils.fromWei(this.props.balance.toString(), 'Ether')} Eth</p>
        </div>
      </div>
    )
  }
}

export default CarouselHomepage;
