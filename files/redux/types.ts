/** Add Types related to redux here */
import { Action } from 'redux';

export type Sample = {
  id: string;
  sample1: string;
  sample2: string;
}

export type SampleAction = Action<string> & {
  payload: Record<string,any>;
};
