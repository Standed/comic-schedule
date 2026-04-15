import React from 'react';
import { User, Video, Star, Flag, Zap, MonitorPlay, Mic, Edit, Scissors } from 'lucide-react';

const ScheduleTable = () => {
  // 数据源
  const rows = [
    { id: 1, date: "04.27", title: "AI仿真人短剧市场风向、工作流梳理与剧本速成", teacher: "羊羊", tags: ["直播课"] },
    { id: 2, date: "04.28", title: "作业日：确立短剧主题与创作剧本", teacher: "", tags: ["课后作业"] },
    { id: 3, date: "04.29", title: "资产构建：角色定调与场景搭建", teacher: "阿泷", tags: ["直播课", "作业提交"] },
    { id: 4, date: "04.30", title: "作业日：生成角色、场景、道具等核心视觉资产", teacher: "", tags: ["课后作业"] },
    { id: 5, date: "05.05", title: "视频生成：Seedance 2.0等视频模型从入门到进阶实战", teacher: "阿泷", tags: ["直播课"] },
    { id: 6, date: "05.06", title: "作业日：生成剧本中的核心视频素材", teacher: "", tags: ["课后作业"] },
    { id: 7, date: "05.07", title: "分镜优化：关键帧的局部精修与画面补救", teacher: "阿泷", tags: ["直播课"] },
    { id: 8, date: "05.08", title: "作业日：修补视频中的崩坏与残次细节画面", teacher: "", tags: ["课后作业"] },
    { id: 9, date: "05.09", title: "直播答疑：作业点评与深度拉片", teacher: "阿泷", tags: ["作业点评"] },
    { id: 10, date: "05.10", title: "声音设计：AI定制短剧配乐与声音衔接技巧", teacher: "阿泷", tags: ["直播课"] },
    { id: 11, date: "05.11", title: "作业日：利用Suno等工具生成契合画面的背景音乐", teacher: "", tags: ["课后作业"] },
    { id: 12, date: "05.12", title: "导演思维：影视级视听语言核心精讲", teacher: "雅平", tags: ["直播课"] },
    { id: 13, date: "05.13", title: "作业日：运用镜头组接原则完成画面优化", teacher: "", tags: ["课后作业"] },
    { id: 14, date: "05.14", title: "后期剪辑：从碎片素材到高质感成片的视听组接实战", teacher: "雅平", tags: ["直播课"] },
    { id: 15, date: "05.15", title: "作业日：优化并完成剪辑初稿", teacher: "", tags: ["课后作业"] },
    { id: 16, date: "05.16", title: "案例拆解：AI仿真人短剧完整流程演示与查漏补缺", teacher: "雅平", tags: ["直播课", "作业提交"], highlight: true },
    { id: 17, date: "05.17", title: "节课大作业：串联前期所有素材，完成并提交最终成片", teacher: "", tags: ["课后作业"] },
    { id: 18, date: "05.24", title: "结营直播：毕业大作业鉴赏与点评", teacher: "全体讲师", tags: ["毕业点评"], highlight: true },
  ];

  // 标签样式映射
  const getTagStyle = (tag) => {
    switch (tag) {
      case "直播课": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "课后作业": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "作业点评": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "案例拆解": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "作业提交": return "bg-pink-500/20 text-pink-300 border-pink-500/30";
      case "毕业作业启动": return "bg-red-500/20 text-red-300 border-red-500/30 font-bold";
      case "黑科技专题": return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      case "毕业点评": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30 font-bold";
      case "变现指南": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold";
      default: return "bg-gray-700/50 text-gray-300 border-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-gray-200 font-sans p-8 flex justify-center items-center">

      {/* 海报容器：固定最大宽度，适合截图 */}
      <div className="w-full max-w-6xl bg-[#09101F] rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden">

        {/* 背景光效 */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* 顶部 Header */}
        <div className="relative z-10 px-8 py-8 flex justify-between items-end border-b border-gray-800/50 bg-[#09101F]/50 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 rounded bg-blue-500 text-white text-xs font-bold tracking-widest">TRAINING CAMP</span>
              <span className="text-blue-400 text-sm font-semibold tracking-wider">2026.04 - 2026.05</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              AI 仿真人短剧实战营 第四期 <span className="text-gray-600 font-light mx-2">|</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">课程安排</span>
            </h1>
          </div>

          {/* 右上角 Logo */}
          <div className="flex flex-col items-end">
            {/* 增大容器尺寸 w-20 h-20 (80px) */}
            <div className="w-20 h-20 rounded-full bg-black/40 border border-gray-700 p-3 flex items-center justify-center mb-1">
              <img
                src="https://storage.googleapis.com/n8n-bucket-xys/%E7%AB%96%E7%89%88logo%E9%80%8F%E6%98%8E%E5%BA%95.png"
                alt="Logo"
                className="w-full h-full object-contain"
              // 移除 crossOrigin，避免因跨域头缺失导致图片加载被拦截
              />
            </div>
            <div className="text-xs text-gray-500 font-medium tracking-widest">西羊石 AI仿真人短剧</div>
          </div>
        </div>

        {/* 表格主体 */}
        <div className="p-1 relative z-10">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#0F172A] border-y border-gray-800">
                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-16">#</th>
                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-32">日期</th>
                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">课程主题</th>
                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-32">讲师</th>
                <th className="py-4 px-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider w-64">类型 / 说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className={`group transition-colors hover:bg-white/[0.02] ${row.highlight ? 'bg-gradient-to-r from-blue-500/5 to-transparent' : ''}`}
                >
                  {/* 序号 */}
                  <td className="py-3 px-6 text-sm font-medium text-gray-600 group-hover:text-gray-400 font-mono">
                    {String(row.id).padStart(2, '0')}
                  </td>

                  {/* 日期 */}
                  <td className="py-3 px-6 text-base font-bold text-blue-400 font-mono">
                    {row.date}
                  </td>

                  {/* 标题 */}
                  <td className="py-3 px-6">
                    <div className={`text-base font-medium ${row.highlight ? 'text-white' : 'text-gray-300 group-hover:text-white'} transition-colors`}>
                      {row.title}
                    </div>
                  </td>

                  {/* 讲师 */}
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      {/* <div className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-[10px] text-gray-400">
                         {row.teacher.charAt(0)}
                       </div> */}
                      <span className="text-sm text-gray-400 font-medium">{row.teacher}</span>
                    </div>
                  </td>

                  {/* 标签 */}
                  <td className="py-3 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      {row.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-medium border ${getTagStyle(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 底部 Footer */}
        <div className="px-8 py-4 bg-[#0F172A] border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
          <div>全程直播 + 录屏回放 + 社群答疑 + 商业作业实战</div>
          <div>* 最终安排以班级群通知为准</div>
        </div>

      </div>
    </div>
  );
};

export default ScheduleTable;