import { Alert } from "@mui/material";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
    

    return (
        <>
            
            <Card className="border-ndovu rounded-0 my-3" style={{ maxWidth: '900px', width: '55%' }}>
                <Card.Header>Home Page</Card.Header>
                <Card.Body>
                    <div className="accordion-item" id="accordionFlushExample">

                        <div className="accordion-body">

                            <Card.Title style={{ textTransform: 'capitalize' }}>For Normal Users</Card.Title>
                            <Card.Link >
                                <Alert  style={{background:'#3500d3'}} >
                                    <Link to="/alluserparcels">Click Here</Link>
                                </Alert>
                            </Card.Link>
                            <br />
                            <Card.Title style={{ textTransform: 'capitalize' }}>For Admins</Card.Title>
                            <Card.Link >
                                <Alert style={{background:'#3500d3'}}>
                                   <Link to="/admin">Click Here</Link>
                                </Alert>
                            </Card.Link>
                            <br />
                            

                        </div>

                    </div>
                </Card.Body>
            </Card>
            
        </>
    )
}

export default Home
