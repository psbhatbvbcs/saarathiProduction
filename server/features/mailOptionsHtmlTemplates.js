export const userMailOptions = (currentUrl, _id, uniqueString) => {
    return (
        `
    <!doctype html>
        <html>
            <head>
                <meta name="viewport" content="width=device-width" />
                <meta name="description" content="Verification Email" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Verification Email</title>
                <style>
                    html,
                    body {
                        margin: 0 auto !important;
                    padding: 0 !important;
                    width: 100% !important;
                    font-family: sans-serif;
                    line-height: 1.4;
                    -webkit-font-smoothing: antialiased;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%; 
			}
                    * {
                        -ms - text - size - adjust: 100%;
			}
                    table,
                    td {
                        mso - table - lspace: 0pt !important;
                    mso-table-rspace: 0pt !important;
			}
                    img {
                        display: block;
                    border: none;
                    max-width: 100%;
                    -ms-interpolation-mode: bicubic;
      }
                    a {
                        text - decoration: none;
			}
                </style>
            </head>
            <body
                leftmargin="0"
                marginwidth="0"
                topmargin="0"
                marginheight="0"
                offset="0"
                bgcolor="#F8F8F8"
                width="100%"
                style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background: #F8F8F8;"
            >
                <!-- HEADER -->
                <table
                    align="left"
                    valign="top"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    height="100%"
                    width="100%"
                    bgcolor="#F8F8F8"
                    style="padding: 0; margin: 0; width: 100%; background: "#F8F8F8"
                >
                    <tr>
                        <td>
                            <table
                                align="left"
                                valign="top"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="500"
                                bgcolor="#F8F8F8"
                                style="max-width: 500px; background: #ffffff"
                            >
                                <tr>
                                    <td height="30" style="height: 30px;">
                                        <img
                                            src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                            width="1"
                                            height="1"
                                            border="0"
                                            style="display: block; border: none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <!-- LOGO -->
                                        <img src="data:image/png;base64,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" />
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30" style="height: 30px;">
                                        <img
                                            src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                            width="1"
                                            height="1"
                                            border="0"
                                            style="display: block; border: none"
                                        />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <!-- END HEADER -->

                <table
                    align="left"
                    valign="top"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    height="100%"
                    width="100%"
                    bgcolor="#F8F8F8"
                    style="padding: 0; margin: 0; width: 100%; background: #F8F8F8"
                >
                    <tr>
                        <td>
                            <!-- MAIN -->
                            <table
                                align="left"
                                valign="top"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="500"
                                style="max-width: 500px"
                            >
                                <tr>
                                    <td height="50" style="height: 50px;">
                                        <img
                                            src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                            width="1"
                                            height="1"
                                            border="0"
                                            style="display: block; border: none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h1
                                            style="font-family: Arial, Helvetica;
										font-size: 35px;
										color: #010E28;
										margin: 0;
										padding: 0;
										font-weight: normal;"
                                        >
                                            Email verification link
                                        </h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10" style="height: 10px;">
                                        <img
                                            src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                            width="1"
                                            height="1"
                                            border="0"
                                            style="display: block; border: none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p
                                            style="font-family: Arial, Helvetica;
										font-size: 14px;
										color: #5B6987;
										margin: 0;
										padding: 0;
										line-height: 30px;"
                                        >
                                            To verify your email, please click on the link below.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="20" style="height: 20px;">
                                        <img
                                            src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                            width="1"
                                            height="1"
                                            border="0"
                                            style="display: block; border: none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <p>This link <b>expires in 6 hours</b>.</p>
                                    <p>Press <a href=${currentUrl + 'verify-email/user/' + _id + '/' + uniqueString}>here</a> to verify.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="50" style="height: 50px;">
                                        <img
                                            src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                            width="1"
                                            height="1"
                                            border="0"
                                            style="display: block; border: none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p
                                            style="font-family: Arial, Helvetica;
										font-size: 20px;
										color: #5B6987;
										margin: 0;
										padding: 0;
										line-height: 30px;"
                                        >
                                            We're here to help
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10" style="height: 10px;">
                                        <img
                                            src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                            width="1"
                                            height="1"
                                            border="0"
                                            style="display: block; border: none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p
                                            style="font-family: Arial, Helvetica;
										font-size: 14px;
										color: #5B6987;
										margin: 0;
										margin-bottom: 10px;
										padding: 0;
										line-height: 20px;
										text-align: left;"
                                        >
                                        Our Campus Compass team is always ready to help you. If you have any questions, please visit <a style="color:#010E28; text-decoration: underline;" href="#">campuscompass@gmail.com</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <!-- END MAIN -->
                    </tr>
                    <tr>
                        <td height="40" style="height: 40px;">
                            <img
                                src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                width="1"
                                height="1"
                                border="0"
                                style="display: block; border: none"
                            />
                        </td>
                    </tr>
                </table>
            </body>
        </html>
`)
}

