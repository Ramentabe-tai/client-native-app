import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DepositCompletedModal = () => {
  return (
    <View>
      <View>
        <Image />
        <Text>¥10000円入金されました。</Text>
      </View>
      <Button>
        <Text>確認</Text>
      </Button>
    </View>
  );
}

export default DepositCompletedModal

const styles = StyleSheet.create({})