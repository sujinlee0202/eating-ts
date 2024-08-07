# EATING : 맛집 소개 사이트

## 프로젝트 소개

이 프로젝트는 리뷰 권한이 있는 유저가 맛집과 리뷰를 등록하고, 일반 사용자는 위치를 기반으로 맛집을 찾고 리뷰를 확인할 수 있는 서비스입니다.

## 설치 방법

### 사전 요구사항

- Node.js
- npm

### 설치 단계

1. git repository clone

```
git clone https://github.com/sujinlee0202/eating-ts
cd [repo_name]
```

2. 의존성 설치

```
npm install
```

3. 개발 서버 시작

```
npm run dev
```

## 주요 기능

- **지도에 맛집 표시** [위키로 이동하기](https://github.com/sujinlee0202/eating-ts/wiki/%EB%A9%94%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80)

  - Naver Map API를 사용해 지도에 맛집을 표시합니다.
  - 사이드 바에 있는 카드를 선택하면 해당 가게의 위치와 정보를 확인할 수 있습니다.

- **맛집 리뷰 작성** [위키로 이동하기](https://github.com/sujinlee0202/eating-ts/wiki/%EB%A6%AC%EB%B7%B0-%EC%9E%91%EC%84%B1-%ED%8E%98%EC%9D%B4%EC%A7%80)

  - 리뷰 권한이 있는 유저는 오른쪽 상단 메뉴 > 리뷰 추가 페이지에서 리뷰를 등록할 수 있습니다.

- **회원가입 / 로그인** [위키로 이동하기](https://github.com/sujinlee0202/eating-ts/wiki/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85,-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80)
  - 새로운 사용자는 이메일과 비밀번호를 이용해 계정을 생성할 수 있습니다.

## 배포 URL

본 프로젝트는 다음 링크를 통해 실제 서비스를 확인할 수 있습니다.
[https://eating-ts.vercel.app](https://eating-ts.vercel.app/)

## 사용 방법

1. 웹 브라우저를 열고 [http://localhost:5173](http://localhost:5173)에 접속합니다.
   - 배포 URL을 이용하는 경우 [https://eating-ts.vercel.app](https://eating-ts.vercel.app/)에 접속합니다.
2. 지도에서 맛집 마커를 클릭해 상세정보를 확인할 수 있습니다.
3. 사이드 바에서 맛집을 클릭해 상세정보를 확인할 수 있습니다.
4. 리뷰 권한이 있는 유저는 맛집과 리뷰를 등록할 수 있습니다.
