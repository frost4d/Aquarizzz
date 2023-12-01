
import { StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, ActivityIndicator, TextInput, Button, ScrollView} from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [postTitle, setPostTitle] = useState("")
  const [postBody, setPostBody] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const fetchData = async (limit = 10) => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=10'
    )
    const data = await response.json()
    setPostList(data)
    setIsLoading(false)
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchData(20)
    setRefreshing(false)
  }

  const addPost = async () => {
    setIsPosting(true)
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: postTitle,
        body: postBody
      })
    })
    const newPost = await response.json()
    setPostList([newPost, ...postList])
    setPostTitle("")
    setPostBody("")
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if(isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='0000ff' />
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='Post Title' value={postTitle} onChangeText={setPostTitle} />
        <TextInput style={styles.input} placeholder='Post Body' value={postBody} onChangeText={setPostBody} />
        <Button title={isPosting ? "Adding..." : "Add Post"} 
        onPress={addPost}
        disabled={isPosting} />
      </View>
      <View style={styles.listContainer}>
        <FlatList 
        data={postList}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <Text style={styles.titleText} >{item.title}</Text>
              <Text style={styles.bodyText} >{item.body}</Text>
            </View>
          )
        }} 
        ItemSeparatorComponent={() => {
          <View style={{height: 16,}} />
        }}
        ListEmptyComponent={<Text>No Posts Found</Text>}
        ListHeaderComponent={<Text style={styles.headerText} >Post List</Text>}
        ListFooterComponent={<Text style={styles.footerText} >End of List</Text>}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        />
      </View>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 7,
  },

  titleText: {
    fontSize: 30,
  },

  bodyText: {
    fontSize: 24,
    color: '#666666'
  },

  headerText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 12,
  },

  footerText: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 12,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    margin: 16,
  },

  input:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
});
