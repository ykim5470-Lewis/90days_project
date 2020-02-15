import { NextPage, NextPageContext } from "next";
import { useState } from "react";
import { fetchKROSS } from "../ajax";
import { Store } from "redux";
import { setNotesData } from "../redux/reducers/notes";

interface Context extends NextPageContext {
  store: Store;
}
const Index: NextPage = () => {
  const [state, setState] = useState([]);
  async function onClick() {
    try {
      // 현재 PostgREST 쿼리가 노출되어 있습니다.
      // 실제 쿼리는 api 서버 안쪽으로 숨기고
      // 클라이언트 영역에서는 alias 요청으로 쿼리를 호출하게 패턴을 변경해주세요.
      const json = await fetchKROSS("ups_info?limit=1");
      setState(json[0]);
    } catch (e) {
      throw e;
    }
  }

  return (
    <div>
      <button type="button" onClick={onClick}>
        Click me
      </button>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
};
Index.getInitialProps = async (ctx: Context) => {
  const { dispatch } = ctx.store;
  try {
    let data = await fetchKROSS("notes?member_id=eq.30&state=eq.investing");
    console.log("fetchKROSSData: ", data.length);
    const processedNotes = data.map(obj => {
      return {
        id: obj["id"],
        inBasket: false,
        product_code: obj["product_code"],
        manage_balance: obj["origin_principal"],
        origin_principal: obj["origin_principal"],
        rate: obj["rate"],
        startAt: obj["startAt"],
        returnAt: obj["returnAt"],
        period: obj["period"],
        leftPeriod: obj["period"]
      };
    });
    dispatch(setNotesData(processedNotes));
  } catch (err) {
    console.log("At Index getInitialProps Err: ", err);
  }
};
export default Index;
