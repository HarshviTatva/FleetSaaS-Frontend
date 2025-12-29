export const environment = {
  apiUrl: 'https://localhost:7188/api/',
};

export const apiEndPoints = {
  auth:{
      signup:'Company/register-company',
      login:'Auth/login'
    },
  driver:{
    addEditUser:'Driver/driver',
    deleteUser:'Driver',
    getAll:'Driver/drivers'
  },
  dispatcher:{
    addEditUser:'Dispatcher/dispatcher',
    deleteUser:'Dispatcher',
    getAll:'Dispatcher/dispatchers'
  },
  vehicle:{
    addEditVehicle:'Vehicle/vehicle',
    deleteVehicle:'vehicle',
    getAll:'Vehicle/vehicles'
  }
}