import React, { Component } from 'react'
import AddProduct from './AddProduct'
import Marketplace from '../abis/Marketplace.json'
import Web3 from 'web3'
import {Redirect} from 'react-router-dom'

export default class Product extends Component {

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
        } else {
          window.alert('Marketplace contract not deployed to detected network.')
        }
      }
    

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            loading: false
        }
        
    this.createProduct = this.createProduct.bind(this)
   //this.purchaseProduct = this.purchaseProduct.bind(this)
    }

    createProduct(name, description, image, price, phone) {
        this.setState({ loading: true })
        this.state.marketplace.methods.createProduct(name,description,image, price, phone).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            this.setState({ loading: false})
        })
    }

    
    render() {
        return (
            <div classname="container">
                <div className="mt-5">
                {this.state.loading ?
                    <div class="d-flex justify-content-center jumbotron">
                        <button class="btn btn-primary">
                          <span class="spinner-grow spinner-grow-sm"></span>
                           Loading...
                         </button>
                    </div> :

                    <AddProduct createProduct={this.createProduct} />
                }
                </div>   
            </div>
        )
    }
}
