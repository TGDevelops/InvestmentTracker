
import config from "../config/appConfig";
import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = config.services.baseUrl.local;

const submitInvestments =  async (investments) => {
    
    const response = await axios({
        method : 'post',
        url : `${BASE_URL}/${config.services.endpoints.ADD_INVESTMENT}`,
        headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        data: JSON.stringify(investments)
    })
    .then(response => {
        if (response.ok) {
          console.log('Investments sent successfully!');
        } else {
          console.error('Failed to send investments:', response.status);
        }
      })
      .catch(error => {
        console.error('Failed to send investments:', error);
      });
};

export default { submitInvestments };