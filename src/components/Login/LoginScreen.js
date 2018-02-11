import React, { Component } from 'react'
import Logo from './Logo'
import Form from './Form'
import Wallpaper from './Wallpaper'
import ButtonSubmit from './ButtonSubmit'

export default class LoginScreen extends Component {
  render () {
    return (
      <Wallpaper>
<Logo />
<Form />
<ButtonSubmit />
</Wallpaper>
)
  }
}
