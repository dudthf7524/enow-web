import { useState, useRef } from 'react';
import { Header } from '../components/Header';

interface Entry {
  id: string;
  text: string;
  done: boolean;
}

export default function TodayPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState<Entry | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAdd() {
    const text = input.trim();
    if (!text) return;
    setEntries(prev => [{ id: crypto.randomUUID(), text, done: false }, ...prev]);
    setInput('');
    inputRef.current?.focus();
  }

  function handleComplete() {
    if (!selected) return;
    setEntries(prev => prev.map(e => e.id === selected.id ? { ...e, done: !e.done } : e));
    setSelected(prev => prev ? { ...prev, done: !prev.done } : null);
  }

  function handleDelete() {
    if (!selected) return;
    setEntries(prev => prev.filter(e => e.id !== selected.id));
    setSelected(null);
  }

  const now = new Date();
  const dateLabel = now.toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  });

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12">

        <div className="py-4">
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder="오늘의 기록을 입력하세요..."
              className="flex-1 h-11 text-sm border-b border-black outline-none placeholder:text-black bg-transparent"
            />
            <button
              onClick={handleAdd}
              disabled={!input.trim()}
              className="flex-shrink-0 text-2xl leading-none text-black transition-colors hover:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        <div className="pt-6 pb-4">
          <p className="text-xl font-semibold">TODOLIST</p>
        </div>

        {entries.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-4xl mb-3 text-gray-200">✦</p>
            <p className="text-sm text-gray-400">오늘의 기록이 없습니다</p>
            <p className="text-xs text-gray-300 mt-1">위 입력창에서 시작해보세요</p>
          </div>
        ) : (
          <div>
            {entries.map(entry => (
              <div
                key={entry.id}
                onClick={() => setSelected(entry)}
                className="py-10 border-b border-gray-50 flex items-start justify-between gap-4 cursor-pointer"
              >
                <p className="text-sm font-semibold text-black">{entry.text}</p>
                <span className={`text-sm font-bold uppercase ${entry.done ? 'text-green-500' : 'text-red-500'}`}>
                  {entry.done ? 'COMPLETE' : 'INCOMPLETE'}
                </span>
              </div>
            ))}
          </div>
        )}

        {selected && (
          <>
            <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setSelected(null)} />
            <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 rounded-t-2xl shadow-xl animate-slide-up">
              <div className="max-w-7xl mx-auto w-full px-6 pt-5 pb-10">
                <div className="flex justify-center mb-5">
                  <div className="w-10 h-1 bg-gray-200 rounded-full" />
                </div>
                <p className="text-base font-medium text-black mb-6 leading-relaxed">{selected.text}</p>

                {/* 토글 버튼 */}
                <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">완료 여부</p>
                    <p className="text-xs text-gray-400 mt-0.5">{selected.done ? '완료된 항목입니다' : '아직 완료되지 않았습니다'}</p>
                  </div>
                  <button
                    onClick={handleComplete}
                    className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${selected.done ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ${selected.done ? 'translate-x-7' : 'translate-x-0'
                      }`} />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleDelete}
                    className="w-full py-3.5 border border-gray-200 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-full py-3 text-sm text-gray-400 hover:text-black transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
