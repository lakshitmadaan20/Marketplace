import React, { Component, Fragment } from 'react'
import Marketplace from '../abis/Marketplace.json'
import Web3 from 'web3'

import { Link } from 'react-router-dom'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
          account: '',
          productCount: 0,
          products: [],
          loading: true
        }
    
        // this.createProduct = this.createProduct.bind(this)
        // this.purchaseProduct = this.purchaseProduct.bind(this)
      }
    
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
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if(networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call()
      this.setState({ productCount })
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
    }
    

    render() {
        return (
            <Fragment>
                <div className="container">
                <div>
                    <h1 className="text-center">New Products</h1>
              </div>
              <br/>
                <div className="row">
                {this.state.products.map((product, key) => {
                    return (
                      <Fragment>
                         <div className="col-4 mb-3">
                            <div className="card text-center" style={{borderBlockColor:'fff'}}>
                                <div className="card-header bg-dark text-white">{product.name}</div>
                                <div className="card-body">
                                    <div className="product-img">
                                        <img
                                            src={product.image}
                                            alt=""
                                            className="mb-3"
                                            style={{ maxHeight: "50%", maxWidth: "50%" }}
                                        />
                                     </div>
                                    <p className="black-6">Description: {product.description.substring(0,100)}</p>
                                    <p className="black-7">
                                        Price: {window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth
                                     </p>
                                  
                                     <p className="black-9">Status: {product.purchased? <span class="badge badge-danger">Sold</span>: <span class="badge badge-warning">Available</span> }</p>
                                    <p className="black-10">Owner: {product.owner}</p>
                                    <Link className="nav-link" to={`product/${product.id}`}>
                                    <button className=" btn btn-block btn-primary">View product</button>
                                    </Link>
                                </div>
                          </div>
                        </div>
                       </Fragment>
                    )
                })}
              </div>
           </div>
            </Fragment>
        )
   }
}

export default Home
