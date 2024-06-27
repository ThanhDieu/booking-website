import IMG_URL from "@/constants/imageUrl"

const getImagePath = (path: string, size = 1000) => {
  if (!path) {
    return "";
  }
  if (path.includes("https://")) {
    // optimize for cloudinary image. Since the CldImage component will not work for next export
    // so use the params optimization
    if (size) {
      const cloudinaryPath = "/upload/";
      const filename = path.substring(path.lastIndexOf(cloudinaryPath) + cloudinaryPath.length);
      return path.replace(filename, `w_${size},q_auto,f_auto/${filename}`)
    }
    return path;
  }
  return IMG_URL.origin + path;
}

export default getImagePath;
