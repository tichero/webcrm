const initialState = {
  data: [],
  loading: false,
  error: false,
  errorMsg:""
};

export default function testDataReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_PERSONS":
      return {
        data: [],
        loading: true,
        error: false,
        errorMsg:""
      };
    case "REQUEST_PERSONS_SUCCEEDED":
      return {
        data: action.data,
        loading: false,
        error: false,
        errorMsg:""
      };
    case "REQUEST_PERSONS_FAILED":
      return {
        data: [],
        loading: false,
        error: true,
        errorMsg:action.err
      };
    default:
      return state;
  }
}