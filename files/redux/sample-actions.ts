import { Sample } from '../../types';

export const SAMPLE_ACTIONS = {
  ADD_SAMPLE: 'sample/ADD_SAMPLE',
  REMOVE_SAMPLE: 'sample/REMOVE_SAMPLE',
  UPDATE_SAMPLE: 'sample/UPDATE_SAMPLE',
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
