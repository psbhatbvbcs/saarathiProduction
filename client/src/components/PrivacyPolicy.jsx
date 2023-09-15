import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Container, styled, Typography } from "@mui/material";
import NavbarL from "./Landing/NavbarL";

const PrivacyPolicy = () => {
  const privacyPoliceContent = `
**Privacy Notice**

At Saarathi, we are committed to protecting your privacy. This Privacy Notice explains how we collect, use, and safeguard your personal information.

**1. Information We Collect**
    
We may collect personal information when you sign up for our services, contact us, or interact with our website.

**2. How We Use Your Information**

We use your information to provide our services, improve our website, and communicate with you.

**3. Information Sharing**
    
We do not share your personal information with third parties except as necessary to provide our services.

**4. Cookies and Tracking**
    
Our website uses cookies and similar technologies to enhance your experience and analyze usage patterns.

**5. Data Security**

We take reasonable measures to protect your personal information from unauthorized access or disclosure.

**6. Your Choices**

You may update or delete your personal information by contacting us.

**7. Children's Privacy**

Our services are not intended for children under the age of 13.

**8. Changes to this Notice**

We may update this Privacy Notice to reflect changes in our practices. You will be notified of any significant changes.

**9. Contact Us**

If you have any questions about our privacy practices, please contact us at admsaarathi@gmail.com.
  `;

  const CustomContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
  }));

  useEffect(() => {
    document.title = "Saarathi | Privacy Policy";
  }, []);

  return (
    <CustomContainer>
      <NavbarL />
      <Typography variant="h5" gutterBottom>
        Privacy Policy
      </Typography>
      <ReactMarkdown>{privacyPoliceContent}</ReactMarkdown>
    </CustomContainer>
  );
};

export default PrivacyPolicy;
