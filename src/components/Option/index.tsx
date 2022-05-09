import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageProps,
  Text,
} from "react-native";

import { styles } from "./styles";

interface IOptionProps extends TouchableOpacityProps {
  title: string;
  image: ImageProps;
}

export function Option({ image, title, ...rest }: IOptionProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
