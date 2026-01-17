# 환전 애플리케이션 (Exchange Application)

SwitchOne 프론트엔드 개발자 채용 과제로 개발된 환전 애플리케이션입니다. 사용자가 이메일로 로그인하고 실시간 환율을 확인하며 자산을 환전하고 거래 내역을 관리할 수 있는 웹 애플리케이션입니다.

## 목차

- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [주요 기능](#주요-기능)
- [시작하기](#시작하기)
- [환경 변수 설정](#환경-변수-설정)
- [배포](#배포)

## 기술 스택

### Core

- **Next.js 16.1.1** - React 프레임워크 (App Router)
- **React 19.2.3** - UI 라이브러리
- **TypeScript 5** - 타입 안정성

### 상태 관리 & 데이터 페칭

- **TanStack Query (React Query) 5.90.17** - 서버 상태 관리 및 데이터 페칭
- **TanStack Form 1.27.7** - 폼 상태 관리 및 검증

### HTTP 클라이언트

- **ky 1.14.2** - HTTP 클라이언트 (fetch 기반)

### 스타일링

- **Tailwind CSS 4** - 유틸리티 기반 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 UI 컴포넌트 라이브러리

### 유틸리티

- **Zod 4.3.5** - 스키마 검증
- **lodash-es 4.17.22** - 유틸리티 함수
- **Sonner 2.0.7** - 토스트 알림
- **lucide-react 0.562.0** - 아이콘

### 개발 도구

- **ESLint** - 코드 린팅
- **Prettier** - 코드 포맷팅
- **Husky** - Git hooks
- **Commitlint** - 커밋 메시지 검증

## 📁 프로젝트 구조

```
src/
├── api/                    # API 호출 함수
│   ├── exchange-rate.ts   # 환율 조회 API
│   ├── login.ts           # 로그인 API
│   ├── order.ts           # 주문 관련 API (견적, 실행, 내역)
│   └── wallet.ts          # 지갑 조회 API
│
├── app/                    # Next.js App Router
│   ├── (authorized)/      # 인증이 필요한 페이지 그룹
│   │   ├── exchange/      # 환전 페이지
│   │   ├── exchange-history/  # 환전 내역 페이지
│   │   └── layout.tsx     # 인증된 사용자 레이아웃
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 로그인 페이지
│
├── components/             # React 컴포넌트
│   ├── auth/              # 인증 관련 컴포넌트
│   │   └── AuthGuard.client.tsx  # 라우트 보호 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트
│   │   └── GNB.tsx        # 글로벌 네비게이션 바
│   ├── providers/         # Context Provider
│   │   ├── ExchangeRateProvider.tsx  # 환율 Context
│   │   └── QueryClientProvider.tsx   # React Query Provider
│   ├── ui/                # shadcn/ui 컴포넌트
│   └── views/             # 페이지별 뷰 컴포넌트
│       ├── LoginForm.client.tsx
│       └── (authorized)/
│           ├── exchange/  # 환전 페이지 컴포넌트
│           └── exchange-history/  # 환전 내역 컴포넌트
│
├── constants/             # 상수 정의
│   ├── currency.ts        # 통화 정보
│   ├── errorCode.ts       # 에러 코드 상수
│   └── nav.ts             # 네비게이션 메뉴
│
├── containers/            # 페이지 컨테이너
│   └── (authorized)/      # 인증된 페이지 컨테이너
│
├── hooks/                 # Custom Hooks
│   ├── api/               # API 관련 hooks
│   │   ├── useExchangeRate.ts    # 환율 조회
│   │   ├── useLogin.ts            # 로그인
│   │   ├── useMakeOrder.ts        # 환전 실행
│   │   ├── useOrderHistory.ts     # 환전 내역 조회
│   │   ├── useOrderQuote.ts       # 환전 견적 조회
│   │   └── useWallet.ts           # 지갑 조회
│   ├── context/           # Context hooks
│   │   └── useExchangeRateProvider.ts
│   └── useDebounce.ts     # 디바운스 hook
│
├── lib/                   # 유틸리티 함수
│   ├── apiClient.ts       # API 클라이언트 설정 (ky)
│   ├── format.ts          # 포맷팅 함수
│   ├── localStorage.ts    # localStorage 유틸리티
│   └── utils.ts           # 공통 유틸리티
│
└── types/                 # TypeScript 타입 정의
    ├── api.ts             # API 응답/에러 타입
    ├── auth.ts            # 인증 관련 타입
    ├── exchange.ts        # 환전 관련 타입
    ├── order.ts           # 주문 관련 타입
    └── wallet.ts          # 지갑 관련 타입
```

## ✨ 주요 기능

### 1. 사용자 인증

- **로그인**: 이메일 주소를 입력하여 JWT 토큰 발급
- **토큰 관리**: localStorage에 토큰 저장 및 자동 Authorization 헤더 추가
- **로그아웃**: 토큰 삭제 및 로그인 페이지로 리다이렉트
- **라우트 보호**: 인증되지 않은 사용자의 보호된 페이지 접근 차단

### 2. 환전 페이지

- **지갑 정보 표시**: 사용자의 현재 지갑 잔액 (KRW, USD, JPY)
- **실시간 환율 표시**: USD, JPY 환율 정보 및 변동률 표시
  - 1분마다 자동으로 최신 환율 조회 (폴링)
  - JPY 환율은 100엔당 KRW을 1엔당 KRW로 변환하여 표시
- **환전 견적 조회**:
  - 통화 선택 (USD/JPY)
  - 매수/매도 선택
  - 금액 입력 (소수점 최대 2자리)
  - 입력값 변경 시 300ms 디바운스 적용
  - 실시간 환전 견적 조회
- **환전 실행**:
  - 환전 요청 및 성공 시 지갑 잔액 자동 갱신
  - `EXCHANGE_RATE_MISMATCH` 에러 처리 (환율 재조회 및 자동 재시도)

### 3. 환전 내역 페이지

- **거래 내역 목록**: 모든 환전 내역을 테이블 형태로 표시
- **스켈레톤 로딩**: 로딩 중 스켈레톤 UI 표시
- **커스텀 스크롤바**: 디자인된 스크롤바
- **고정 헤더**: 스크롤 시 헤더 고정

### 4. 에러 처리

- **에러 코드 타입 정의**: 모든 API 에러 코드를 타입으로 관리
- **에러별 처리**: 각 에러 코드에 맞는 사용자 친화적 메시지 표시
- **토스트 알림**: Sonner를 사용한 에러 알림

### 5. UI/UX

- **로딩 상태**: Skeleton 컴포넌트를 사용한 로딩 UI
- **에러 상태**: 명확한 에러 메시지 표시
- **빈 상태**: 데이터가 없을 때 안내 메시지
- **반응형 디자인**: Tailwind CSS를 활용한 반응형 레이아웃

## 시작하기

### 설치

```bash
# 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
pnpm build
pnpm start
```

## 환경 변수 설정

### 개발 환경

`.env.development` 파일을 생성하고 다음 변수를 설정하세요:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
API_ENDPOINT=https://exchange-example.switchflow.biz
```

`next.config.ts`의 `rewrites` 설정을 통해 `/api/*` 요청이 실제 API 서버로 프록시됩니다.

## 개발 과정에서의 주요 고민과 해결

### 1. 인증 상태 관리 및 라우트 보호

**문제**: `useEffect` 실행 전에 보호된 페이지가 잠깐 보이는 문제

**해결**:

- `useState`의 초기값을 함수로 설정하여 클라이언트에서 localStorage를 즉시 확인
- 인증 확인 전까지 `null`을 반환하여 화면 깜빡임 방지

```typescript
const [isAuthenticated] = useState<boolean | null>(() => {
	if (typeof window === 'undefined') return null;
	return getLocalStorage('token') !== null;
});
```

### 2. 에러 코드 타입 관리

**문제**: 문자열로 에러 코드를 사용하면 오타 위험이 있고 타입 안정성이 부족

**해결**:

- README에 명시된 모든 에러 코드를 상수로 정의
- `ApiErrorCode` 타입으로 타입 안정성 확보
- IDE 자동완성 지원으로 개발 생산성 향상

```typescript
export const ErrorCode = {
	...API_ERROR_CODE,
	...DOMAIN_ERROR_CODE,
} as const;

export type ApiErrorCode =
	| (typeof API_ERROR_CODE)[keyof typeof API_ERROR_CODE]
	| (typeof DOMAIN_ERROR_CODE)[keyof typeof DOMAIN_ERROR_CODE];
```

### 3. 환율 불일치 에러 처리 및 자동 재시도

**문제**: `EXCHANGE_RATE_MISMATCH` 에러 발생 시 사용자가 수동으로 재시도해야 함

**해결**:

- 에러 발생 시 환율 쿼리 자동 무효화
- 대기 중인 주문 정보를 `useRef`로 저장
- `useEffect`로 환율 업데이트를 감지하여 자동 재시도
- 사용자 개입 없이 자동으로 최신 환율로 재시도

```typescript
onError: (error: ErrorDTO, variables: OrderRequestDTO) => {
	if (error.code === ErrorCode.EXCHANGE_RATE_MISMATCH) {
		queryClient.invalidateQueries({ queryKey: ['exchange-rates'] });
		pendingOrderRef.current = variables; // 재시도용 저장
	}
};
```

### 4. 입력 디바운스 최적화

**문제**: 환전 견적 조회 시 입력값 변경마다 API 호출로 인한 성능 이슈

**해결**:

- 커스텀 `useDebounce` hook 생성
- 단일 상태로 관리하여 불필요한 리렌더링 방지
- 300ms 디바운스로 API 호출 최적화

```typescript
export const useDebounce = <T>(value: T, delay: number): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);
	// lodash-es의 debounce 활용
};
```

### 5. API 클라이언트 구조

**문제**: `ky`의 `HTTPError`에서 에러 코드 추출 문제

**해결**:

- `isKyHTTPError`와 `getKyHTTPError` 헬퍼 함수 생성
- 모든 API 함수에서 일관된 에러 처리
- 타입 안전한 에러 코드 추출

```typescript
export const isKyHTTPError = (error: unknown): error is HTTPError<ErrorDTO> => {
	return error instanceof HTTPError;
};

export const getKyHTTPError = async (error: HTTPError<ErrorDTO>) => {
	return await error.response.json<ErrorDTO>();
};
```

### 6. CORS 문제 해결

**문제**: API 서버가 CORS를 허용하지 않음

**해결**:

- Next.js의 `rewrites` 기능 활용
- 클라이언트는 `/api/*`로 요청
- Next.js 서버가 실제 API 서버로 프록시
- Vercel 배포 시 환경 변수로 설정 관리
