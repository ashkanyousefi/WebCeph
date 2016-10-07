import { ErrorCode } from './constants';

export interface ImageWorkerInstance extends Worker {
  postMessage(request: ImageWorkerRequest, transfarables?: any[]): void;
  addEventListener(type: 'message', listener: (event: ImageWorkerEvent) => void): void;
  addEventListener(type: 'error', listener: (event: ErrorEvent ) => void): void;
}

export interface ImageWorkerResponse {
  requestId: string;
  result?: {
    actionId: number;
    payload: ImageWorkerActionResult;
  };
  error?: ImageWorkerError;
  done: boolean;
}

export interface ImageWorkerError {
  message: string,
  code: ErrorCode,
}

export type ImageWorkerEvent = Event & { data: ImageWorkerResponse }

export type ImageWorkerActionResult = { isCephalo: boolean, shouldFlipX: boolean } | { url: string };

export interface ImageWorkerScaleEdit {
  method: 'scaleToFit' ,
  /**
   * height, width, mode
   */
  args: [number, number, string];
};

export interface ImageWorkerCropEdit {
  method: 'crop';
  args: [number, number, number, number];
}

export type ImageWorkerEdit = ImageWorkerScaleEdit | ImageWorkerCropEdit;

export type ImageWorkerPayload = { edits: ImageWorkerEdit[] };

export interface ImageWorkerRequest {
  id: string;
  file: File;
  actions: {
    type: ImageWorkerAction,
    payload?: ImageWorkerPayload,
  }[],
}

export interface ImageWorkerRequestEvent extends MessageEvent {
  data: ImageWorkerRequest;
}