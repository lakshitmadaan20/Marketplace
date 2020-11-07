import React, { Component, Fragment } from 'react';
import Web3 from 'web3'
import './App.css';
import Navbar from './Navbar'
import ViewProduct from './ViewProduct'
import Home from './Home'
import Product from './Product'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CarouselHomepage from './CarouselHomepage'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    
  }

  constructor(props) {
    super(props)
    this.state = {
      account: ''
    }

   }

  
  render() {
    return (
      <Fragment>
        <Router>
          <Navbar account={this.state.account} />
          <CarouselHomepage/>
        <hr/>
            <Switch>
            <Route path='/' exact component={Home} />
              <Route path='/addproduct' exact component={Product} />
              <Route path="/product/:productId" exact component={ViewProduct}/>
            </Switch> 
      </Router>
      </Fragment>
    );
  }
}

export default App;
