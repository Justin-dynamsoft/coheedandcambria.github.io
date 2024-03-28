import { EnumImageSourceState } from "../enum/EnumImageSourceState";
export interface ImageSourceStateListener {
    onImageSourceStateReceived?: (status: EnumImageSourceState) => void;
}
