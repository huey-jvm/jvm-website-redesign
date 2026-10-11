import "server-only";
import { getImageProps, type ImageProps } from "next/image";
import { preload } from "react-dom";

export default function Image(input: ImageProps) {
  const { props } = getImageProps({ ...input, fetchPriority: input.priority || input.preload ? "high" : input.fetchPriority });
  if (input.priority || input.preload) preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes, fetchPriority: "high" });
  return <img {...props} alt={input.alt} />;
}
