import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';

const features = [
  {
    title: '오늘에 집중',
    desc: '복잡한 기능 없이 오늘 해야 할 일만 심플하게 관리합니다.',
  },
  {
    title: '완료율 트래킹',
    desc: '하루가 끝날 때 몇 퍼센트를 달성했는지 한눈에 확인하세요.',
  },
  {
    title: '연속 달성 스트릭',
    desc: '매일 100%를 향해 나아가는 습관이 쌓입니다.',
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12">

      {/* 헤더 */}
      <Header />


      {/* 히어로 섹션 */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <p className="text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase mb-6">
          Simple Task Manager
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold text-black leading-tight mb-6">
          오늘,<br />얼마나 해냈나요?
        </h1>
        <p className="text-base text-gray-400 max-w-sm leading-relaxed mb-12">
          복잡한 일정 관리는 그만.<br />
          오늘 할 일을 적고, 하나씩 지워가세요.
        </p>

        {/* 완료율 미리보기 */}
        <div className="mb-12 flex flex-col items-center gap-2">
          <span className="text-7xl font-bold text-black">72%</span>
          <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-black rounded-full" style={{ width: '72%' }} />
          </div>
          <span className="text-xs text-gray-400">오늘의 달성률</span>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="px-10 py-3.5 bg-black text-white text-sm font-semibold tracking-wide rounded-full hover:bg-gray-800 active:scale-[0.98] transition-all"
        >
          시작하기
        </button>
      </section>

      {/* 기능 소개 */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col gap-2">
              <p className="text-sm font-bold text-black">{f.title}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="text-center py-8 text-xs text-gray-300">
        © 2026 ENOW. All rights reserved.
      </footer>

    </div>
  );
}
