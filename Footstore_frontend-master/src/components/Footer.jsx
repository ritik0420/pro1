import React from 'react';
import { Container } from 'react-bootstrap';

function Footer(props) {

    const year = new Date().getFullYear();
    
    return (
        <Container fluid className="footer">

        <div style={{ textAlign: "center", padding: 10 }}>
          <p>&copy;FootStore {year}. All rights reserved.</p>
        </div>
            
        </Container>
    );
}

export default Footer;