import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DateTime from 'react-datetime'
import moment from 'moment'

import Button from './button.js'

import './util.scss'

// TODO: FINISH isValid checking
class Form extends React.Component {
  state = {
    components: [],
    componentNamesForState: []
  }

  /*
  checkError = (input, checkList) => {
    checkList.forEach(check => {
      switch (check) {
        case '!null':
          //console.log(input == '' || input == null);
          if(input == '' || input == null) return 'Input is null or empty';
          break;
        default:
      }
    })

    return null;
  }
  */

  handleChange = (e, componentName) => {
    if(componentName.includes("dateTime")) {
      console.log(e._d);
      this.setState({
        [componentName]: e._d
      })
    }
    else {
      this.setState({
        [componentName]: e.target.value
      })
    }
  }

  componentDidMount = () => {
    let componentNamesForState = [];

    console.log(this.props.formComponents());

    this.props.formComponents().forEach((component, i) => {
      switch (component.type) {
        case 'input':
          let inputName = `input_${component.label}`
          componentNamesForState.push(inputName)
          break;
        case 'dateTime':
          let dateTimeInputName = `dateTime_${component.label}`
          componentNamesForState.push(dateTimeInputName)
          break;
        case 'password':
          let passwordInputName = `password_${component.label}`
          componentNamesForState.push(passwordInputName)
          break;
        default:

      }
    })

    //Set Initial state for all input components
    componentNamesForState.forEach(name => {
      this.setState({
        [name]: ''
      })
    })

    this.setState({
      componentNamesForState: componentNamesForState
    })
  }

  handleSubmit = (e,cb) => {
    e.preventDefault();
    let response = []
    this.state.componentNamesForState.forEach(name => {
      response.push({[name]: this.state[name]})
      this.setState({
        [name]: ''
      })
    })

    cb(response);
  }

  render () {
    let FormIcon;
    switch (this.props.icon) {
      case 'feather':
        FormIcon = (<FontAwesomeIcon className='formIcon formIconFlip' icon='feather-alt' />)
        break;
      case 'user':
        FormIcon = (<FontAwesomeIcon className='formIcon' icon='user' />)
        break;
      default:
        FormIcon = (<FontAwesomeIcon className='formIcon formIconFlip' icon='feather-alt' />)
    }

    let componentList = (
      this.props.formComponents().map((component, i) => {
        switch (component.type) {
          case 'input':
            let inputName = `input_${component.label}`
            return (
              <div key={i}>
                <div className='component__input__label'>{component.label}</div>
                <input
                type="text"
                value={this.state[inputName]}
                className='component__input'
                placeholder={component.placeholder}
                onChange={(e) => this.handleChange(e,inputName)}/>
              </div>
            )
          case 'dateTime':
            let dateTimeInputName = `dateTime_${component.label}`
            var yesterday = moment().subtract( 1, 'day' );
            var valid = function( current ){
              return current.isAfter( yesterday );
            };
            return (
              <div key={i}>
                <div className='component__input__label'>{component.label}</div>
                <DateTime
                className='component__datetime'
                isValidDate={ valid }
                value={this.state[dateTimeInputName]}
                inputProps={{placeholder: component.placeholder}}
                onChange={(e) => this.handleChange(e,dateTimeInputName)}/>
              </div>
            );
          case 'password':
            let passwordInputName = `password_${component.label}`
            return (
              <div key={i}>
                <div className='component__input__label'>{component.label}</div>
                <input
                type="password"
                value={this.state[passwordInputName]}
                className='component__input'
                placeholder={component.placeholder}
                onChange={(e) => this.handleChange(e,passwordInputName)}/>
              </div>
            )
          default:
            return null;
        }
      })
    );

    return (
      <div className={`${this.props.show ? 'form__container' : 'form__container--hidden'} ${this.props.type}`}>
        <form className='form' onSubmit={this.handleSubmit}>
          <div className='form__top'>
            <div className='form__top__left'>
              <div className='formTitle'>{this.props.title}</div>
              {FormIcon}
            </div>

            {
              this.props.note
              ?
              <div className='form__note'>{this.props.note}</div>
              :
              <div className='form__top__right'>
                {componentList}
                {
                  this.props.johnny
                  &&
                  <Button name='Johnny?' size='small' onClick={(e) => this.handleSubmit(e,this.props.onJohnny)}/>
                }
              </div>
            }

          </div>

          <div className='form__bottom'>
            <Button name={this.props.cancelText} onClick={(e) => this.handleSubmit(e,this.props.onCancel)}/>
            <Button name={this.props.confirmText} onClick={(e) => this.handleSubmit(e,this.props.onConfirm)}/>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;

Form.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.oneOf(['feather', 'user']),
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  show: PropTypes.bool,
  type: PropTypes.oneOf(['singleForm', 'modalForm']),
};

Form.defaultProps = {
  title: 'Form',
  icon: 'feather',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  onConfirm: () => {console.warn("No onConfirm function defined for form")},
  onCancel: () => {console.warn("No onCancel function defined for form")},
  show: true,
  type: 'singleForm',
  formComponents: [
    {
      type: 'input',
      label: 'Title',
      placeholder: 'class'
    },
    {
      type: 'input',
      label: 'Note',
      placeholder: '8am'
    },
    {
      type: 'dateTime',
      label: 'Date/Time',
      placeholder: 'Click to Enter'
    },
  ]
};
/*
formType: PropTypes.oneOf(['alarm', 'account', 'signup', 'signin']),
*/
