import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const App = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [foto, setFoto] = useState<string | null>(null);

  const cameraRef = useRef<CameraView>(null);

  async function tirarFoto() {
    if (!cameraRef.current) return;

    const foto = await cameraRef.current.takePictureAsync();
    setFoto(foto.uri);
  }

  if (!permission || !permission.granted) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Você precisa conceder permissão para acessar a câmera.</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={{ color: "white" }}>
            Clique aqui para conceder permissão.
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>
        Camera {facing === "back" ? "Traseira" : "Frontal"}
      </Text>

      <CameraView
        mirror
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      />

      <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
        <Text style={styles.text}>Virar câmera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={tirarFoto}>
        <Text style={styles.text}>Tirar foto</Text>
      </TouchableOpacity>

      {foto && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>Prévia da imagem:</Text>
          <Image source={{ uri: foto }} style={styles.previewImage} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    gap: 16,
  },
  container: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  camera: {
    height: 500,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  previewContainer: {
    alignItems: "center",
  },
  previewLabel: {
    fontSize: 18,
    marginBottom: 8,
  },
  previewImage: {
    width: "100%",
    height: 500,
    borderRadius: 10,
  },
});

export { App };
