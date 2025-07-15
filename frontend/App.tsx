import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
function App() {

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:100,
    height:100,
    margin:"auto"
  },
});

export default App;
