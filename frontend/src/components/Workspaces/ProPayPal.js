import Axios from 'axios';
import React, { useEffect, useRef } from 'react';
// import PayMpesa from "./PayMpesa";
const ProPayPal = ({ Current_Pro_Workspace, Pro_Payment_Amount, Users_Paid_For, Period_Paid_Pro }) => {


    const deleteOldWorkspace = () => {
        Axios.get("https://backend.droplets.ndovucloud.com/api/deleteOldComboWorkspace", {
            params: {

                // company: company_Name,
                Workspace_Name: Current_Pro_Workspace,
            },
        });


    };

    //update the link now


    const UpdateOldWorkspaceLink = () => {
        Axios.put("https://backend.droplets.ndovucloud.com/api/updateComboWorkspaceLink", {
            Workspace_Name: `${Current_Pro_Workspace}`,
            Pro_Users_Paid_For: `${Users_Paid_For}`,
            Period_Paid: `${Period_Paid_Pro}`
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
                                description: "Datatrunk pro purchase",
                                amount: {
                                    currency_code: "USD",
                                    value: `${Pro_Payment_Amount}`,
                                }
                            }
                        ]
                    })

                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture()
                    alert("you have purchased Datatrunk successfully", order);
                    console.log(order.status);
                    deleteOldWorkspace();
                    UpdateOldWorkspaceLink();
                    // window.location.reload();
                    
                },
                onError: (err) => {
                    console.log(err)
                }

            }).render(paypal.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            {/* <PayMpesa  Pro_Payment_Amount={Pro_Payment_Amount} Workspace_Name={Current_Pro_Workspace} Package_PaidFor='proDatatrunk' Users_Paid_For={Users_Paid_For} > </PayMpesa> */}
            <div ref={paypal}></div>
            
        </div>
    )
}

export default ProPayPal
