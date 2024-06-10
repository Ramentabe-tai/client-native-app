import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { Link } from "expo-router";

const LoginPage = () => {
  return (
    <View style={styles.Wrapper}>
      <Text style={styles.Headline}>氏名</Text>
      <TextInput style={styles.FormTop} placeholder="大阪　太郎" />
      <Text style={styles.Headline}>住所</Text>
      <TextInput
        style={styles.Form}
        placeholder="大阪府大阪市北区中崎町"
      ></TextInput>
      <Text style={styles.Headline}>電話番号</Text>
      <TextInput style={styles.Form} placeholder="000-0000-0000"></TextInput>
      <View>
        <Link href="#" style={styles.Button}>
          次へ
        </Link>
      </View>
      <View>
        <Link href="#" style={styles.ButtonReturn}>
          戻る
        </Link>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  Wrapper: {
    paddingTop: 40,
  },
  Headline: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 73,
    marginBottom: 8,
  },
  FormTop: {
    width: 240,
    height: 40,
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 32,
    fontSize: 14,
    opacity: 0.5,
    marginHorizontal: "auto",
  },
  Form: {
    width: 240,
    height: 40,
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
    opacity: 0.5,
    marginHorizontal: "auto",
  },
  Button: {
    width: 180,
    height: 48,
    lineHeight: 48,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    backgroundColor: "#F48E35",
    textAlign: "center",
    borderRadius: 8,
    marginTop: 40,
    marginBottom: 16,
    marginHorizontal: "auto",
  },
  ButtonReturn: {
    width: 180,
    height: 48,
    lineHeight: 48,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    borderWidth: 1,
    borderColor: "#F48E35",
    textAlign: "center",
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: "auto",
  },
});
