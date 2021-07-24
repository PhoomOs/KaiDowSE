import React from 'react';
import QRCode from 'qrcode.react';
import { IconButton, Typography, Button, Box } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CancelIcon from '@material-ui/icons/Cancel';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import './index/styleCalculator/DisplayToolbar.css';
import './index/styleCalculator/Buttons.css';
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import * as Calculator from './index/calculator-core';
import './index/styleCalculator/App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import qrcode from '../assets/kaidowlogo.png';
import ReplayIcon from '@material-ui/icons/Replay';
import { connect } from 'react-redux';
import { confirmCashPayment, addSummary } from '../redux/action/paymentAction';
import { ContactSupportOutlined } from '@material-ui/icons';
class calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formula: [],
      totalprice: this.props.priceSummary,
      input: '0',
      afterCalculation: false,
      status: 'cash',
      hours: 0,
      minutes: 0,
      seconds: 0,
      status2: 0,
    };
    this.hoursInput = React.createRef();
    this.minutesInput = React.createRef();
    this.secondsInput = React.createRef();

    this.onTextareaChanged = this.onTextareaChanged.bind(this);

    this.onDigit = this.onDigit.bind(this);
    this.onOperator = this.onOperator.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onEqual = this.onEqual.bind(this);
    this.onDecimal = this.onDecimal.bind(this);
    this.onParenthesis = this.onParenthesis.bind(this);
    this.onBackspace = this.onBackspace.bind(this);
  }

  onDigit({ target }) {
    const digit = target.innerText;
    const input = this.state.input;

    if (this.state.afterCalculation) {
      this.setState({
        input: digit,
        afterCalculation: false,
      });
    } else if (input === '0') {
      this.setState({
        input: digit,
      });
    } else if (Calculator.isNotNumber(input)) {
      this.setState({
        input: digit,
        formula: this.state.formula.concat(input),
      });
    } else {
      this.setState({
        input: input.concat(digit),
      });
    }
  }

  onDecimal({ target }) {
    const decimal = target.innerText;
    const input = this.state.input;

    if (this.state.afterCalculation) {
      this.setState({
        input: `0${decimal}`,
        afterCalculation: false,
      });
    } else if (Calculator.isNotNumber(input)) {
      this.setState({
        input: `0${decimal}`,
        formula: this.state.formula.concat(input),
      });
    } else if (!input.includes(decimal)) {
      this.setState({
        input: input.concat(decimal),
      });
    }
  }

  onOperator({ target }) {
    const operator = target.innerText;
    const input = this.state.input;

    if (Calculator.isOperator(input)) {
      this.setState({
        input: operator,
        afterCalculation: false,
      });
    } else if (input !== '(') {
      this.setState({
        formula: this.state.formula.concat(this.state.input),
        input: operator,
        afterCalculation: false,
      });
    }
  }

  onParenthesis({ target }) {
    const parenthesis = target.innerText;
    const input = this.state.input;

    if (parenthesis === '(') {
      if (
        (Calculator.isNumber(input) && input !== '0') ||
        (Calculator.isNumber(input) &&
          input === '0' &&
          this.state.formula.length > 0) ||
        input === ')'
      ) {
        this.setState({
          input: parenthesis,
          formula: this.state.formula.concat([input, '*']),
          afterCalculation: false,
        });
      } else if (Calculator.isOperator(input) || input === '(') {
        this.setState({
          input: parenthesis,
          formula: this.state.formula.concat(input),
          afterCalculation: false,
        });
      } else if (
        Calculator.isNumber(input) &&
        input === '0' &&
        this.state.formula.length === 0
      ) {
        this.setState({
          input: parenthesis,
          afterCalculation: false,
        });
      }
    } else {
      const arrayOpenParenthesis = this.state.formula.join('').match(/\(/g);
      const numOpenParenthesis = arrayOpenParenthesis
        ? arrayOpenParenthesis.length
        : 0;

      const arrayCloseParenthesis = this.state.formula.join('').match(/\)/g);
      const numCloseParenthesis = arrayCloseParenthesis
        ? arrayCloseParenthesis.length
        : 0;

      if (
        (Calculator.isNumber(input) || input === ')') &&
        numOpenParenthesis > 0 &&
        numOpenParenthesis > numCloseParenthesis
      ) {
        this.setState({
          input: parenthesis,
          formula: this.state.formula.concat(input),
          afterCalculation: false,
        });
      }
    }
  }

  onClear() {
    this.setState({
      formula: [],
      input: '0',
      afterCalculation: false,
    });
  }

  onBackspace() {
    const input = this.state.input;
    const formula = this.state.formula;
    const currentInputLength = input.length;

    if (input === 'Infinity' || input === '-Infinity' || input === 'NaN') {
      this.setState({
        input: '0',
        afterCalculation: false,
      });
    } else if (currentInputLength > 1) {
      this.setState({
        input: input.slice(0, currentInputLength - 1),
        afterCalculation: false,
      });
    } else if (input !== '0') {
      this.setState({
        input: '0',
        afterCalculation: false,
      });
    } else if (formula.length > 0) {
      this.setState({
        input: formula[formula.length - 1],
        formula: formula.slice(0, formula.length - 1),
        afterCalculation: false,
      });
    }
  }

  onEqual() {
    const finalFormula = this.state.formula.concat(this.state.input);
    const result = Calculator.evaluate(finalFormula);

    if (!Number.isNaN(result)) {
      const newHistoryItem = {
        formula: finalFormula,
        result: result,
      };

      this.setState({
        input: result + '',
        formula: [],
        afterCalculation: true,
      });
    }
  }

  onTextareaChanged() {
    // Don't care
  }

  closeDialog = () => {
    this.props.Close();
  };

  handleClickCash = () => {
    this.setState({ status: 'cash' });
  };

  handleClickBank = () => {
    this.setState({ status: 'bank' });
    //here
  };

  render() {
    return (
      <div>
        {this.state.status === 'cash' ? (
          this.state.status2 === 0 ? (
            <div className="calculator">
              {console.log('stateStatus = ', this.state.status)}
              <div className="display-toolbar">
                <div className="toolbar">
                  <div>
                    <IconButton
                      className="toolbar-item"
                      onClick={this.handleClickCash.bind(this)}
                      style={{ marginRight: '20px', marginLeft: '10px' }}
                    >
                      <AttachMoneyIcon />
                    </IconButton>
                    <IconButton
                      className="toolbar-item"
                      onClick={this.handleClickBank.bind(this)}
                    >
                      <AccountBalanceIcon />
                    </IconButton>
                    <IconButton
                      className="toolbar-item"
                      onClick={this.closeDialog.bind(this)}
                      style={{ marginLeft: '210px' }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </div>
                </div>
                <form className="display">
                  <textarea
                    className="display-formula"
                    onChange={this.onTextareaChanged}
                    value={this.state.formula.join('')}
                  ></textarea>
                  <textarea
                    // className="display-formula"
                    // onChange={this.onTextareaChanged}
                    value={this.state.totalprice}
                  ></textarea>

                  <textarea
                    className="display-input"
                    id="display"
                    rows="1"
                    onChange={this.onTextareaChanged}
                    value={this.state.input}
                  ></textarea>
                </form>
                <div className="toolbar">
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <IconButton
                      className="toolbar-item"
                      onClick={this.onBackspace}
                      id="backspace"
                    >
                      <BackspaceSharpIcon />
                    </IconButton>
                  </div>
                </div>
              </div>

              <div className="buttons">
                <button id="parenthesis-open" onClick={this.onParenthesis}>
                  (
                </button>
                <button id="parenthesis-close" onClick={this.onParenthesis}>
                  )
                </button>
                <button id="modulo" onClick={this.onOperator}>
                  %
                </button>
                <button id="clear" onClick={this.onClear}>
                  AC
                </button>

                <button id="seven" onClick={this.onDigit}>
                  7
                </button>
                <button id="eight" onClick={this.onDigit}>
                  8
                </button>
                <button id="nine" onClick={this.onDigit}>
                  9
                </button>
                <button id="divide" onClick={this.onOperator}>
                  /
                </button>

                <button id="four" onClick={this.onDigit}>
                  4
                </button>
                <button id="five" onClick={this.onDigit}>
                  5
                </button>
                <button id="six" onClick={this.onDigit}>
                  6
                </button>
                <button id="multiply" onClick={this.onOperator}>
                  *
                </button>

                <button id="one" onClick={this.onDigit}>
                  1
                </button>
                <button id="two" onClick={this.onDigit}>
                  2
                </button>
                <button id="three" onClick={this.onDigit}>
                  3
                </button>
                <button id="subtract" onClick={this.onOperator}>
                  -
                </button>

                <button id="zero" onClick={this.onDigit}>
                  0
                </button>
                <button id="decimal" onClick={this.onDecimal}>
                  .
                </button>
                <button id="equals" onClick={this.onEqual}>
                  =
                </button>
                <button id="add" onClick={this.onOperator}>
                  +
                </button>
              </div>
              <div className="confirm">
                <Button
                  id="payButton"
                  style={{
                    backgroundColor: '#F7C830',
                    maxHeight: '46px',
                    marginTop: '5px',
                  }}
                >
                  <Typography style={{ color: '#f5f5f5' }} id="textpayButton">
                    <Box
                      fontWeight="fontWeightBold"
                      fontSize="h6.fontSize"
                      fontFamily="Monospace"
                      m={1}
                      onClick={() => {
                        this.setState({ status2: 1 });
                      }}
                    >
                      ยืนยันการชำระเงิน
                    </Box>
                  </Typography>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Typography id="textpayButton">
                <Box
                  fontWeight="fontWeightBold"
                  fontSize="h6.fontSize"
                  fontFamily="Monospace"
                  m={1}
                  onClick={() => {
                    this.setState({ status2: 0 });
                  }}
                >
                  ยืนยันการชำระเงิน
                </Box>
                <Box
                  // fontWeight="fontWeightBold"
                  // fontSize="h6.fontSize"
                  // fontFamily="Monospace"
                  m={1}
                >
                  {'ราคา : ' + this.state.totalprice}
                </Box>
                <Box>{'จ่ายเงิน : ' + this.state.input}</Box>
                <Box>
                  {'เงินทอน : ' +
                    (this.state.input - this.state.totalprice).toString()}
                </Box>
                <Box
                  onClick={() => {
                    this.props.confirmCashPayment({
                      id: this.props.currentId,
                      lastPrice: this.state.totalprice,
                    });
                    this.setState({ input: '0' });
                    this.setState({ status2: '0' });
                    this.setState({ status: '0' });
                    // console.log('props = ', this.props);
                    // this.props.history.push('/mainNav/paymentStatus');
                    // handleResetTab = {props.handleResetTab}
                    this.props.handleResetTab();
                  }}
                >
                  ยืนยัน
                </Box>

                <Box
                  fontWeight="fontWeightBold"
                  fontSize="h6.fontSize"
                  fontFamily="Monospace"
                  m={1}
                  onClick={() => {
                    this.setState({ status2: 0 });
                  }}
                >
                  ยกเลิก
                </Box>
              </Typography>
            </>
          )
        ) : (
          <div className="calculator">
            <div className="display-toolbar">
              <div className="toolbar">
                <div>
                  <IconButton
                    className="toolbar-item"
                    onClick={this.handleClickCash.bind(this)}
                    style={{ marginRight: '20px', marginLeft: '10px' }}
                  >
                    <AttachMoneyIcon />
                  </IconButton>
                  <IconButton
                    className="toolbar-item"
                    onClick={this.handleClickBank.bind(this)}
                  >
                    <AccountBalanceIcon />
                  </IconButton>
                  <IconButton
                    className="toolbar-item"
                    onClick={this.closeDialog.bind(this)}
                    style={{ marginLeft: '210px' }}
                  >
                    <CancelIcon />
                  </IconButton>
                </div>
              </div>
            </div>
            <Paper elevation={3} style={{ width: '100%', height: '100%' }}>
              {/* ************************************************************************************************* */}

              {/* <img
                  src={qrcode}
                  width="200"
                  height="200"
                  style={{ marginLeft: '110px', marginTop: '100px' }}
                ></img> */}
              <Button
                onClick={() => {
                  let data = {
                    amount: this.state.totalprice * 100,
                    orderId: this.props.orderId,
                    storeId: this.props.store,
                  };
                  this.props.addSummary(data);
                }}
              >
                <QRCode
                  // width="100%"
                  // height="100%"

                  style={{ marginLeft: '110px', marginTop: '100px' }}
                  value="http://www.google.com"
                />
              </Button>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '20px',
                }}
              >
                <Typography>
                  <Box
                    fontWeight="fontWeightBold"
                    fontSize="h4.fontSize"
                    fontFamily="Monospace"
                    m={1}
                  >
                    {this.props.priceSummary} บาท
                  </Box>
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginLeft: '80px',
                  marginRight: '80px',
                  backgroundColor: '#cccccc',
                  borderRadius: '10px',
                }}
              >
                <IconButton style={{ maxHeight: '40px' }}>
                  <ReplayIcon></ReplayIcon>
                </IconButton>

                <Typography>
                  <Box fontWeight="fontWeightMedium" m={1}>
                    เหลือเวลาอีก 2.59 นาที
                  </Box>
                </Typography>
              </div>
              <div
                style={{
                  marginTop: '60px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  style={{ backgroundColor: '#F7C830', borderRadius: '10px' }}
                >
                  <Typography>
                    <Box fontWeight="fontWeightBold" m={1}>
                      พิมพ์ QR CODE !!!
                    </Box>
                  </Typography>
                </Button>
              </div>
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapActionsToProps = {
  confirmCashPayment,
  addSummary,
};

export default connect(mapStateToProps, mapActionsToProps)(calculator);
