import React, { useState } from 'react'
import { Pressable, Text, View, Modal, StyleSheet } from "react-native";

export default function Saving() {
    const [openModal, setOpenModal] = useState(false)
    return (
      <View>
        <Pressable onPress={() => setOpenModal(true)}>
          <Text>入金</Text>
        </Pressable>
        {openModal && (
          <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={() => setOpenModal(false)}
          >
            <View style={styles.modalSection}>
                <View style={styles.coinImg}></View>            
                <Text>모달 내용</Text>
                <Pressable onPress={() => setOpenModal(false)}>
                  <Text>確認</Text>
                </Pressable>
              
            </View>
          </Modal>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
  modalSection: {
    width: 300,
    height: 300,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    // justifyContent: "center",
    // alignItems: "center",
    transform: [{ translateX: 50}, { translateY: 100 }],
  },
  coinImg: {
    width: 10,
    height: 10,
    backgroundColor: "black",
  },
});