import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import myprac from "../../../assets/myparc.png";
import introimg from "../../../assets/introimg.png";
import { fetchBanners, fetchCMS } from "../../services/cms";
import striptags from "striptags";

const Intro = ({ navigation }) => {
  const [hometext, setHomeText] = useState();
  const [bannerimg, setBannerImg] = useState();
  const [cmsLoading, setCmsLoading] = useState(true);
  const [bannerLoading, setBannerLoading] = useState(true);

  const getCms = async () => {
    try {
      const res = await fetchCMS("home");
      setHomeText(res?.data?.description);
    } catch (error) {
      console.log(error);
    } finally {
      setCmsLoading(false);
    }
  };

  const getBanners = async () => {
    try {
      const res = await fetchBanners("home");
      setBannerImg(res?.data?.image_path);
    } catch (error) {
      console.log(error);
    } finally {
      setBannerLoading(false);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  useEffect(() => {
    getCms();
  }, []);

  console.log(striptags(hometext));
  return (
    <View style={styles.container}>
      <Image style={styles.imageLogo} source={myprac} />
      <View style={styles.imgBox}>
        <View style={styles.imgBox}>
          {bannerLoading ? null : ( // <ActivityIndicator size="large" color="#6565E2" />
            <Image
              source={bannerimg ? { uri: bannerimg } : introimg}
              style={styles.middleimg}
            />
          )}
        </View>
      </View>
      <View style={styles.belowContainer}>
        {cmsLoading ? null : (
          // <ActivityIndicator size="large" color="#fff" />
          <Text
            style={styles.containerText}
            numberOfLines={3}
            // adjustsFontSizeToFit
            // minimumFontScale={0.65}
          >
            {striptags(hometext)}
          </Text>
        )}

        <TouchableOpacity style={styles.introButton}>
          <Text
            onPress={() => navigation.navigate("login")}
            style={styles.introButtonText}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  imageLogo: {
    marginTop: 50,
    width: "70%",
    objectFit: "contain",
  },
  imgBox: {
    marginTop: 20,
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
    height: 200,
  },
  middleimg: {
    width: "90%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    height: "100%",
    objectFit: "cover",
  },
  belowContainer: {
    flex: 1,
    marginTop: 50,
    width: "100%",
    // height: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    backgroundColor: "#6565E2",
  },
  containerText: {
    fontSize: 24,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 35,
    fontFamily: "Poppins_700Bold",
    color: "#fff",
  },
  innerText: {
    color: "#0000B5",
  },
  introButton: {
    width: "85%",
    paddingVertical: 17,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
  },
  introButtonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#0000B5",
  },
});

export default Intro;
