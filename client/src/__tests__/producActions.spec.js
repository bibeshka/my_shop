import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import * as ProductsActions from "../store/home/actions";
import thunk from "redux-thunk";
import urlBasic from "../utils/UrlVar";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Products actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("get all product", () => {
    fetchMock.getOnce("/");
  });
});
