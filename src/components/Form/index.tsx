import React, { useState } from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { captureScreen } from "react-native-view-shot";
import * as FyleSystem from "expo-file-system";

import { theme } from "../../theme";
import { styles } from "./styles";
import { IFeedbackType } from "../Widget";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { ScreenshotButton } from "../ScreenshotButton";
import { Button } from "../Button";
import { api } from "../../configs/axios";

interface IFormProps {
  feedbackType: IFeedbackType;
  setNullFromFeedBackType: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  setNullFromFeedBackType,
  onFeedbackSent,
}: IFormProps) {
  const [screenShot, setScreenShot] = useState<string | null>(null);
  const [isLoading, setInsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenShot() {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => setScreenShot(uri))
      .catch((error) => console.log(error));
  }
  function handleScreenShotRemove() {
    setScreenShot(null);
  }

  async function handleSendFeedback() {
    if (isLoading) {
      return;
    }
    setInsLoading(true);

    const screendShotBase64 =
      screenShot &&
      FyleSystem.readAsStringAsync(screenShot, { encoding: "base64" });

    try {
      await api.post("/feedback", {
        type: feedbackTypeInfo.title,
        screenShot: `data:image/png;base64, ${screendShotBase64}`,
        comment,
      });
      onFeedbackSent();
    } catch (error) {
      console.log(error);
      setInsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={setNullFromFeedBackType}>
          <ArrowLeft
            size={24}
            weight='bold'
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder='Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...'
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          onRemoveShot={handleScreenShotRemove}
          onTakeShot={handleScreenShot}
          screenshot={screenShot}
        />
        <Button isLoading={isLoading} onPress={handleSendFeedback} />
      </View>
    </View>
  );
}
