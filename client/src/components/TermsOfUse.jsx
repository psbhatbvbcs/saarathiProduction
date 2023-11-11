import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Container, styled, Typography } from "@mui/material";
import NavbarL from "./Landing/NavbarL";

const TermsOfUse = () => {

  const termsOfUseContent = `
Welcome to Saarathi! By using our website, you agree to comply with and be bound by the following terms and conditions. Please review the terms carefully. If you do not agree with these terms, you should not use our website.

**1. Use of Content**

All content provided on our website is for informational purposes only. The website acts as a middleman to already provide to the users what is already available to them, at a single place. We do not hold any claims to its validity or authenticity.

**2. User Conduct**
    
You are solely responsible for your actions and conduct while using our website. You agree not to engage in any harmful, abusive, or illegal activities.

**3. Intellectual Property**
    
All intellectual property related to our website is a link to already available content on the internet. We do not hold any ownership of the intellectual property.

**4. Disclaimer of Warranties**
    
We provide our website "as is" and do not make any warranties regarding its accuracy, reliability, or availability.

**5. Limitation of Liability**
    
We shall not be liable for any damages arising from your use of our website, whether direct, indirect, or consequential.

**6. Indemnification**
    
You agree to indemnify and hold us harmless from any claims, expenses, or damages resulting from your use of our website.

**7. Modifications**
    
We reserve the right to modify these terms at any time. Continued use of our website constitutes acceptance of any changes.

**8. Governing Law**
    
These terms are governed by the laws of India.

**9. Contact Us**
    
If you have any questions about these terms, please contact us at admsaarathi@gmail.com.
  `;

  const CustomContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
  }));


  useEffect(() => {
    document.title = "Saarathi | Terms Of Use";
  }, []);

  return (
    <CustomContainer>
      <NavbarL />
      <Typography variant="h5" gutterBottom>
        Terms of Use
      </Typography>
      <ReactMarkdown>{termsOfUseContent}</ReactMarkdown>
    </CustomContainer>
  );
};

export default TermsOfUse;
