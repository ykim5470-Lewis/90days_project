# WECODE Notes Management

### Summary

WECODE 팀 프로젝트 - 투자자 보유 원리금수취권 관리 페이지입니다.

목적
- 보유 중인 원리금수취권의 일목요연한 현황 파악
- 매각을 원하는 원리금수취권(이하 “매도 원권”이라 칭함)들을 어떻게 효율적으로 Pick-Up 하는가?
- 매도-원권의 설정에 따라 보유 중인 원리금수취권 목록에 실시간으로 반영 (Preview)
- UI/UX 상으로 가급적 효율성을 추구 (비용-효율성과 사용성의 적정한 균형점)

### Spec

사내 PostgREST 서버와 통신하는 중개 서버와 웹 렌더링을 동시에 수행하기 위해 **Next.js**를 사용합니다. 안정적인 설계 확장성을 보장하기 위해 **TypeScript**를 사용합니다.

### How To Run

##### DOTENV

로컬에서 환경변수를 관리하는 `.env` 파일을 루트 디렉터리에 추가해야 합니다.

```
PORT=서버 렌더링 시 접근할 포트
API_URL=PostgREST 접속 주소
BASE_URL=플랫폼 하단에 위치할 subpath
```

##### Install & Dev

```
yarn install
yarn dev (Client-Side Rendering)
```

##### Build & SSR in Local

```
yarn build
yarn start
```

##### Deploy

master 브랜치로 push할 경우, `./github` 디렉터리에 저장된 Github Actions 템플릿을 통해 AWS ECS로 자동 배포됩니다.
