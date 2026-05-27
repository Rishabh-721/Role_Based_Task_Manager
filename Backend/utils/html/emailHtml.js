
const verifyHtml = (token) =>
`<div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
    <h2>Welcome to Our App!</h2>
    <p>Please click the button below to verify your email address and activate your account:</p>
    <a href="${token}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration:none; border-radius: 4px; font-weight: bold; margin: 15px 0;">Verify Email</a>
    <p style="color: #666; font-size: 12px;">If you did not create an account, you can safely ignore this email.</p>
</div>`

const resetPwdHtml = (token) =>
`<div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
    <h2>Password Reset Request</h2>
    <p>We received a request to reset your password. Click the button below to choose a new one:</p>
    <a href="${token}" style="display: inline-block; background-color: #008CBA; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 15px 0;">Reset Password</a>
    <p style="color: #666; font-size: 12px;">This link will expire shortly. If you didn't request this, please secure your account.</p>
</div>`

module.exports = {verifyHtml, resetPwdHtml};