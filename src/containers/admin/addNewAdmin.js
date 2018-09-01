//react redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

//material-ui
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';
import Avatar from '@material-ui/core/Avatar';

//Components
import InputField from '../../components/inputField';
import {renderSelectField} from '../../components/selectControl';

//Actions
import { getMerchantDetailsAPI, updateMerchantDetails } from '../../actions/merchantAction';

//Validation
import {required, dropDownRequired} from '../../utilities/validation'

//Data
import Data from '../../staticData';

let errorMessage

const styles = {
    formControl: {
        minWidth: '100%',
        marginLeft:'0px',
      },
      selectControl:{
        fontSize: '12px',
      },
};

function validate(formProps) {  
    const errors = {};
  
    if (!formProps.businessType) {
      errors.firstName = 'Select business Type';
    }
  
    if (!formProps.businessName) {
      errors.lastName = 'Please enter a Business name';
    }
  
    return errors;
  }

class AddAdmin extends Component {

    state = {
        businessType: '',
        stateName:'',
        creditCheckedNo: true,
        creditCheckedYes: false,
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      handleCheckboxChange = name => event => {
        this.setState({[name]: event.target.checked});

        if (name === "creditCheckedYes"){
            this.setState({creditCheckedNo: !event.target.checked});
        }
        else if (name === "creditCheckedNo"){
            this.setState({creditCheckedYes: !event.target.checked});
        }
      };

      //Enables "Public Company" option if not following cases
      renderSwitch(param) {
        switch(param) {
          case '0':
            return true;
          case '5':
            return true;  
          case '6':
            return true;
          default:
            return false;
        }
      }

    componentWillMount() {

        if(this.props.userData.user.responseData.token && this.props.merchant){
            this.props.getMerchantDetailsAPI(this.props.merchant, this.props.userData.user.responseData.token)
        }
    }

    componentWillReceiveProps(nextProps) {
    
    }  

    handleInitialize(entityDetails) {
        if(entityDetails !== undefined){
            this.props.initialize(entityDetails);
        }
      }

      onSubmit(values) {

        console.log(values);
      }

      cancelClick(){
        this.props.history.goBack();
    }

    render() {
        return (
            <div style={{paddingBottom:'20px'}}>
                <form onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>

                <Paper className="pagePaper">
                    <div className="formContent">
                        <div className="appTitleLabel row">
                            <div className="col-xs-12 col-md-12">
                            <FormLabel component="legend">ADD ADMIN</FormLabel>
                            </div>                            
                        </div>

                        <Divider style={{marginBottom:'20px'}}/>

                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Admin Name*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="text" 
                                    name="adminName" 
                                    fullWidth={true} 
                                    component={InputField} 
                                    validate={required}
                                />  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Email*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="text" 
                                    name="email" 
                                    fullWidth={true} 
                                    component={InputField} 
                                    validate={required}
                                />  
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Phone*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="text" 
                                    name="phone" 
                                    fullWidth={true} 
                                    component={InputField} 
                                    validate={required}
                                />  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Status*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">    
                                <FormControl style={styles.formControl}>
                                        <Field
                                            name="status"
                                            component={renderSelectField}
                                            fullWidth={true}
                                            onChange={this.handleChange}
                                            validate={dropDownRequired}
                                        >
                                        {
                                            Data.searchStatus.map((item) =>{
                                               return <MenuItem 
                                                    style={styles.selectControl}
                                                    key={item.id}
                                                    value={item.id}>
                                                    {item.name}
                                               </MenuItem>
                                            })
                                        }
                                    </Field>    
                                </FormControl>  
                            </div>
                        </div> 
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Avatar
                                    alt="Adelle Charles"
                                    src="../images/profile.png"
                                    className="bigAvatar"
                                />
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <input
                                    accept="image/*"
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                />
                            </div>            
                        </div>
                        <div className="row end-xs">
                            <div className="col-xs-12 col-sm-6 col-md-6">
                                <button 
                                    type="button"
                                    style={{backgroundColor:'#BCBCBC'}}
                                    disabled={this.state.disableReset}
                                    className={this.state.disableReset ? "disabledButton button" : "enabledButton button"}
                                    onClick={this.cancelClick.bind(this)}
                                    > Cancel
                                </button>

                                <button 
                                    type="submit"
                                    className="button"
                                    > Add
                                </button> 
                            </div>
                        </div>                       
                    </div>            
                </Paper> 
                </form>
                <div>
                    {errorMessage}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMerchantDetailsAPI, updateMerchantDetails }, dispatch)
  }

  AddAdmin = reduxForm({
    form: 'frmAddAdmin',
    enableReinitialize: true,
    validate
})(AddAdmin)

AddAdmin = connect(
    state => ({
       userData: state.account === undefined ? undefined : state.account,
    }),
    mapDispatchToProps,
  )(AddAdmin)

export default AddAdmin;