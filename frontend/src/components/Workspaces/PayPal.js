import Axios from 'axios';
import React, { useEffect, useRef } from 'react';

const PayPal = ({ current_Starter_Workspace, Starter_Payment_Amount, value, Period_Paid }) => {
    const deleteOldWorkspace = () => {
        Axios.get("https://backend.droplets.ndovucloud.com/api/deleteOldWorkspace", {
            params: {


                Workspace_Name: current_Starter_Workspace,
            },
        });


    };

    //update the link now


    const UpdateOldWorkspaceLink = () => {
        Axios.put("https://backend.droplets.ndovucloud.com/api/updateWorkspaceLink", {
            Workspace_Name: `${current_Starter_Workspace}`,
            No_of_Users: `${value}`,
            Period_Paid: `${Period_Paid}`

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
                                description: `Datatrunk ${current_Starter_Workspace} dollar purchase`,
                                amount: {
                                    currency_code: "USD",
                                    value: `${Starter_Payment_Amount}`,
                                }
                            }
                        ]
                    })

                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture()
                    alert("You have purchased Datatrunk successfully", order);
                    console.log(order.status);
                    deleteOldWorkspace();
                    UpdateOldWorkspaceLink();
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

export default PayPal
