import React from "react";
import { Text, View } from "react-native";

import { Copyright } from "../Copyright";

import { feedbackTypes } from "../../utils/feedbackTypes";
import { IFeedbackType } from "../Widget";

import { styles } from "./styles";
import { Option } from "../Option";

interface IOpstionsProps {
  onFeedbackTypeChanged: (feedbackType: IFeedbackType) => void;
}

export function Options({ onFeedbackTypeChanged }: IOpstionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>
      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            title={value.title}
            image={value.image}
            key={key}
            onPress={() => onFeedbackTypeChanged(key as IFeedbackType)}
          />
        ))}
      </View>
      <Copyright />
    </View>
  );
}
