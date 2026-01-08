export const errors = {
  session: { expired: 'Session expired. Please log in again.' },
  exceptions: { unhandled: 'An unexpected error occurred. Please try again later.' },
  fillCorrectForm: {
    correctDetails: 'Please fill all details correctly'
  },
  user: {
    userNotFound: 'No User Found',
    photoNotFound: 'Failed to load user profile.'
  },
  fonts: {
    wrongFile: 'The file format is invalid. accepted only .woff,.otf and .ttf',
  },
  companyName: {
    required: 'Company Name is required.',
    pattern: 'Enter a valid company name.'
  },
  userName: {
    required: 'User Name is required.',
    pattern: 'Enter a valid user name.'
  },
  email: {
    required: 'Email is required.',
    emailFormat: 'Enter a valid email.',
    userEmailExists:'User Email already exists.'
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 6 characters long',
    maxLength: 'Password cannot exceed 20 characters',
    pattern:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  },
  confirmPassword: {
    required: 'Confirm Password is required',
    match: 'Passwords do not match',
  },
  newPassword: {
    required: 'Confirm Password is required'
  },
  phoneNumber: {
    required: 'Phone Number is required.',
    minLength: 'Phone Number must be at least 10 digit.',
    maxLength: 'Phone Number must be 13 digit only.',
  },
  licenseNumber:{
    required: 'License Number is required.',
    pattern:'Invalid format.',
    licenseExists:'License Number already exists!'
  },
  licenseDate:{
    required:'Expiry Date is required.'
  },
  duplicateFields:{
    vinExits:'Duplicate vehicle Identification number!',
    licensePlateExists:'Duplicate License Plate!'
  },
  scheduleTimeValidation:{
    pastTimeNotAllowed:'Past time cannot be selected.'
  }
  
}
export const TripMessage ={
    Cancelled:'Scheduled time is over. You cannot start this trip.',
    EarlyStart:'Early to start trip, you can start trip 5 mins. before only!'
}