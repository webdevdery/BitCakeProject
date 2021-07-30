export const SET_PROFILE = 'SET_PROFILE';

export function updateProfile(payload) {
  return {
    type: SET_PROFILE,
    payload: payload,
  };
}