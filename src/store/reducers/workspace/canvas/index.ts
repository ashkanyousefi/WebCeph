import assign from 'lodash/assign';
import scale, { getScale, getScaleOrigin } from './scale';
import canvasSize, { getCanvasSize } from './canvasSize';
import activeTool, { getActiveToolId, getActiveToolCreator } from './activeTool';
import highlightedStep, { getHighlightedStep } from './highlightedStep';

export default assign(
  { },
  canvasSize,
  highlightedStep,
  activeTool,
  scale,
);

export {
  getCanvasSize,
  getScale,
  getScaleOrigin,
  getActiveToolId,
  getActiveToolCreator,
  getHighlightedStep,
};