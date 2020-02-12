import { NextPage } from "next";
import { useState } from "react";

import { fetchKROSS } from "../ajax";

interface IMember {
  member_no: string;
  email: string;
  div_inv: string;
  regpath: string;
  pc_div: string;
}
interface ILayoutProps {
  children: React.ReactNode;
  result: boolean;
  member: IMember;
}

const Index: NextPage = (props: ILayoutProps) => {
  console.log(props);
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

export default Index;
