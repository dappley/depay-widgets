import ButtonCircularStyle from '../styles/ButtonCircularStyle'
import ButtonPrimaryStyle from '../styles/ButtonPrimaryStyle'
import CardStyle from '../styles/CardStyle'
import DialogStyle from '../styles/DialogStyle'
import FontStyle from '../styles/FontStyle'
import FooterStyle from '../styles/FooterStyle'
import GraphicStyle from '../styles/GraphicStyle'
import HeightStyle from '../styles/HeightStyle'
import IconStyle from '../styles/IconStyle'
import ImageStyle from '../styles/ImageStyle'
import InputStyle from '../styles/InputStyle'
import LabelStyle from '../styles/LabelStyle'
import LoadingTextStyle from '../styles/LoadingTextStyle'
import PaddingStyle from '../styles/PaddingStyle'
import RangeSliderStyle from '../styles/RangeSliderStyle'
import ResetStyle from '../styles/ResetStyle'
import SkeletonStyle from '../styles/SkeletonStyle'
import TextButtonStyle from '../styles/TextButtonStyle'
import TextStyle from '../styles/TextStyle'
import TokenAmountStyle from '../styles/TokenAmountStyle'

export default (style)=>{

  style = Object.assign({
    colors: {
      primary: '#ea357a',
      buttonText: '#ffffff',
      icons: '#000000',
      text: '#212529',
    },
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  }, style);
  
  return(
    [
      ResetStyle(style),
      FontStyle(style),
      DialogStyle(style),
      ButtonCircularStyle(style),
      ButtonPrimaryStyle(style),
      CardStyle(style),
      FooterStyle(style),
      GraphicStyle(style),
      SkeletonStyle(style),
      TokenAmountStyle(style),
      TextStyle(style),
      IconStyle(style),
      PaddingStyle(style),
      HeightStyle(style),
      LabelStyle(style),
      LoadingTextStyle(style),
      RangeSliderStyle(style),
      InputStyle(style),
      TextButtonStyle(style),
      ImageStyle(style),
    ].join('')
  )
}
