import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../collection/nav.css';
class MainPage extends Component {
  componentDidMount() {}
  render() {
    return (
      <>
        <nav>
          <ul class="menu">
            {this.props.user.role === 'Owner' ? (
              <>
                <li>
                  <a onClick={() => this.props.history.push('/main')}>Home</a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      this.props.history.push('/mainNav/employeeManage')
                    }
                  >
                    Employee
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      this.props.history.push('/mainNav/menumanage')
                    }
                  >
                    Menu
                  </a>
                </li>
                <li>
                  {/* ********************************************************************************** */}
                  <a
                    onClick={() =>
                      this.props.history.push('/mainNav/GraphMain')
                    }
                  >
                    Graph
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      this.props.history.push('/mainNav/settingMain')
                    }
                  >
                    Setting
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      this.props.history.push('/mainNav/orderManage')
                    }
                  >
                    Order
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      this.props.history.push('/mainNav/kitchenOrder')
                    }
                  >
                    Kitchen
                  </a>
                </li>
              </>
            ) : this.props.user.role === 'cash' ? (
              <>
                <li>
                  <a onClick={() => this.props.history.push('/main')}>Home</a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      this.props.history.push('/mainNav/orderManage')
                    }
                  >
                    Order
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      this.props.history.push('/mainNav/kitchenOrder')
                    }
                  >
                    Kitchen
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a onClick={() => this.props.history.push('/main')}>Home</a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      this.props.history.push('/mainNav/kitchenOrder')
                    }
                  >
                    Kitchen
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div ID="container">
          <div ID="fryingpanouter"></div>
          <div ID="innerfryingpan">
            <div ID="oil"></div>
            <div ID="oil2"></div>
            <div ID="eggcontainer">
              <div ID="egg1"></div>
              <div ID="egg2"></div>
              <div ID="egg3"></div>
              <div ID="yolk"></div>
            </div>
          </div>
          <div ID="handletop">
            <div ID="handlebottom"></div>
            <div ID="handlehole"></div>
          </div>
          <div ID="handlebridge"></div>
        </div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
  employee: state.employee,
  menu: state.menu,
  order: state.order,
  kitchen: state.kitchen,
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(MainPage);
