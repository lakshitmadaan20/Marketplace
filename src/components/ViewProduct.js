import React, { Component, Fragment } from 'react'
import Marketplace from '../abis/Marketplace.json'
import Web3 from 'web3'

class ViewProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
          account: '',
          productCount: 0,
          products: [],
          loading: true,
          productId:''
        }
    
     
        this.purchaseProduct = this.purchaseProduct.bind(this)
      }
        
    async componentWillMount() {
    let productId = this.props.match.params.productId;
    this.setState({ productId: productId})
    console.log(productId)
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
    
    purchaseProduct(id,price) {
        this.setState({ loading: true })
        this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
        .once('receipt', (receipt) => {
          this.setState({ loading: false })
        })
      }

    render() {
        
        return (
            <div class="container">
                {
                    this.state.loading ? 
                    <div className="container"> 
                    <div class="d-flex justify-content-center">
                    <button class="btn btn-primary">
                      <span class="spinner-grow spinner-grow-sm"></span>
                       Loading...
                     </button>
                </div>
                    </div> 
                    : 
                    
                <div>
                {this.state.products.map((product, key) => {
                    if (this.state.productId === product.id.toString()) {
                        return (
                          <div key={key}>
                               <div className="row">
                                    <div className="col-6">
                                        <div className="product-img">
                                        <img
                                            src={product.image}
                                            alt=""
                                            className="mb-3"
                                            style={{ maxHeight: "50%", maxWidth: "50%" }}
                                        />
                                        </div>
                                    </div>

                                    <div className="col-6">
                                    <div className="card">
                                   <div className="card-header text-white bg-dark">{product.name}</div>
                                     <div className="card-body">
                                    <p className="black-6">Description: {product.description}</p>
                                    <p className="black-7">
                                        Price: {window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth
                                     </p>
                                     <p className="black-8">Status: {product.purchased?  <span class="badge badge-danger">Sold</span>: <span class="badge badge-warning">Available</span> }</p>
                                    <p className="black-9">Owner: {product.owner}</p>
                                    <p className="black-9">Owner Name: {product.purchased ? 'Not Available' : `${product.category}`}</p>
                                    <p className="black-10"> Owner Phone No: {product.purchased ? 'Not Available' : `${product.phone}`}</p>
                                                {
                                                    !product.purchased ?
                                                    <button
                                                    className="btn btn-success btn-block"
                                                    color="green"
                                                    name={product.id}
                                                    value={product.price}
                                                    onClick={(event) => {
                                                      this.purchaseProduct(event.target.name, event.target.value)
                                                    }}
                                                  >
                                                    Buy
                                                  </button>
                                                     :
                                                    ""
                                                          
                                    }        
                                    </div>
                                      </div>
                                    </div>
                            </div>
                            </div>
                        )
                    }
                })}
            </div>
            }
         </div>
        )
    }
    
}

export default ViewProduct;