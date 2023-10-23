import { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Slide, { SlideProps } from '@mui/material/Slide'
import React from 'react'

type TransitionProps = Omit<SlideProps, 'direction'>

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
// })

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction='left' />
}

function Message(props: any) {
  const { content, duration, type, bgColor } = props
  // 开关控制：默认true,调用时会直接打开
  const [open, setOpen] = useState(false)
  // 关闭消息提示
  const handleClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    setOpen(true)
  }, [])
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      TransitionComponent={TransitionRight}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
      sx={{ top: '90px !important' }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '320px' }}>
        {content}
      </Alert>
    </Snackbar>
  )
}

const message = {
  dom: null,
  success({ content, duration = 3000 }) {
    // 创建一个dom2
    this.dom = document.createElement('div')
    // 定义组件，
    const JSXdom = <Message content={content} duration={duration} type='success' bgColor={'#56ca00'}></Message>
    // 渲染DOM
    ReactDOM.render(JSXdom, this.dom)
    // 置入到body节点下
    document.body.appendChild(this.dom)
  },
  error({ content, duration = 3000 }) {
    this.dom = document.createElement('div')
    const JSXdom = <Message content={content} duration={duration} type='error' bgColor={'#ff4c51'}></Message>
    ReactDOM.render(JSXdom, this.dom)
    document.body.appendChild(this.dom)
  },
  warning({ content, duration = 3000 }) {
    this.dom = document.createElement('div')
    const JSXdom = <Message content={content} duration={duration} type='warning' bgColor={'ffb400'}></Message>
    ReactDOM.render(JSXdom, this.dom)
    document.body.appendChild(this.dom)
  },
  info({ content, duration = 3000 }) {
    this.dom = document.createElement('div')
    const JSXdom = <Message content={content} duration={duration} type='warning' bgColor={'ffb400'}></Message>
    ReactDOM.render(JSXdom, this.dom)
    document.body.appendChild(this.dom)
  }
}

export default message
