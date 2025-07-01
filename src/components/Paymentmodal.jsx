'use client'
import { Modal, Form, Input, Button, message } from 'antd'
import { useState } from 'react'
import '../styles/payment.scss' // giữ lại nếu không ảnh hưởng loading

const Paymentmodal = ({ visible, onClose, totalPrice }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, totalPrice }),
      })

      const result = await res.json()

      if (result.success) {
        message.success('Your information has been submitted. Please check your email!')
        form.resetFields()
        onClose()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error:', error)
      message.error('Failed to send confirmation email!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Payment Transferred"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Student Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>{' '}
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input placeholder="0123456789" />
        </Form.Item>{' '}
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Invalid email format' },
          ]}
        >
          <Input placeholder="example@gmail.com" />
        </Form.Item>{' '}
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center', gap: 32 }}>
          <div>
            <h2 className="info-bank-title"> Bank Information </h2>{' '}
            <p>
              {' '}
              <strong> Account Holder: </strong> Kiều Việt Tiến{' '}
            </p>{' '}
            <p>
              {' '}
              <strong> Bank: </strong> MB Bank{' '}
            </p>{' '}
            <p>
              {' '}
              <strong> Account Number: </strong> 0985793892{' '}
            </p>{' '}
            <p
              style={{
                fontSize: '15.5px',
                fontWeight: '800',
              }}
            >
              {' '}
              <strong> Amount To Pay: </strong> ${totalPrice}{' '}
            </p>{' '}
          </div>{' '}
          <div>
            <img
              src="/qrcode.png"
              alt="QR Code"
              style={{ width: '100%', maxWidth: 300, marginTop: 10 }}
            />{' '}
          </div>{' '}
        </div>{' '}
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            I Have Transferred{' '}
          </Button>{' '}
        </Form.Item>{' '}
      </Form>{' '}
    </Modal>
  )
}

export default Paymentmodal
