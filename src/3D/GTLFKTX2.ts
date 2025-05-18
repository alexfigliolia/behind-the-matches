import { REVISION, WebGLRenderer } from "three";
import { GLTFLoader, KTX2Loader } from "three-stdlib";

export class GLTFKTX2 {
  private static readonly THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
  private static readonly LOADER = new KTX2Loader().setTranscoderPath(
    `${this.THREE_PATH}/examples/jsm/libs/basis/`,
  );

  public static readonly extendGLTF = (loader: GLTFLoader) => {
    loader.setKTX2Loader(this.LOADER.detectSupport(new WebGLRenderer()));
  };
}
