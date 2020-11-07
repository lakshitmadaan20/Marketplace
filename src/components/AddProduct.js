import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'

class AddProduct extends Component {
    render() {
        return (
          <div className="container">
          <h2 className="text-center">Add Product</h2>
          <div className="jumbotron">
          <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const description = this.productDescription.value
          const image = this.productImage.value
          const phone = this.productPhone.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, price, description, image, phone)
        }}>
            <div className="form-group mr-sm-2">
            <label>Product Name</label>
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Enter Product Name"
              required />
            </div>
            <div className="form-group mr-sm-2">
            <label>Product Price</label>
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Enter Product Price in Ether"
              required />
            </div>
            <div className="form-group mr-sm-2">
            <label>Product Description</label>      
              <textarea
              rows="5"
              id="productDescription"
              type="text"
              ref={(input) => { this.productDescription = input }}
              className="form-control"
              placeholder="Enter Product Description"
              required />
          </div>
            <div className="form-group mr-sm-2">
            <label>Image URL</label>
            <input
              id="productImage"
              type="text"
              ref={(input) => { this.productImage = input }}
              className="form-control"
              placeholder="Enter Product Image url"
              required />
          </div>
            <div className="form-group mr-sm-2">
            <label>Phone No.</label>
            <input
              id="productPhone"
              type="phone"
              ref={(input) => { this.productPhone = input }}
              className="form-control"
              placeholder="Enter your phone no."
              required />
          </div>
          <Button type="submit" className="btn btn-block btn-outline-success">Add Product</Button>
        </form>
             </div>
             
            </div>
        )
    }
}

export default AddProduct
