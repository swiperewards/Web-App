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
import Button from '@material-ui/core/Button';

//Components
import DialogBox from '../../components/alertDialog'
import InputField from '../../components/inputField';
import {renderSelectField} from '../../components/selectControl';
import Loader from '../../components/loader'
import DatePickerControl from '../../components/datePickerControl';

//Actions
import { getMerchantListWithFilter } from '../../actions/merchantAction';
import { addNewDeal, getCitiesList } from '../../actions/dealAction';

//Validation
import {required, dropDownRequired, dateRequired, normalizedPhone} from '../../utilities/validation'

//Data
import moment from 'moment'
import Data from '../../staticData';

const intMaxRangeMatch = (value) => parseFloat(value.replace(normalizedPhone,'')) > 2147483647 ? 'Invalid pool amount' : undefined;

let errorMessage

const styles = {
    formControl: {
        minWidth: '100%',
        marginLeft:'0px',
      },
      selectControl:{
        fontSize: '12px',
      }
};

class AddNewDeal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dialogOpen: false,
            message:'',
            citiesList:'',
            fromDate: new Date(),
            toDate:'',
            merchantList:undefined,
        }
    }

    componentWillMount(){
        errorMessage = "";
        this.props.change('fromDate', new Date());
        this.props.change('toDate', moment().add(2, 'weeks').calendar());

        if(this.props.userData.user.responseData.token){
            this.props.getCitiesList(this.props.userData.user.responseData.token)
            this.props.getMerchantListWithFilter(this.props.userData.user.responseData.userId,"","","",this.props.userData.user.responseData.token);
        }
    }

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      componentWillReceiveProps(nextProps) {
        if (nextProps) {

            if (nextProps.merchantPayload){
                if(nextProps.merchantPayload.status === 200){
                    this.setState({showLoader:false})
                    this.setState({merchantList: nextProps.merchantPayload.responseData})
                }
                else{
                    this.setState({showLoader:false})
                }
            }

          if (nextProps.newDealResponse){
            if(nextProps.newDealResponse.status === 200){
                this.setState({message: nextProps.newDealResponse.message})
                this.setState({ dialogOpen: true });
                this.setState({showLoader:false})
            }
            else{
                errorMessage =
                            <div 
                                className="errorDiv"
                            >{nextProps.newDealResponse.message}</div>
                this.setState({showLoader:false})
            }
          }

          if(nextProps.citiesPayload){
            if(nextProps.citiesPayload.status === 200){
                this.setState({citiesList:nextProps.citiesPayload.responseData})
            }
          }

        }
    }

    handleDateChange = (date) => {
        if(date){
            this.props.change('toDate',moment(date).add(2, 'weeks').calendar())
        }
    }

      onSubmit(values) {

        if(this.props.userData.user.responseData.token){
            this.setState({showLoader:true})
            this.props.addNewDeal(values, this.props.userData.user.responseData.token)
        }
      }

    handleClose = () => {
        this.setState({ dialogOpen: false });
        this.props.history.push('/managedeals');
    };

    cancelClick(){
        this.props.history.goBack();
    }

    render() {
        const {  dialogOpen } = this.state;

        const actions = [
            <Button key="ok" onClick={this.handleClose} color="primary" autoFocus>
                OK
            </Button>
        ];

        return (
            <div style={{paddingBottom:'20px'}}>
                <Loader status={this.state.showLoader} />
                <DialogBox 
                        displayDialogBox={dialogOpen} 
                        message={this.state.message} 
                        actions={actions} 
                />  
                <form onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>

                <Paper className="pagePaper">
                    <div className="formContent">
                        <div className="appTitleLabel row">
                            <div className="col-xs-12 col-md-12">
                            <FormLabel component="legend">ADD DEAL</FormLabel>
                            </div>                            
                        </div>

                        <Divider style={{marginBottom:'20px'}}/>

                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Business Name*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControl style={styles.formControl}>
                                    <Field
                                        name="merchantId"
                                        component={renderSelectField}
                                        fullWidth={true}
                                        onChange={this.handleChange}
                                        validate={dropDownRequired}
                                    >
                                    {
                                            (this.state.merchantList) ? 
                                            this.state.merchantList.map((item) =>{
                                                return <MenuItem 
                                                        style={styles.selectControl}
                                                        key={item.id}
                                                        value={item.id}>
                                                        {item.name_v + " " + item.last_v}
                                                </MenuItem>
                                                })
                                            :
                                            null
                                    }
                                    </Field>    
                                </FormControl>
                            </div>
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                City*
                            </div>    
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <FormControl style={styles.formControl}>
                                    <Field
                                        name="location"
                                        component={renderSelectField}
                                        fullWidth={true}
                                        onChange={this.handleChange}
                                        validate={dropDownRequired}
                                    >
                                    {
                                        (this.state.citiesList) ? 
                                            this.state.citiesList.map((item) =>{
                                            return <MenuItem 
                                                    style={styles.selectControl}
                                                    key={item.id}
                                                    value={item.name}>
                                                    {item.name}
                                                </MenuItem>
                                            })
                                        : null  
                                    }
                                    </Field>    
                                </FormControl>  
                            </div>  
                            {/* <div className="col-xs-12 col-sm-6 col-md-3">
                                Store Location
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="number" 
                                    name="storeLocation" 
                                    fullWidth={true} 
                                    component={LocationSearchBar} 
                                    validate={required}
                                />  
                            </div> */}
                        </div>
                        <div className="row middle-md">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                Pool Amount*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    myType="text" 
                                    name="cashBonus" 
                                    fullWidth={true} 
                                    component={InputField} 
                                    validate={[required, intMaxRangeMatch]}
                                    masked={true}
                                    myMaskType="number"
                                />  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                From Date*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3 picker">
                                <Field 
                                    name="fromDate" 
                                    fullWidth={true} 
                                    keyboard={true}
                                    disabled={false}
                                    component={DatePickerControl} 
                                    onChange={this.handleDateChange}
                                    validate={dateRequired}
                                />  
                            </div>
                        </div>
                        <div className="row middle-md">
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
                                            Data.dealStatus.map((item) =>{
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
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                To Date*
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <Field 
                                    name="toDate" 
                                    fullWidth={true} 
                                    keyboard={false}
                                    disabled={true}
                                    component={DatePickerControl} 
                                    onChange={this.handleDateChange}
                                />   
                            </div>
                        </div> 
                        <div className="row end-xs">
                            <div className="col-xs-12 col-sm-6 col-md-6">
                                <button 
                                    type="button"
                                    style={{backgroundColor:'#BCBCBC'}}
                                    className="enabledButton button"
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
    return bindActionCreators({ addNewDeal, getCitiesList, getMerchantListWithFilter }, dispatch)
  }

  AddNewDeal = reduxForm({
    form: 'frmAddNewDeal',
})(AddNewDeal)

AddNewDeal = connect(
    state => ({
       userData: state.account === undefined ? undefined : state.account,
       newDealResponse: state.deal === undefined ? undefined : state.deal.addDeal,
       citiesPayload: state.deal.citiesList === undefined ? undefined : state.deal.citiesList,
       merchantPayload: state.merchant.merchantList === undefined ? undefined : state.merchant.merchantList,
    }),
    mapDispatchToProps,
  )(AddNewDeal)

export default AddNewDeal;