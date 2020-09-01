import  React from 'react'
import { TouchableOpacity} from 'react-native'

const MyTouchOpacity = (props: any) => {
        return (
           <TouchableOpacity
           onPress={props.onPress}
           style={props.style}>
               {props.children}
           </TouchableOpacity>
        )
    }

export default MyTouchOpacity;