import Axios from 'axios';
import React, { useEffect, useRef } from 'react';
const STARTER_URL = '/users/purchases';
const TuskeechatStarter = ({ user_Email  }) => {
  
    const UpdateTuskeechatPayment = async () => {
       
        try {
          
          // Make a post request and wait for it to resolve
          const postResponse = await axiosPrivate.post(STARTER_URL,
            JSON.stringify({
                suitName: 'Tuskeechat Starter',
                buyer: `${user_Email}`,
                paymentAmount: '29.99',
             
            }), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          });
    
          // TODO: remove console.logs before deployment
          console.log(JSON.stringify(postResponse?.data));
    
        
        } catch (error) {
          if (!error.response) {
            alert('No server response');
          } else {
            alert('request failed');
          }
        }
      };


    const paypal = useRef();
    useEffect(() => {
        window.paypal_sdk
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: `Tuskeechat  starter  purchase`,
                                amount: {
                                    currency_code: "USD",
                                    value: 29.99,
                                }
                            }
                        ]
                    })

                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture()
                    alert("You have purchased Tuskeechat successfully, Wait as we redirect you to Tuskeechat", order);
                    console.log(order.status);
                   
                    UpdateTuskeechatPayment();
                    
                    setTimeout(function(){
                        window.location.replace("https://tuskeechat.ndovucloud.com/app/auth/signup")

                    },1200)
                    

                },
                onError: (err) => {
                    console.log(err)
                }

            }).render(paypal.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}

export default TuskeechatStarter
