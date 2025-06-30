'use client'

import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons'
import {
    LoginForm,
    ProConfigProvider,
    ProFormText,
    ProFormCheckbox
} from '@ant-design/pro-components'
import { message, theme } from 'antd'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    const { token } = theme.useToken()
    const [isSignUp, setIsSignUp] = useState(false)
    const router = useRouter()

    return ( <
        ProConfigProvider hashed = { false } >
        <
        div style = {
            { position: 'relative', height: '100vh', overflow: 'hidden' } } > { ' ' } { /* Video background */ } { ' ' } <
        video autoPlay loop muted style = {
            {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0
            }
        } >
        <
        source src = "https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        type = "video/mp4" /
        >
        <
        /video> { /* Form container */ } { ' ' } <
        div style = {
            {
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }
        } >
        <
        div style = {
            {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '40px',
                borderRadius: '10px',
                width: 400
            }
        } >
        <
        LoginForm locale = "en-US"
        title = { isSignUp ? 'Sign Up' : 'Login' }
        subTitle = { isSignUp ? 'Create a new account' : 'Login to your account' }
        onFinish = {
            async values => {
                const storedUser = JSON.parse(localStorage.getItem('user'))

                if (isSignUp) {
                    localStorage.setItem('user', JSON.stringify(values))
                    message.success('Signed up successfully!')
                    setIsSignUp(false)
                } else {
                    if (
                        storedUser &&
                        storedUser.gmail === values.gmail &&
                        storedUser.password === values.password
                    ) {
                        message.success('Logged in successfully!')
                        router.push('/main/dashboard')
                    } else {
                        message.error('Invalid gmail or password!')
                    }
                }
            }
        }
        submitter = {
            {
                searchConfig: {
                    submitText: isSignUp ? 'Sign Up' : 'Login'
                }
            }
        } >
        {
            isSignUp && ( <
                ProFormText name = "yourname"
                fieldProps = {
                    {
                        size: 'large',
                        prefix: < UserOutlined className = "prefixIcon" / >
                    }
                }
                placeholder = "Your name"
                rules = {
                    [{ required: true, message: 'Please enter your name!' }] }
                />
            )
        } <
        ProFormText name = "gmail"
        fieldProps = {
            {
                size: 'large',
                prefix: < MobileOutlined className = "prefixIcon" / >
            }
        }
        placeholder = "Gmail"
        rules = {
            [{ required: true, message: 'Please enter your username!' }] }
        /> <
        ProFormText.Password name = "password"
        fieldProps = {
            {
                size: 'large',
                prefix: < LockOutlined className = "prefixIcon" / >
            }
        }
        placeholder = "Password"
        rules = {
            [{ required: true, message: 'Please enter your password!' }] }
        /> {
            !isSignUp && ( <
                div style = {
                    { marginBottom: 16 } } >
                <
                ProFormCheckbox noStyle name = "autoLogin" >
                Remember me { ' ' } <
                /ProFormCheckbox>{' '} <
                a style = {
                    { float: 'right' } } > Forgot password ? < /a>{' '} <
                /div>
            )
        } <
        div style = {
            { textAlign: 'center', marginTop: 16 } } > { ' ' } {
            isSignUp ? ( <
                span >
                Already have an account ? { ' ' } <
                a onClick = {
                    () => setIsSignUp(false) }
                style = {
                    { cursor: 'pointer' } } >
                Login { ' ' } <
                /a>{' '} <
                /span>
            ) : ( <
                span >
                Don’ t have an account ? { ' ' } <
                a onClick = {
                    () => setIsSignUp(true) }
                style = {
                    { cursor: 'pointer' } } >
                Sign Up { ' ' } <
                /a>{' '} <
                /span>
            )
        } { ' ' } <
        /div>{' '} <
        /LoginForm>{' '} <
        /div>{' '} <
        /div>{' '} <
        /div>{' '} <
        /ProConfigProvider>
    )
}

export default Page