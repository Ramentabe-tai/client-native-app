import { StyleSheet,  View } from "react-native";
import React, { useState } from 'react'
import { Button } from "react-native-elements";

export default function PlusBtn() {
    const [isPushed, setIsPushed] = useState(false)
  return (
    <View style={styles.BtnConteiner}>
      {isPushed && (
        <View style={styles.moreBtnSection}>
          <Button
            title="出"
            onPress={() => setIsPushed(!isPushed)}
            buttonStyle={styles.button}
          />

          <Button
            title="入"
            onPress={() => setIsPushed(!isPushed)}
            buttonStyle={styles.button}
          />
        </View>
      )}
      <Button
        title={isPushed ? "x" : "+"}
        onPress={() => setIsPushed(!isPushed)}
        buttonStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    backgroundColor: "red",
    borderRadius: 50,
    padding: 0,
    margin: 10
    },
    BtnConteiner: {
      flexDirection: "row"  
    },
    moreBtnSection: {
      flexDirection: "row"
  }
});