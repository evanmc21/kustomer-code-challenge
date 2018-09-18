const fs = require('fs');
const csv = require('fast-csv');
const axios = require("axios");
const URL = "https://api.kustomerapp.com/v1/customers"
/* I would store an API key in a local environment variable that will be kept in a file not included in git */
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOWZjNmY1ODk5NWVjMDAxMDgwZDQ1OSIsInVzZXIiOiI1YjlmYzZmNTVhNjgyNjVmOWI5OTY1ZmMiLCJvcmciOiI1YjljMmQzZjRlZDEyNmRmNDRkNTBkNjkiLCJvcmdOYW1lIjoienp6LWV2YW4iLCJ1c2VyVHlwZSI6Im1hY2hpbmUiLCJyb2xlcyI6WyJvcmcuYWRtaW4iLCJvcmcudXNlciJdLCJleHAiOjE1Mzc4MDI2MTIsImF1ZCI6InVybjpjb25zdW1lciIsImlzcyI6InVybjphcGkiLCJzdWIiOiI1YjlmYzZmNTVhNjgyNjVmOWI5OTY1ZmMifQ.Oq6UDenPjg0nz_xPIhnIDX-o0qyLdJypcqt4aiEORZs'
/* make csv data readable */
fs.createReadStream('customers.csv')
  .pipe(csv())
  .on('data', function(data){
    /* each row is an object */
    let customer = {
      name: data[0] +' '+ data[1],
      emails: [
          { email: data[2]
          }
      ],
      phones: [
        {
          type: "home",
          phone: data[4]
        },
        {
          type: "work",
          phone: data[5]
        }
    ]
  };
  axios({
    method: "POST",
    url: `${URL}`,
    headers: {"Authorization":`Bearer ${token}`},
    data: customer
  })
  .then(resp => console.log(resp.data))
  .catch(console.log)
});
