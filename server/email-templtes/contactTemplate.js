// exports.contactTemplate = ({ name, email, message, subject }) => {
//     return `
// <!DOCTYPE html>
// <html>
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <title>Portfolio Contact</title>
// </head>

// <body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

// <table width="100%" cellpadding="0" cellspacing="0">
// <tr>
// <td align="center" style="padding:20px 10px;">

// <table width="620" cellpadding="0" cellspacing="0"
// style="background:#ffffff;border-radius:10px;border:1px solid #e5e7eb;overflow:hidden;">

// <!-- HEADER -->
// <tr>
// <td style="background:#4f46e5;padding:24px;text-align:center;">
// <h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:600;">
// Portfolio Contact
// </h1>

// <p style="margin:4px 0 0;color:#e0e7ff;font-size:13px;">
// New message from your portfolio website
// </p>
// </td>
// </tr>

// <!-- CONTENT -->
// <tr>
// <td style="padding:24px;">

// <h2 style="margin:0 0 12px;font-size:18px;color:#111827;">
//  📬 Contact Details
// </h2>

// <table width="100%" cellpadding="0" cellspacing="0"
// style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">

// <tr>
// <td style="padding:10px 14px;background:#f9fafb;font-weight:600;width:140px;">
// Name
// </td>
// <td style="padding:10px 14px;">
// ${name}
// </td>
// </tr>

// <tr>
// <td style="padding:10px 14px;background:#f9fafb;font-weight:600;">
// Email
// </td>
// <td style="padding:10px 14px;">
// <a href="mailto:${email}" style="color:#4f46e5;text-decoration:none;">
// ${email}
// </a>
// </td>
// </tr>

// <tr>
// <td style="padding:10px 14px;background:#f9fafb;font-weight:600;">
// Subject
// </td>
// <td style="padding:10px 14px;">
// ${subject ? subject : "Portfolio Inquiry"}
// </td>
// </tr>

// <tr>
// <td style="padding:10px 14px;background:#f9fafb;font-weight:600;vertical-align:top;">
// Message
// </td>

// <td style="padding:10px 14px;line-height:1.6;white-space:pre-line;">
// ${message}
// </td>
// </tr>

// </table>

// <p style="margin:14px 0 0;font-size:12px;color:#6b7280;">
// This message was sent from your portfolio contact form.
// </p>

// </td>
// </tr>

// <!-- FOOTER -->
// <tr>
// <td style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#6b7280;">

// <strong>© ${new Date().getFullYear()} Your Portfolio</strong><br>
// Chhatrapati Sambhaji Nagar, Maharashtra, India

// <br>

// <span style="color:#4f46e5;">
// Building Modern Web Experiences 🚀
// </span>

// </td>
// </tr>

// </table>

// </td>
// </tr>
// </table>

// </body>
// </html>
// `;
// };






exports.contactTemplate = ({ name, email, message, subject }) => {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Portfolio Contact</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:20px 10px;">

<table width="620" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:10px;border:1px solid #e5e7eb;overflow:hidden;">

<!-- HEADER -->
<tr>
<td style="background:#4f46e5;padding:24px;text-align:center;">
<h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:600;">
Portfolio Contact
</h1>

<p style="margin:4px 0 0;color:#e0e7ff;font-size:13px;">
New message from your portfolio website
</p>
</td>
</tr>

<!-- CONTENT -->
<tr>
<td style="padding:24px;">

<h2 style="margin:0 0 12px;font-size:18px;color:#111827;">
📬 Contact Details
</h2>

<table width="100%" cellpadding="0" cellspacing="0"
style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">

<tr>
<td style="padding:10px 14px;background:#f9fafb;font-weight:700;width:100px;color:#111827;">
Name
</td>
<td style="padding:10px 14px;color:#111827;font-weight:500;">
${name}
</td>
</tr>

<tr>
<td style="padding:10px 14px;background:#f9fafb;font-weight:700;color:#111827;">
Email
</td>
<td style="padding:10px 14px;font-weight:500;">
<a href="mailto:${email}" style="color:#111827;text-decoration:none;">
${email}
</a>
</td>
</tr>

<tr>
<td style="padding:10px 14px;background:#f9fafb;font-weight:700;color:#111827;">
Subject
</td>
<td style="padding:10px 14px;color:#111827;font-weight:500;">
${subject ? subject : "Portfolio Inquiry"}
</td>
</tr>

<tr>
<td style="padding:10px 14px;background:#f9fafb;font-weight:700;vertical-align:top;color:#111827;">
Message
</td>

<td style="padding:10px 14px;line-height:1.6;color:#111827;font-weight:500;white-space:pre-line;">
${message}
</td>
</tr>

</table>

<p style="margin:14px 0 0;font-size:12px;color:#6b7280;">
This message was sent from your portfolio contact form.
</p>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#6b7280;">

<strong>© ${new Date().getFullYear()} Your Portfolio</strong><br>
Chhatrapati Sambhaji Nagar, Maharashtra, India

<br>

<span style="color:#4f46e5;">
Building Modern Web Experiences 🚀
</span>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};