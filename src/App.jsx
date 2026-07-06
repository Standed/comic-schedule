import { useMemo, useRef, useState } from 'react'
import { Download, RotateCcw, Sparkles } from 'lucide-react'
import html2canvas from 'html2canvas'

const LOGO_URL = `${import.meta.env.BASE_URL}xys-logo.png`

const SAMPLE_OUTLINE = `# AI影视美学拉片训练营｜课程安排

## 2026.07 - 2026.08

| #  | 日期    | 课程主题                            | 讲师   | 类型 / 说明    |
| -- | ----- | ------------------------------- | ---- | ---------- |
| 01 | 07.20 | 拉片认知：AI影视创作的专业镜头判断力建立           | 泡泡柱  | 直播课        |
| 02 | 07.21 | 作业日：选择一支影视/广告片段，完成初步观察记录        | -    | 课后作业       |
| 03 | 07.22 | 镜头基础：景别、构图、焦段与画面情绪控制            | 泡泡柱  | 直播课        |
| 04 | 07.23 | 作业日：截图拆解3-5个镜头，分析景别、构图与情绪作用     | -    | 课后作业       |
| 05 | 07.24 | 镜头语言：运镜、调度与视觉叙事表达               | 泡泡柱  | 直播课        |
| 06 | 07.25 | 作业日：拆解一段30秒片段的运镜、调度与叙事功能        | -    | 课后作业       |
| 07 | 07.26 | 拉片实战：商业广告与剧情短片的专业拆解方法           | 泡泡柱  | 直播课        |
| 08 | 07.27 | 作业日：完成一份1分钟影视/广告片段拉片表           | -    | 课后作业       |
| 09 | 07.28 | 声音设计：音效、环境音与情绪节奏搭建              | 泡泡柱  | 直播课        |
| 10 | 07.29 | 作业日：拆解片段中的音乐、环境音、音效与节奏变化        | -    | 课后作业       |
| 11 | 07.30 | AI生成：资产图设计与动态视频生成工作流            | 雅平   | 直播课        |
| 12 | 07.31 | 作业日：根据拉片方案设计人物、场景与风格资产图         | -    | 课后作业       |
| 13 | 08.01 | 镜头组接：剪辑思维建立与剪映初级到进阶玩法           | 雅平   | 直播课        |
| 14 | 08.02 | 作业日：生成3-5个AI视频镜头，并完成初步镜头组接      | -    | 课后作业       |
| 15 | 08.04 | 案例实操：从0到1完成一支AI影片制作流程           | 雅平   | 直播课 / 作业提交 |
| 16 | 08.05 | 结课大作业：整合拉片方案与AI生成素材，完成并提交AI影视作品 | -    | 课后作业       |
| 17 | 08.12 | 结营直播：学员作品展示、导师点评与后续提升路径         | 全体讲师 | 毕业点评       |

## 课程交付说明

全程直播 + 录屏回放 + 社群答疑 + 作业点评
8节核心直播课，围绕影视审美、专业拉片、AI生成与成片实操展开
最终完成一份拉片拆解方案与一支AI影视实战作品`

const TYPE_CLASS = {
  直播课: 'live',
  课后作业: 'homework',
  作业提交: 'submit',
  作业点评: 'review',
  毕业点评: 'final',
}

function cleanCell(value) {
  return value.replace(/\s+/g, ' ').replace(/^[-—]$/, '').trim()
}

function splitTableLine(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(cleanCell)
}

function parseTags(value, title, teacher) {
  const rawTags = value
    .split(/[/／、,，+]/)
    .map(cleanCell)
    .filter(Boolean)

  if (rawTags.length > 0) return rawTags
  if (title.includes('作业日') || title.includes('大作业')) return ['课后作业']
  if (teacher) return ['直播课']
  return []
}

