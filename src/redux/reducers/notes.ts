//초기화
export const initialState = {
  notesState: []
};

//액션 타입
export const SET_NOTES = "SET_NOTES";

//액션 생성 함수
export const setNotesData = data => ({
  type: SET_NOTES,
  data
});

//리듀서, (익숙해지면 prev, next로 바꿀것)
export default (notesState = initialState, action) => {
  switch (action.type) {
    case SET_NOTES: {
      return {
        notesState: action.data
      };
    }
    default: {
      return {
        ...notesState
      };
    }
  }
};
