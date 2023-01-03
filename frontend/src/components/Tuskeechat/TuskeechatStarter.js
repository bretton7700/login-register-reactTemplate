import Axios from 'axios';
import React, { useEffect, useRef } from 'react';

const TuskeechatStarter = ({ user_Email  }) => {
  //BGN 5/2/2022 UPDATE chatwoot database for payments
    const UpdateTuskeechatPayment = () => {
        Axios.post("https://backend.droplets.ndovucloud.com/api/insertTuskeechatPayment", {
            Buyer_Email: `${user_Email}`,
            

        });


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
