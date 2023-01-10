import Axios from 'axios';
import React, { useEffect, useRef } from 'react';


const PayDatabase = ({ Current_Workspace_Name }) => {
   
    const UpdateDatabaseStatus = () => {
        Axios.put("https://backend.droplets.ndovucloud.com/api/updateDatabaseStatus", {
            Database_Name: `${Current_Workspace_Name}`,

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
                                description: 'Database Purchase',
                                amount: {
                                    currency_code: "USD",
                                    value: 14.99,
                                }
                            }
                        ]
                    })

                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture()
                    alert("You have purchased a mysql database successfully", order);
                    console.log(order.status);
                    UpdateDatabaseStatus();

                     //!BGN 5/20/2022 Purchase Event
                     setTimeout(function(){
                        import('react-facebook-pixel')
                        .then((x) => x.default)
                        .then((ReactPixel) => {
                            ReactPixel.init('360261592349789')
                            ReactPixel.track('Purchase')

                        })

                    },500)


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

export default PayDatabase
