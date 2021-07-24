import React, { Component } from 'react';
import '../collection/home.css';
import Navbar from '../components/navbar1';
import info from '../img/info.png';
import info2 from '../img/info2.png';
import info3 from '../img/info3.png';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { IconButton } from '@material-ui/core';
import Footer from '../components/Footer';
import Slider from 'react-slick';
class InfoHome extends Component {
  render() {
    return (
      <div className="roothome">
        <section class="carousel">
          <ol class="carousel__viewport">
            <li id="carousel__slide1" tabindex="0" class="carousel__slide">
              <div class="carousel__snapper">
                <a href="#carousel__slide4" class="carousel__prev">
                  Go to last slide
                </a>
                <a href="#carousel__slide2" class="carousel__next">
                  Go to next slide
                </a>
              </div>
            </li>
            <li id="carousel__slide2" tabindex="0" class="carousel__slide">
              <div class="carousel__snapper">
                <a href="#carousel__slide1" class="carousel__prev">
                  Go to previous slide
                </a>
                <a href="#carousel__slide3" class="carousel__next">
                  Go to next slide
                </a>
              </div>
            </li>
            <li id="carousel__slide3" tabindex="0" class="carousel__slide">
              <div class="carousel__snapper">
                <a href="#carousel__slide2" class="carousel__prev">
                  Go to previous slide
                </a>
                <a href="#carousel__slide1" class="carousel__next">
                  Go to first slide
                </a>
              </div>
            </li>
          </ol>
          <aside class="carousel__navigation">
            <ol class="carousel__navigation-list">
              <li class="carousel__navigation-item">
                <a href="#carousel__slide1" class="carousel__navigation-button">
                  Go to slide 1
                </a>
              </li>
              <li class="carousel__navigation-item">
                <a href="#carousel__slide2" class="carousel__navigation-button">
                  Go to slide 2
                </a>
              </li>
              <li class="carousel__navigation-item">
                <a href="#carousel__slide3" class="carousel__navigation-button">
                  Go to slide 3
                </a>
              </li>
            </ol>
          </aside>
        </section>
        <Footer />
      </div>
    );
  }
}
export default InfoHome;
