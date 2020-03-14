import { Reducer } from 'redux';
import { Sample, SampleAction } from './types';

export const SAMPLE_ACTIONS = {
  ADD_SAMPLE: 'sample/ADD_SAMPLE',
  REMOVE_SAMPLE: 'sample/REMOVE_SAMPLE',
  UPDATE_SAMPLE: 'sample/UPDATE_SAMPLE',
};

export type SampleState = {
  samples: Sample[],
};

export const sampleInitialState: SampleState = {
  samples: [],
};

/** Reducer */
const reducer: Reducer<SampleState, SampleAction> =
  (currentState: SampleState = sampleInitialState, action: SampleAction) => {
    switch (action.type) {
      case SAMPLE_ACTIONS.ADD_SAMPLE: {
        // const { value } = action.payload;
        /** Add functionality to update current state */
        return currentState;
      }
      case SAMPLE_ACTIONS.REMOVE_SAMPLE: {
        // const { id } = action.payload;
        /** Add functionality to update current state */
        return currentState;
      }
      case SAMPLE_ACTIONS.UPDATE_SAMPLE: {
        // const { id, value } = action.payload;
        /** Add functionality to update current state */
        return currentState;
      }
      default:
        return currentState;
    }
  };

  /** ACTION GENERATORS */

export const addSampleAction = (value: Sample) => ({
  type: SAMPLE_ACTIONS.ADD_SAMPLE,
  payload: { value },
});

export const removeSampleAction = (id: string) => ({
  type: SAMPLE_ACTIONS.REMOVE_SAMPLE,
  payload: { id },
});

export const updateSampleAction = (id: string, value: string) => ({
  type: SAMPLE_ACTIONS.UPDATE_SAMPLE,
  payload: { id, value },
});

export default reducer;
