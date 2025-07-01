import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const { name, email, phone, totalPrice } = await req.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kieuviettien1@gmail.com',
        pass: 'qcmp ppsy ggyd vqjy',
      },
    })

    const mailOptions = {
      from: '"Course System" <kieuviettien1@gmail.com>',
      to: email,
      subject: '🎓 Course Registration Confirmation',
      html: `
        <h3>Hello ${name},</h3>
        <p>🎉 Thank you for registering for our course.</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Total Payment:</strong> $${totalPrice}</p>
        <p>✅ We have received your payment. Our team will contact you soon.</p>
        <br/>
        <p>Regards,<br/>Course Admin</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error sending mail:', error)
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
