import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Navbar extends Component {

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Marketplace</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
              <Link class="nav-link" to="/addproduct">
              Add Product
        </Link>
      </li>
    </ul>
    <span class="navbar-text">
      Your Account No: {this.props.account}
    </span>
  </div>
</nav>
    );
  }
}

export default Navbar;
