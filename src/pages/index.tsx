import { NextPage, NextPageContext } from "next";
import { useState } from "react";
import { fetchKROSS } from "../ajax";
import { Store } from "redux";
import { useSelector } from "react-redux";
import { setNotesData } from "../redux/reducers/notes";

interface Context extends NextPageContext {
  store: Store;
}
interface INotes {
  id: number;
  inBasket: boolean;
  product_code: string;
  manage_balance: number;
  origin_principal: number;
  rate: number;
  startAt: string;
  returnAt: string;
  period: number;
  leftPeriod: number;
}
interface INotesProps {
  children: React.ReactNode;
  notes: Array<INotes>;
}
const Index: NextPage = (props: INotesProps) => {
  console.log("props: ", props);
  const storeNotes = useSelector(reducers => reducers.notes.notesState);
  console.log("storeNotes: ", storeNotes);
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
      <div>{props.notes && `notes.length ${props.notes.length}`}</div>
    </div>
  );
};
Index.getInitialProps = async (ctx: Context) => {
  const { dispatch, getState } = ctx.store;
  try {
    let res = await fetch(
      "http://10.28.3.231:7999/svc/pgt2/notes?member_id=eq.30&state=eq.investing"
    );
    let data = await res.json();
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
    const notes = getState().notes.notesState;
    return { notes };
  } catch (err) {
    console.log("At Index getInitialProps err: ", err);
  }
};
export default Index;
