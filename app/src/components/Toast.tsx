import Toast from "react-native-toast-message";

interface MessageProps {
  type: string;
  title?: string;
  message: string;
}

export function Message(props: MessageProps) {
  Toast.show({
    type: props.type,
    text1: props.title,
    text2: props.message,
    visibilityTime: 3000,
  });
}