function parseOutline(markdown) {
  const lines = markdown.split(/\r?\n/)
  const heading = lines.find((line) => /^#\s+/.test(line.trim()))
  const rawTitle = heading ? heading.replace(/^#\s+/, '').trim() : '课程训练营｜课程安排'
  const [titlePart] = rawTitle.split(/[｜|]/)
  const title = cleanCell(titlePart || rawTitle)

  const rangeLine = lines.find((line) => /20\d{2}\.\d{2}\s*[-—]\s*20\d{2}\.\d{2}/.test(line))
  const range = rangeLine?.match(/20\d{2}\.\d{2}\s*[-—]\s*20\d{2}\.\d{2}/)?.[0] || '2026.07 - 2026.08'

  const tableRows = lines
    .filter((line) => line.trim().startsWith('|'))
    .map(splitTableLine)
    .filter((cells) => cells.length >= 5)
    .filter((cells) => cells[0] !== '#' && !/^--+$/.test(cells[0]))
    .map(([id, date, topic, teacher, type]) => {
      const normalizedTeacher = cleanCell(teacher)
      const titleText = cleanCell(topic)
      const tags = parseTags(cleanCell(type), titleText, normalizedTeacher)
      const isFinal = tags.includes('毕业点评') || titleText.includes('结营')
      const isFocus = tags.includes('作业提交') || titleText.includes('案例实操') || titleText.includes('案例拆解')

      return {
        id: cleanCell(id).padStart(2, '0'),
        date: cleanCell(date),
        title: titleText,
        teacher: normalizedTeacher,
        tags,
        state: isFinal ? 'final' : isFocus ? 'focus' : tags.includes('课后作业') ? 'homework' : 'live',
      }
    })

  const deliveryStart = lines.findIndex((line) => /^##\s*课程交付说明/.test(line.trim()))
  const deliveryLines = deliveryStart >= 0
    ? lines
        .slice(deliveryStart + 1)
        .map((line) => cleanCell(line.replace(/^[-*]\s*/, '')))
        .filter(Boolean)
        .filter((line) => !line.startsWith('##') && !line.startsWith('---'))
    : []

  const footerLeft = deliveryLines[0]
    ? [deliveryLines[0], deliveryLines.find((line) => /核心直播课/.test(line))].filter(Boolean).join(' · ')
    : '全程直播 + 录屏回放 + 社群答疑 + 作业点评'
  const footerRight = deliveryLines.find((line) => /最终|完成/.test(line)) || '* 最终安排以班级群通知为准'

  return {
    title,
    range,
    rows: tableRows,
    footerLeft,
    footerRight,
    logoText: title.includes('拉片') || title.includes('影视美学') ? '西羊石 AI影视美学' : '西羊石 AI短剧课程',
  }
}

function Poster({ data, posterRef }) {
  const rowCount = Math.max(data.rows.length, 1)

  return (
    <main className="poster" ref={posterRef} style={{ '--row-count': rowCount }}>
      <header className="poster-header">
        <div className="poster-meta">
          <span className="poster-pill">TRAINING CAMP</span>
          <span className="poster-range">{data.range}</span>
        </div>
        <h1>
          {data.title}
          <span className="poster-divider">|</span>
          <span className="poster-gradient">课程安排</span>
        </h1>
        <div className="poster-logo-wrap">
          <div className="poster-logo-circle">
            <img src={LOGO_URL} alt="西羊石" />
          </div>
          <div className="poster-logo-text">{data.logoText}</div>
        </div>
      </header>

      <section className="poster-table">
        <div className="poster-thead">
          <div className="poster-cell">#</div>
          <div className="poster-cell">日期</div>
          <div className="poster-cell">课程主题</div>
          <div className="poster-cell">讲师</div>
          <div className="poster-cell">类型 / 说明</div>
        </div>

        {data.rows.map((row) => (
          <div className={`poster-row ${row.state}`} key={`${row.id}-${row.date}`}>
            <div className="poster-cell poster-num">{row.id}</div>
            <div className="poster-cell poster-date">{row.date}</div>
            <div className="poster-cell poster-topic" title={row.title}>{row.title}</div>
            <div className="poster-cell poster-teacher">{row.teacher}</div>
            <div className="poster-tags">
              {row.tags.map((tag) => (
                <span className={`poster-tag ${TYPE_CLASS[tag] || 'live'}`} key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <footer className="poster-footer">
        <div>{data.footerLeft}</div>
        <div>{data.footerRight}</div>
      </footer>
    </main>
  )
}

function App() {
  const [outline, setOutline] = useState(SAMPLE_OUTLINE)
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState('')
  const posterRef = useRef(null)
  const data = useMemo(() => parseOutline(outline), [outline])

  const handleDownload = async () => {
    if (!posterRef.current || isExporting) return
    setIsExporting(true)
    setExportError('')

    try {
      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: '#080d1a',
        logging: false,
        scale: 1,
        useCORS: true,
        width: 1149,
        height: 1148,
      })

      canvas.toBlob((blob) => {
        if (!blob) {
          setExportError('导出失败')
          return
        }

        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.download = `${data.title || 'course-poster'}.png`
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
      }, 'image/png')
    } catch (error) {
      setExportError(error instanceof Error ? error.message : '导出失败')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="app-shell">
      <section className="editor-panel">
        <div className="app-title">
          <Sparkles size={22} />
          <div>
            <h2>西羊石课程海报生成器</h2>
            <p>{data.rows.length} 条课程 · {data.range}</p>
          </div>
        </div>

        <textarea
          value={outline}
          onChange={(event) => setOutline(event.target.value)}
          spellCheck="false"
          aria-label="课程大纲 Markdown"
        />

        <div className="actions">
          <button type="button" onClick={handleDownload} disabled={isExporting}>
            <Download size={18} />
            {isExporting ? '导出中' : '下载 PNG'}
          </button>
          <button type="button" className="secondary" onClick={() => setOutline(SAMPLE_OUTLINE)}>
            <RotateCcw size={18} />
            示例大纲
          </button>
        </div>

        {exportError && <div className="export-error">{exportError}</div>}
      </section>

      <section className="preview-panel">
        <div className="poster-stage">
          <div className="poster-scale">
            <Poster data={data} posterRef={posterRef} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
