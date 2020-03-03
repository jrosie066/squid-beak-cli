/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reducer } from 'redux';
import { Sample, SampleAction } from '../../types';
import { SAMPLE_ACTIONS } from './sample-actions';

export interface SampleState {
  samples: Sample[];
}

export const sampleInitialState: SampleState = {
  samples: [],
};

export const sampleReducer: Reducer<SampleState, SampleAction> =
  (currentState: SampleState = sampleInitialState, action: SampleAction) => {
    switch (action.type) {
      case SAMPLE_ACTIONS.ADD_SAMPLE: {
        const { value } = action.payload;
        /** Add functionality to update current state */
        return currentState;
      }
      case SAMPLE_ACTIONS.REMOVE_SAMPLE: {
        const { id } = action.payload;
        /** Add functionality to update current state */
        return currentState;
      }
      case SAMPLE_ACTIONS.UPDATE_SAMPLE: {
        const { id, value } = action.payload;
        /** Add functionality to update current state */
        return currentState;
      }
      default:
        return currentState;
    }
  };
