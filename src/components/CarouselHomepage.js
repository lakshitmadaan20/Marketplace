import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  Col,
  Row,
} from 'reactstrap';

const styles = {
  sliderContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color:'white'
  }
}

const items = [
  
    {
      src: 'https://cryptoconsulting.info/wp-content/uploads/2018/10/Blockchain-marketplace.jpg',
      altText: 'Slide 1',
      caption: 'Slide 1',
      title: 'Unbiased Launches Data Marketplace To Improve AI And ML Transparency With Blockchain Technology',
      subtitle: 'Unbiased uses Telos to record events on the blockchain, protecting data transparency, trustworthiness, and ethics in the multi-billion dollar AI industry',
     
    },
    {
      src: 'https://www.pwc.de/en/real-estate/pwc-blockchain-in-real-estate.png',
      altText: 'Slide 2',
      caption: 'Slide 2',
      title: 'VeriTX: The Blockchain-powered Aerospace Marketplace',
      subtitle: 'VeriTX and Algorand collaborate to bring digitise and bring transparency to the aerospace marketplace with blockchain-powered additive manufacturing.',
      
    },
    {
      src: 'https://cdn.newswire.com/files/x/98/4e/15929dd2fac08cd26dce8fc55675.jpg',
      altText: 'Slide 3',
      caption: 'Slide 3',
      title: 'Blockchain-based electricity trading platform launched in German municipality',
      subtitle: 'Wildpoldsried will be the focus for the demo phase of a research project by Siemens, the regional utility Allgäuer Überlandwerk and partners to help develop a local energy marketplace.'
      
    }
  
];

class CarouselHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }


  onExited = () => {
    this.animating = false;
  }

  next = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(x => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={x.src}
        >
          <Row  style={{backgroundColor: '#00003f'}}>
            <Col md="6">
              <img src={x.src} alt={x.altText} style={{width: '100%', maxHeight: '500px'}}/>
            </Col>
            <Col md="6" style={styles.sliderContent}>
              <h3>{x.title}</h3>
              <p>{x.subtitle}</p>
            </Col>
          </Row>
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default CarouselHomepage;