export const adminMailOptions = (currentUrl, _id, uniqueString) => {
    return (
        `
    <!doctype html>
        <html>
            <head>
                <meta name="viewport" content="width=device-width" />
                <meta name="description" content="Verification Email" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Verification Email</title>
                <style>
                    html,
                    body {
                        margin: 0 auto !important;
                    padding: 0 !important;
                    width: 100% !important;
                    font-family: sans-serif;
                    line-height: 1.4;
                    -webkit-font-smoothing: antialiased;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%; 
			}
                    * {
                        -ms - text - size - adjust: 100%;
			}
                    table,
                    td {
                        mso - table - lspace: 0pt !important;
                    mso-table-rspace: 0pt !important;
			}
                    img {
                        display: block;
                    border: none;
                    max-width: 100%;
                    -ms-interpolation-mode: bicubic;
      }
                    a {
                        text - decoration: none;
			}
                </style>
            </head>
            <body
                leftmargin="0"
                marginwidth="0"
                topmargin="0"
                marginheight="0"
                offset="0"
                bgcolor="#F8F8F8"
                width="100%"
                style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background: #F8F8F8;"
            >
                <!-- HEADER -->
                <table
                    align="left"
                    valign="top"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    height="100%"
                    width="100%"
                    bgcolor="#F8F8F8"
                    style="padding: 0; margin: 0; width: 100%; background: "#F8F8F8"
                >
                    <tr>
                        <td>
                            <table
                                align="left"
                                valign="top"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="500"
                                bgcolor="#F8F8F8"
                                style="max-width: 500px; background: #ffffff"
                            >
                                <tr>
                                    <td height="30" style="height: 30px;">
                                        <img
                                            src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                            width="1"
                                            height="1"
                                            border="0"
                                            style="display: block; border: none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <!-- LOGO -->
                                        <img src="data:image/png;base64,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" />
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30" style="height: 30px;">
                                        <img
                                            src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                            width="1"
                                            height="1"
                                            border="0"
                                            style="display: block; border: none"
                                        />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <!-- END HEADER -->

                <table
                    align="left"
                    valign="top"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    height="100%"
                    width="100%"
                    bgcolor="#F8F8F8"
                    style="padding: 0; margin: 0; width: 100%; background: #F8F8F8"
                >
                    <tr>
                        <td>
                            <!-- MAIN -->
                            <table
                                align="left"
                                valign="top"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="500"
                                style="max-width: 500px"
                            >
                                <tr>
                                    <td height="50" style="height: 50px;">
                                        <img
                                            src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                            width="1"
                                            height="1"
                                            border="0"
                                            style="display: block; border: none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h1
                                            style="font-family: Arial, Helvetica;
										font-size: 35px;
										color: #010E28;
										margin: 0;
										padding: 0;
										font-weight: normal;"
                                        >
                                            Email verification link
                                        </h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10" style="height: 10px;">
                                        <img
                                            src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                            width="1"
                                            height="1"
                                            border="0"
                                            style="display: block; border: none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p
                                            style="font-family: Arial, Helvetica;
										font-size: 14px;
										color: #5B6987;
										margin: 0;
										padding: 0;
										line-height: 30px;"
                                        >
                                            To verify your email, please click on the link below.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="20" style="height: 20px;">
                                        <img
                                            src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                            width="1"
                                            height="1"
                                            border="0"
                                            style="display: block; border: none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <p>This link <b>expires in 6 hours</b>.</p>
                                    <p>Press <a href=${currentUrl + 'verify-email/admin/' + _id + '/' + uniqueString}>here</a> to verify.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="50" style="height: 50px;">
                                        <img
                                            src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                            width="1"
                                            height="1"
                                            border="0"
                                            style="display: block; border: none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p
                                            style="font-family: Arial, Helvetica;
										font-size: 20px;
										color: #5B6987;
										margin: 0;
										padding: 0;
										line-height: 30px;"
                                        >
                                            We're here to help
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10" style="height: 10px;">
                                        <img
                                            src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                            width="1"
                                            height="1"
                                            border="0"
                                            style="display: block; border: none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p
                                            style="font-family: Arial, Helvetica;
										font-size: 14px;
										color: #5B6987;
										margin: 0;
										margin-bottom: 10px;
										padding: 0;
										line-height: 20px;
										text-align: left;"
                                        >
                                        Our Campus Compass team is always ready to help you. If you have any questions, please visit <a style="color:#010E28; text-decoration: underline;" href="#">campuscompass@gmail.com</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <!-- END MAIN -->
                    </tr>
                    <tr>
                        <td height="40" style="height: 40px;">
                            <img
                                src="https://moiseshp.github.io/email-templates-for-developers/storage/transparent.png"
                                width="1"
                                height="1"
                                border="0"
                                style="display: block; border: none"
                            />
                        </td>
                    </tr>
                </table>
            </body>
        </html>
`)
}