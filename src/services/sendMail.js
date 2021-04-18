import axios from 'axios';

export class sendMailServices {

    sendMailServices(params) {
       return axios.post('sendMail.php', params)
            .then(res => {
                console.log(res, 'envio contacto')
            }, (error) => {
              console.log("error", error)
            })
    }
}