import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
import PostCard from "../components/PostCard";
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';

const profileImg = require("../assets/userProfile.png");

const ProfileScreen = ({navigation, route}) => {
    const {user, logout} = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);

    const fetchPosts = async () => {
        try {
        const list = [];

        await firestore()
            .collection('posts')
            .where('userId', '==', user.uid)
            .orderBy('postTime', 'desc')
            .get()
            .then((querySnapshot) => {
            // console.log('Total Posts: ', querySnapshot.size);

            querySnapshot.forEach((doc) => {
                const {
                userId,
                post,
                postImg,
                postTime,
                likes,
                comments,
                } = doc.data();
                list.push({
                id: doc.id,
                userId,
                userName: 'Test Name',
                userImg:
                    'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                postTime: postTime,
                post,
                postImg,
                liked: false,
                likes,
                comments,
                });
            });
            });

        setPosts(list);

        if (loading) {
            setLoading(false);
        }

        console.log('Posts: ', posts);
        } catch (e) {
        console.log(e);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = () => {}

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
            <ScrollView style={styles.container}
                contentContainerStyle={{justifyContent: "center", alignItems: "center",}}
                showsVerticalScrollIndicator={false}
            >
                <Image source={profileImg} style={styles.userImg} />
                <Text style={styles.userName}>John</Text>
                <Text>{route.params ? route.params.userId: user.uid}</Text>
                <Text style={styles.aboutUser}>
                    aquarizzzzzzz
                </Text>
                <View style={styles.userBtnWrapper}>
                    {route.params ? (
                        <>
                    <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                        <Text style={styles.userBtnText}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                        <Text style={styles.userBtnText}>Follow</Text>
                    </TouchableOpacity>
                    </>
                    ) : (
                        <>
                    <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                        <Text style={styles.userBtnText}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                        <Text style={styles.userBtnText}>Logout</Text>
                    </TouchableOpacity>
                    </>
                    )}
                </View>

                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>22</Text>
                        <Text style={styles.userInfoSubTitle}>Posts</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>2202</Text>
                        <Text style={styles.userInfoSubTitle}>Followers</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>143</Text>
                        <Text style={styles.userInfoSubTitle}>Following</Text>
                    </View>
                </View>

                {post.map((item) => (
                    <PostCard key={item.id} item={item} onDelete={handleDelete}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
    },
    aboutUser: {
        fontSize: 12,
        fontWeight: "600",
        color: "#666",
        textAlign: "center",
        marginBottom: 10,
    },
    userBtnWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginBottom: 10,
    },
    userBtn: {
        borderColor: "#2e64e5",
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
    userBtnText: {
        color: "#2e64e5",
    },
    userInfoWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginVertical: 20,
    },
    userInfoItem: {
        justifyContent: "center",
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: "center",
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
    },
})