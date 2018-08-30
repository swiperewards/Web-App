//react redux
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';

//material-ui
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

//Components
import InputField from '../../components/inputField';
import RaiseButton from '../../components/raiseButton';

let errorMessage

const styles = {
    formControl: {
        minWidth: 120,
        marginLeft:'25px',
      },
};

class ManageUsers extends Component {

    state = {
        status: '',
        location:'',
        type:''
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    render() {

        return (
            <div>
                <div>
                    <Paper className="pagePaper">
                        <div className="formContent">
                            <form size='large' className="form-horizontal" onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                                <div className="appTitleLabel">MANAGE USER
                                </div>
                                <div style={{position:'relative', margin:'0px', width:'100%'}}>
                                    <div style={{float:'left'}}>

                                        <Field name="username" myLabel="Name" myPlaceHolder="Name" fullWidth={false} component={InputField} />
                                        <FormControl style={styles.formControl}>
                                            <InputLabel htmlFor="status-controlled-open-select">Status</InputLabel>
                                            <Select
                                                value={this.state.status}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'status',
                                                    id: 'status-controlled-open-select',
                                                }}
                                            >
                                                <MenuItem value="">
                                                <em>None</em>
                                                </MenuItem>
                                                <MenuItem value='Active'>Active</MenuItem>
                                                <MenuItem value='Deactivate'>Deactivate</MenuItem>
                                            </Select>    
                                        </FormControl>
                                        <FormControl style={styles.formControl}>
                                            <InputLabel htmlFor="location-controlled-open-select">Location</InputLabel>
                                            <Select
                                                value={this.state.location}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'location',
                                                    id: 'location-controlled-open-select',
                                                }}
                                            >
                                                <MenuItem value="">
                                                <em>None</em>
                                                </MenuItem>
                                                <MenuItem value='Los Angeles'>Los Angeles</MenuItem>
                                                <MenuItem value='Washington'>Washington</MenuItem>
                                                <MenuItem value='Springfield'>Springfield</MenuItem>
                                                <MenuItem value='Franklin'>Franklin</MenuItem>
                                                <MenuItem value='Greenville'>Greenville</MenuItem>
                                                <MenuItem value='Bristol'>Bristol</MenuItem>
                                                <MenuItem value='Clinton'>Clinton</MenuItem>
                                                <MenuItem value='Fairview'>Fairview</MenuItem>
                                                <MenuItem value='Salem'>Salem</MenuItem>
                                                <MenuItem value='Madison'>Madison</MenuItem>
                                                <MenuItem value='Georgetown'>Georgetown</MenuItem>

                                            </Select>    
                                        </FormControl>
                                        <FormControl style={styles.formControl}>
                                            <InputLabel htmlFor="type-controlled-open-select">Type</InputLabel>
                                            <Select
                                                value={this.state.type}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'type',
                                                    id: 'type-controlled-open-select',
                                                }}
                                            >
                                                <MenuItem value="">
                                                <em>None</em>
                                                </MenuItem>
                                                <MenuItem value='User'>User</MenuItem>
                                                <MenuItem value='Merchant'>Merchant</MenuItem>
                                            </Select>    
                                        </FormControl>

                                       <RaiseButton type="submit" variant="contained" color="primary" label="Search"/>
                                     </div>               
                                
                                </div>  
                            </form>
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

export default reduxForm({
    form: 'FrmManageUser'
}
)(
    connect(null, null)(ManageUsers)
)