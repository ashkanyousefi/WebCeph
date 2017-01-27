import { handleActions } from 'utils/store';
import { createSelector } from 'reselect';

import omit from 'lodash/omit';
import without from 'lodash/without';

const KEY_WORKSPACE_SETTINGS: StoreKey = 'workspaces.settings';

const reducers: Partial<ReducerMap> = {
  [KEY_WORKSPACE_SETTINGS]: handleActions<typeof KEY_WORKSPACE_SETTINGS>({
    ADD_NEW_WORKSPACE: (state, { payload: { id, settings } }) => {
      return {
        ...state,
        [id]: {
          ...settings,
          images: [],
          mode: 'tracing',
          tracing: {
            imageId: null,
          },
          superimposition: {
            mode: 'auto',
          },
        },
      };
    },
    REMOVE_WORKSPACE: (state, id) => omit(state, id) as typeof state,
    SET_SUPERIMPOSITION_MODE_REQUESTED: (state, { payload: { workspaceId, mode } }) => {
      return {
        ...state,
        [workspaceId]: {
          ...state[workspaceId],
          superimposition: {
            ...state[workspaceId].superimposition,
            mode,
          },
        },
      };
    },
    SET_WORKSPACE_MODE_REQUESTED: (state, { payload: { workspaceId, mode } }) => {
      return {
        ...state,
        [workspaceId]: {
          ...state[workspaceId],
          mode,
        },
      };
    },
    SUPERIMPOSE_IMAGES_REQUESTED: (state, { payload: { workspaceId, order }}) => {
      return {
        ...state,
        [workspaceId]: {
          ...state[workspaceId],
          superimposition: {
            ...state[workspaceId].superimposition,
            order,
          },
        },
      };
    },
    SET_ACTIVE_IMAGE_ID: (state, { payload: { workspaceId, imageId }}) => {
      return {
        ...state,
        [workspaceId]: {
          ...state[workspaceId],
          tracing: {
            ...state[workspaceId].tracing,
            imageId,
          },
        },
      };
    },
    LOAD_IMAGE_STARTED: (state, { payload: { workspaceId, imageId } }) => {
      return {
        ...state,
        [workspaceId]: {
          ...state[workspaceId],
          images: [ ...state[workspaceId].images, imageId ],
        },
      };
    },
    CLOSE_IMAGE_REQUESTED: (state, { payload: { workspaceId, imageId } }) => {
      return {
        ...state,
        [workspaceId]: {
          ...state[workspaceId],
          images: without(state[workspaceId].images, imageId),
        },
      } as typeof state;
    },
  }, { }),
};

export default reducers;

export const getAllWorkspacesSettings = (state: StoreState) => state[KEY_WORKSPACE_SETTINGS];

export const getWorkspaceSettingsById = createSelector(
  getAllWorkspacesSettings,
  settings => (workspaceId: string) => settings[workspaceId],
);

export const getWorkspaceMode = createSelector(
  getWorkspaceSettingsById,
  getSettings => (workspaceId: string) => getSettings(workspaceId).mode,
);

export const getWorkspaceImageIds = createSelector(
  getWorkspaceSettingsById,
  (getSettings) => (id: string) => getSettings(id).images,
);

export const isTracing = createSelector(
  getWorkspaceMode,
  (getMode) => (id: string) => getMode(id) === 'tracing',
);
export const isSuperimposing = createSelector(
  getWorkspaceMode,
  (getMode) => (id: string) => getMode(id) === 'superimposition',
);

export const getSuperimpositionSettingsByWorkspaceId = createSelector(
  getWorkspaceSettingsById,
  (getSettings) => (id: string) => getSettings(id).superimposition,
);

export const getSuperimpsotionMode = createSelector(
  getSuperimpositionSettingsByWorkspaceId,
  (getSettings) => (id: string) => getSettings(id).mode,
);

export const getTracingImageId = createSelector(
  getWorkspaceSettingsById,
  (getSettings) => (workspaceId: string) => getSettings(workspaceId).tracing.imageId,
);
