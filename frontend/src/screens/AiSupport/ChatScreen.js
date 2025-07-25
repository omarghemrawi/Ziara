import React, { useState, useRef, useEffect } from 'react';
import {
View,
Text,
TextInput,
 TouchableOpacity,
 StyleSheet,
 FlatList,
KeyboardAvoidingView,
Platform,
 ActivityIndicator, // For loading indicator
} from 'react-native';

const ChatScreen = () => {
const [messages, setMessages] = useState([
 { id: '1', text: "Hello! I'm your AI guide for Lebanon. I can tell you about tourist places, religious sites, restaurants, and food in Lebanon. What would you like to know?", sender: 'ai' },
]); const [inputText, setInputText] = useState('');
 const [isLoading, setIsLoading] = useState(false); // State for loading indicator
 const flatListRef = useRef(null);

 // Function to scroll to the bottom of the chat
 useEffect(() => {
 if (messages.length > 0) {
flatListRef.current.scrollToEnd({ animated: true });
 }
 }, [messages]);

const sendMessage = async () => {
if (inputText.trim() === '') return;

const newMessage = { id: Date.now().toString(), text: inputText, sender: 'user' };
setMessages((prevMessages) => [...prevMessages, newMessage]);
setInputText('');
 setIsLoading(true); // Start loading

try {
 // Make sure this IP address is accessible from your mobile device/emulator
// If running on a real device, 127.0.0.1 won't work. Use your computer's actual IP address (e.g., 192.168.1.X)
 const response = await fetch('http://192.168.0.103:5000/chat', { // THIS IS YOUR FLASK BACKEND URL
 method: 'POST',
 headers: {
'Content-Type': 'application/json',
 },
 body: JSON.stringify({ message: newMessage.text }),
 });

if (!response.ok) {
 // Log the error response from the server for debugging
 const errorData = await response.json();
 console.error('Backend error:', errorData);
 throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.response || 'Unknown error'}`);
}

 const data = await response.json();
 const aiResponse = { id: Date.now().toString() + 'ai', text: data.response, sender: 'ai' };
 setMessages((prevMessages) => [...prevMessages, aiResponse]);
 } catch (error) {
 console.error('Error sending message to backend:', error);
 const errorMessage = { id: Date.now().toString() + 'error', text: 'Sorry, I am unable to respond right now. Please try again later.', sender: 'ai' };
setMessages((prevMessages) => [...prevMessages, errorMessage]);
 } finally {
setIsLoading(false); // End loading
 }
};

const renderItem = ({ item }) => (
 <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
<Text style={styles.messageText}>{item.text}</Text>
</View>
 );
 return (
 <KeyboardAvoidingView
 style={styles.container}
 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
 keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20} // Adjust as needed
>
<FlatList
 ref={flatListRef}
 data={messages}
 renderItem={renderItem}
 keyExtractor={(item) => item.id}
 contentContainerStyle={styles.chatContent}
 />
 {isLoading && (
 <ActivityIndicator size="large" color="#FAC75C" style={styles.loadingIndicator} />
 )}
 <View style={styles.inputContainer}>
<TextInput
style={styles.textInput}
placeholder="Ask me about Lebanon..."
value={inputText}
 onChangeText={setInputText}
 onSubmitEditing={sendMessage} // Allows sending by pressing enter on keyboard
 returnKeyType="send"
blurOnSubmit={false}
 />
 <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
<Text style={styles.sendButtonText}>Send</Text>
 </TouchableOpacity>
</View>
 </KeyboardAvoidingView>
 );
};

const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: '#f4f4f4',
},
 chatContent: {
 paddingVertical: 10,
 paddingHorizontal: 15,
 },
 messageBubble: {
 padding: 10,
 borderRadius: 18,
 marginBottom: 8,
 maxWidth: '80%',
 },
 userBubble: {
 backgroundColor: '#FAC75C',
 alignSelf: 'flex-end',
 },
 aiBubble: {
 backgroundColor: '#ffffff',
 borderWidth: 1,
 borderColor: '#e0e0e0',
 alignSelf: 'flex-start',
 },
 messageText: {
 fontSize: 16,
 color: '#333',
},
 loadingIndicator: {
 marginVertical: 10,
}, inputContainer: {
 flexDirection: 'row',
alignItems: 'center',
paddingHorizontal: 15,
 paddingVertical: 10,
borderTopWidth: 1,
 borderTopColor: '#eee',
 backgroundColor: '#f9f9f9',
 },
 textInput: {
 flex: 1,
 borderWidth: 1,
 borderColor: '#ddd',
 borderRadius: 20,
 paddingHorizontal: 15,
paddingVertical: 10,
 fontSize: 16,
marginRight: 10,
 },
 sendButton: {
 backgroundColor: '#FAC75C',
 borderRadius: 20,
 paddingVertical: 10,
 paddingHorizontal: 20,
 justifyContent: 'center',
 alignItems: 'center',
 },
 sendButtonText: {
 color: 'white',
fontSize: 16,
 fontWeight: 'bold',
 },
});

export default ChatScreen;

