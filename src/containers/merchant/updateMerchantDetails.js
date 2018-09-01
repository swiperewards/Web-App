//react redux
import React, { Component } from 'react';
import { reduxForm } from 'redux-form'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//material-ui
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

//Containers
import UpdateBusinessDetails from '../../containers/merchant/updateMerchantBusiness';
import UpdateOwnerDetails from '../../containers/merchant/updateMerchantOwners';
import UpdateAccountSetup from '../../containers/merchant/updateMerchantAccountSetup';
import UpdateBankAccount from '../../containers/merchant/updateMerchantBankAccount';

//Components
import Loader from '../../components/loader'

//Actions
import { addNewMerchant } from '../../actions/merchantAction';


const styles = theme => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing.unit,
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
    bootstrapRoot: {
    borderRadius: 1,
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '14px',
    padding: '6px 12px',
    border: '1px solid',
    backgroundColor: '#53c1ff',
    borderColor: '#53c1ff',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#337ab7',
      borderColor: '#2e6da4',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#337ab7',
      borderColor: '#2e6da4',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
  });

  function getSteps() {
    return ['About the Business', 'About the Owners', 'Account Setup', 'Add Bank Account'];
  }
  
  //Function to navigate to respective step based on active index
  function getStepContent(stepIndex, merchantId) {
    switch (stepIndex) {
      case 0:
        return (<UpdateBusinessDetails merchant= {merchantId}/>);
      case 1:
        return (<UpdateOwnerDetails />);
      case 2:
        return (<UpdateAccountSetup />);
      case 3:
        return (<UpdateBankAccount />);
      default:
        return 'Uknown stepIndex';
    }
  }

  let errorMessage

class UpdateMerchant extends Component {

    state = {
        status: '',
        location:'',
        activeStep: 0,
        open: false,
        completed: new Set(),
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      handleStep = step => () => {
        this.setState({
          activeStep: step,
        });
      };

      isStepComplete(step) {
        return this.state.completed.has(step);
      }

      handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
          activeStep: activeStep + 1,
        });
      };
    
      handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
          activeStep: activeStep - 1,
        });
      };
    
      handleReset = () => {
        this.setState({
          activeStep: 0,
        });
      };

      onSubmit(values) {
        const steps = getSteps();
        const { activeStep } = this.state;
        if (activeStep < steps.length-1){
          this.setState({
            activeStep: activeStep + 1,
          });
        }
        else{
          this.setState({showLoader:true})
          this.props.addNewMerchant(values, this.props.userData.user.responseData.token)
        }
      }

      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
        this.props.history.push('/managemerchants');
      };

    componentWillMount()
    {
        this.setState({open: false});        
    }

    componentWillReceiveProps(nextProps) {

      if (nextProps) {
        if (nextProps.merchantPayload){
          if(nextProps.merchantPayload.data){
            if(nextProps.merchantPayload.data.status === 200){
                errorMessage = <div></div>
                this.handleClickOpen()
            }
            else{
              if(nextProps.merchantPayload.data.status === 5001){
                errorMessage =
                nextProps.merchantPayload.data.responseData.map((error, index) =>
                    <div key={index} style={{
                        padding: '5px 20px',
                        margin: '5px',
                        marginBottom: '10px',
                        fontSize: 13,
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        borderRadius: '5px',
                        color: '#86181d',
                        backgroundColor: '#ffdce0',
                        borderColor: 'rgba(27, 31, 35, 0.15)',
                        textAlign: 'center'
                    }}>
                      {error.field + ' : ' + error.msg}
                    </div >
                  )
              }
            }
          }
        }
      }
      this.setState({showLoader:false})
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div>
                <Loader status={this.state.showLoader} />
                <div>
                    <Dialog
                      open={this.state.open}
                      aria-labelledby="alert-dialog-title"
                    >
                      <DialogTitle id="alert-dialog-title">{"Congratulations! You've successfully updated merchant details."}</DialogTitle>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                          OK
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div> 
                <div>
                    <Paper className="pagePaper">
                        <div className="formContent">
                                <div className="appTitleLabel">
                                  <FormLabel component="legend">UPDATE MERCHANT</FormLabel>
                                </div>

                                <div className={classes.root}>
                                    <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                                        {steps.map((label, index) => {
                                            return (
                                            <Step key={label}>
                                                <StepButton
                                                  onClick={this.handleStep(index)}
                                                  completed={this.isStepComplete(index)}
                                                >
                                                  {label}
                                                </StepButton>
                                            </Step>
                                            );
                                        })}
                                    </Stepper>
                                    <div>
                                       {
                                          getStepContent(activeStep, 
                                          this.props.location.state !== undefined ? this.props.location.state.detail : undefined)
                                        }
                                    </div>
                                </div>
                        </div>            
                    </Paper>                    
                    <div>
                        {errorMessage}
                    </div>
                </div>
            </div>
        );
    }
}

UpdateMerchant.propTypes = {
    classes : PropTypes.object,
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addNewMerchant }, dispatch)
}

UpdateMerchant = connect(
  state => ({
    userData: state.account === undefined ? undefined : state.account,
  }),
  mapDispatchToProps,
)(UpdateMerchant)

export default reduxForm({
  form: 'FrmUpdateMerchant',
})(withStyles(styles)(UpdateMerchant))