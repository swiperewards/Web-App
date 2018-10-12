export default function (state = {}, action) {
    switch (action.type) {
        case 'VALIDATE_USER':
            return { ...state, user: action.payload };
        case 'REGISTER_USER':
            return { registerUser: action.payload };    
        case 'ACTIVATE_USER':
            return { activateUser: action.payload };    
        case 'RESEND_EMAIL':
            return { resendEmail: action.payload};
        case 'GET_USERPROFILE':
            return { ...state, userProfile: action.payload};  
        case 'FORGOT_PASSWORD':
            return { forgotPassword: action.payload};  
        case 'SET_PASSWORD':
            return { setPassword: action.payload};   
        case 'UPDATE_USER_PROFILE':
            return { updateProfile: action.payload }             
        default:
            return state;
    }
}