// 사용 전 .env 파일에 아래 설정 필요:
// VITE_KAKAO_CLIENT_ID=카카오 REST API 키
// VITE_NAVER_CLIENT_ID=네이버 클라이언트 ID
// VITE_NAVER_CALLBACK_URL=http://localhost:5173/auth/callback

const KAKAO_CLIENT_ID  = import.meta.env.VITE_KAKAO_CLIENT_ID  ?? '';
const NAVER_CLIENT_ID  = import.meta.env.VITE_NAVER_CLIENT_ID  ?? '';
const REDIRECT_URI     = import.meta.env.VITE_NAVER_CALLBACK_URL ?? `${window.location.origin}/auth/callback`;

function loginWithKakao() {
  const params = new URLSearchParams({
    client_id:     KAKAO_CLIENT_ID,
    redirect_uri:  `${window.location.origin}/auth/callback`,
    response_type: 'code',
  });
  window.location.href = `https://kauth.kakao.com/oauth/authorize?${params}`;
}

function loginWithNaver() {
  const state = crypto.randomUUID();
  sessionStorage.setItem('naver_state', state);
  const params = new URLSearchParams({
    response_type: 'code',
    client_id:     NAVER_CLIENT_ID,
    redirect_uri:  REDIRECT_URI,
    state,
  });
  window.location.href = `https://nid.naver.com/oauth2.0/authorize?${params}`;
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12">
        <div className="max-w-sm w-full mx-auto">

          {/* 로고 */}
          <p className="text-2xl font-bold tracking-[0.2em] text-black mb-2">ENOW</p>
          <p className="text-sm text-gray-400 mb-12">계속하려면 로그인하세요</p>

          {/* 소셜 로그인 버튼 */}
          <div className="mt-6 flex flex-col gap-3 max-w-[400px] mx-auto">

            {/* 네이버 */}
            <button
              onClick={loginWithNaver}
              className="w-full inline-flex items-center p-3 border border-gray-300 rounded-md bg-white hover:cursor-pointer"
            >
              <img src="/images/naver.png" alt="naver" className="h-8 w-auto" />
              <span className="flex-1 text-center text-gray-900 font-semibold">네이버로 로그인</span>
            </button>

            {/* 카카오 */}
            <button
              onClick={loginWithKakao}
              className="w-full inline-flex items-center p-3 border border-gray-300 rounded-md bg-white hover:cursor-pointer"
            >
              <img src="/images/kakao.png" alt="kakao" className="h-8 w-auto" />
              <span className="flex-1 text-center text-gray-900 font-semibold">카카오로 로그인</span>
            </button>

          </div>

          {/* 안내 */}
          <p className="text-[11px] text-gray-300 text-center mt-8 leading-relaxed">
            로그인 시 서비스 이용약관 및 개인정보처리방침에<br />동의하는 것으로 간주합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
