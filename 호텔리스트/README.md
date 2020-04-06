## 1. 주제

호텔 리스트를 보여주는 웹 페이지를 만듭니다.

**[📌필수]** 로 시ㅏ작하는 요구사항들을 높은 우선순위에 두고 과제를 수행합니다.

## 1. 개발 전 숙지해야 할 내용

### 1.1 기본 숙지 사항

1. 제한 시간은 총 4시간이며, 개발 환경은 VSCode 입니다.
2. VSCode에서 제공하는 플러그인을 이용하셔도 됩니다.
3. 스타일 처리는 CSS, SCSS, Styled Components 중 원하는 것을 사용합니다.
4. 아래 라이브러리 이외에 다른 라이브러리 사용을 금합니다.

- `styled-components`
- `react-router-dom``
- ``react-input-range`

5. 모든 컴포넌트는 웹 표준을 지켜야 하며, 시맨틱하게 작성되어야 합니다.

### 1.2 개발자에게 전하는 추가 메세지

1. 코드 카피는 금합니다.
2. 다른 개발자들과 함께 협업하는 상황을 고려해서 코드를 작성합니다. (가독성, 확장성)
3. **[📌필수]** 를 우선적으로 개발하고, 쾌적한 서비를 위해 필요하다고 판단되는 것을 우선적으로 구현합니다.

### 1.3 참고할 화면

### 1.4 API 및 데이터 구조

> base_url:

#### 1.4.1 호텔 목록을 조회하는 API

- GET `base_url/hotels?page={page}&filters={fiter_condition}`
- 가격이 min ~ max 인 호텔은 조회합니다. max의 최대값은 100만원입니다.

  - 예시: `/hotels/filters=PRICE=0:10000` 요금이 100,000원 이하인 호텔 조회

- 리뷰 점수가 n점 이상인 호텔을 조회합니다.

  - 예시: `/hotels?filters=REVIEW-SCORE=7` 리뷰 점수가 7점 이상인 호텔 조회

- 해당 서비스가 포함된 호텔을 조회합니다. 시설은 아래와 같으며, 요청 시 `,` 로 묶어서 여러개의 조건을 쓸 수 있습니다.

  - FREE-WIFI - 무료 와이파이
  - FREE-PARKGIN - 무료 주차
  - FREE_AIRPORT_PICKUP - 무료 공항 픽업
  - 예시: `hotels?filters=FREE=FREE-WIFI,FREE-PARKING` WIFI와 주차가 무료인 호텔을 조회

- 요청결과

          ```json

  [
  {
  "id": 0,
  "name": "사랑채 블랙호스텔",
  "freeServices": [],
  "imageUrl": "",
  "rate": 3,
  "reviewScore": 8.9,
  "totalReviewCount": 466
  },
  {
  "id": 1,
  "name": "K- 호텔",
  "freeServices": [],
  "imageUrl": "",
  "rate": 5,
  "reviewScore": 7.1,
  "totalReviewCount": 126
  },
  {
  "id": 2,
  "name": "스타 레드호텔",
  "freeServices": [
  "FREE-PARKING",
  "FREE-AIRPORT-PICKUP"
  ],
  "imageUrl": "",
  "rate": 4,
  "reviewScore": 8.2,
  "totalReviewCount": 426
  },
  ....
  ]

  ```

  ```

#### 1.4.2 호텔 가격을 조회하는 API

- GET `base_url/hotels-prices?ids={hotel_id}

- 예시: `/hotel-prices?ids=1,3,5`

- 요청 결과

          ```json

  {
  "1": 15123,
  "5": 54120,
  "10": 13400,
  "15": 210000
  }

  ```

  ```
