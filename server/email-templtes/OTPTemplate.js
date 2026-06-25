exports.otpTemplate = ({ name, otp, min, sec }) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login OTP</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">

<tr>
<td style="background:linear-gradient(90deg,#0d6efd,#0a58ca);padding:20px;text-align:center;">
<h1 style="color:#ffffff;margin:0;font-size:22px;">
SKILLHUB IT SOLUTION
</h1>
</td>
</tr>

<tr>
<td style="padding:30px;">

<h2 style="margin-top:0;color:#333;">Hello ${name},</h2>

<p style="font-size:14px;color:#555;">
Your login verification code is:
</p>

<div style="text-align:center;margin:25px 0;">
<span style="
display:inline-block;
background:#0d6efd;
color:#ffffff;
padding:12px 25px;
font-size:26px;
letter-spacing:4px;
border-radius:6px;
font-weight:bold;
">
${otp}
</span>
</div>

<p style="font-size:14px;color:#555;">
This OTP is valid for <b>${min} minutes (${sec} seconds)</b>.
</p>

<p style="font-size:13px;color:#777;">
If you did not request this OTP, please ignore this email.
</p>

</td>
</tr>

<tr>
<td style="background:#f1f5ff;padding:15px;text-align:center;font-size:12px;color:#555;">
© ${new Date().getFullYear()} SKILLHUB IT SOLUTION <br/>
Maharashtra, India <br/>
<span style="color:#0d6efd;">Empowering Developers 🚀</span>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`
}